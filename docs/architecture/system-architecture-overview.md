# Invest With Billionaires – System Architecture Overview

## 1. Architecture Goals
- Deliver FR1–FR10 and NFR1–NFR8 from the PRD while supporting the nostalgic Gameboy-inspired UX defined in `docs/design/ui-prompts/01-portfolio-browser.md`.
- Compress the 13F research → customization → execution workflow to <30 minutes with responsive, real-time feedback.
- Maintain a modular foundation for future portfolio types, additional investors, and premium AI insights without rework.

## 2. High-Level System Context
```
┌────────────────────┐    HTTPS    ┌─────────────────────────────┐
│  Next.js Frontend  │ <──────────>│ Ruby on Rails API Gateway   │
│  (Vercel)          │             │ (Railway)                   │
└────────────────────┘             └──────────────┬──────────────┘
                                                 │
                                                 │ service account
                                                 ▼
                                         ┌────────────────┐
                                         │ Firebase Suite │
                                         │ (Auth, Firestore,
                                         │  Cloud Storage)│
                                         └──────┬─────────┘
                                                │
      ┌───────────────────┐    ┌────────────┐   │   ┌────────────────┐
      │ financialdatasets │    │ Alpaca API │   │   │ OpenRouter AI  │
      │ .ai 13F API       │    │ (trading)  │   │   │ (LLM analysis) │
      └───────────────────┘    └────────────┘   │   └────────────────┘
                                                │
                                     ┌──────────▼─────────┐
                                     │ Redis Cache / Jobs │
                                     │ (Railway)          │
                                     └────────────────────┘
```

### Interaction Model
- Frontend uses Firebase Auth to obtain ID tokens, then calls the Rails API with bearer tokens; Rails verifies tokens with Firebase Admin SDK.
- Rails orchestrates data retrieval, caching, business rules, and writes user/portfolio documents to Firestore via service account credentials.
- Background jobs refresh institutional portfolios from financialdatasets.ai, reconcile Alpaca executions, and pre-compute AI summaries when economical.

## 3. Component Responsibilities

### 3.1 Frontend (Next.js + Tailwind + Radix UI)
- Implements responsive investor grid per Screen 1 prompt; leverages custom design tokens for the Gameboy aesthetic.
- Uses React Query (or TanStack Query) for data fetching with optimistic updates in portfolio editor (FR2, FR3, FR5).
- Integrates Firebase Authentication (Email/Password + OAuth providers) and handles secure token refresh.
- Streams real-time updates from Firestore (performance tracking, FR7) while keeping sensitive operations behind server APIs.
- Client-side input validation mirrors backend rules to provide sub-100ms UI feedback while deferring authority to the API for consistency.

### 3.2 Rails API Gateway
- Exposes RESTful/JSON endpoints under `/api/v1` with JWT validation against Firebase public keys.
- Houses domain services per epic:
  - `Investors::CatalogService` for FR1 retrieval and caching.
  - `Portfolios::AllocationService` for FR3/FR5 validation and calculations.
  - `Trades::ExecutionService` for Alpaca order previews/execution (FR4).
  - `Analysis::InsightService` orchestrating OpenRouter prompts with guardrails (FR6).
  - `Performance::Tracker` reconciling Alpaca position snapshots with Firestore documents (FR7, FR8).
- Uses Sidekiq (backed by Redis) for scheduled refresh of 13F data, trade reconciliation, and AI insight pre-computation.
- Applies Pundit (or similar) for authorization using Firebase UID + role claims.

### 3.3 Data Layer
- **Firestore (Primary store)**: collections for `investors`, `institutional_portfolios`, `user_portfolios`, `portfolio_versions`, `analysis_snapshots`, `alpaca_connections`. Document design keeps investor holdings denormalized for fast reads while user portfolios reference investor snapshots for attribution.
- **Redis**: cached investor lists, AI prompt templates, and Alpaca market data for sub-500ms response (NFR1, NFR7).
- **Cloud Storage (Firebase)**: stores generated PDF disclosures, AI analysis artifacts if needed.
- **Secrets Management**: Railway Variables + Firebase-managed secrets for API keys, with encryption at rest and rotation playbook.

### 3.4 External Integrations
- **financialdatasets.ai**: nightly and on-demand pulls, normalized to canonical schema (ticker, cusip, weight, filing date). Cached for 24h, raw responses stored for audit.
- **Alpaca Trading**: OAuth flow handled via Rails; tokens encrypted with Rails credentials before persisting to Firestore. Supports fractional orders and order status webhooks.
- **OpenRouter AI**: wrapper with rate limiting, prompt templates, cost tracking; responses summarized and stored with source metadata to satisfy compliance checks.

## 4. Key Workflows

### 4.1 Portfolio Browsing (FR1, FR2)
1. Next.js page load requests `GET /api/v1/investors`.
2. Rails checks Redis; on miss, reads `investors` collection and returns curated list with pre-signed portrait URLs.
3. UI renders cards matching pixel-art design, supporting hover states and responsive breakpoints.

### 4.2 Portfolio Customization (FR3, FR5)
1. User selects investor → `GET /api/v1/investors/:id/portfolio`.
2. Allocation editor enforces 100% constraint locally; changes autosave via `PATCH /api/v1/user-portfolios/:id`.
3. Rails validates weights, persists versioned snapshot, and recalculates per-dollar allocations against user funding amount.
4. Firestore triggers emit real-time updates for other sessions/devices.

### 4.3 Trade Execution (FR4)
1. User connects Alpaca via OAuth redirect handled by Rails; tokens stored securely.
2. Execution preview: `POST /api/v1/trades/preview` computes fractional share quantities and estimated costs using cached market quotes.
3. Confirmation: `POST /api/v1/trades/execute` dispatches consolidated order to Alpaca; order IDs, fill statuses stored for later reconciliation.
4. Background job polls Alpaca webhooks until all legs settle; updates `trade_activity` subcollection for performance dashboards.

### 4.4 AI Market Analysis (FR6)
1. User triggers analysis → `POST /api/v1/analysis` specifying investor portfolio/version.
2. Rails fetches latest holdings, market deltas, and macro signals, composes context-limited prompt.
3. OpenRouter call returns structured JSON with summary, risks, opportunities; response cached per investor & market snapshot.
4. Result stored as `analysis_snapshots` with cost metadata; UI fetches and renders within modal.

### 4.5 Performance Tracking (FR7, FR8)
1. Scheduled job syncs Alpaca positions daily (or on webhook) and writes normalized holdings to Firestore.
2. Rails computes benchmark vs. customized portfolio returns using time-weighted methodology.
3. Frontend listens to `user_portfolios/{id}/metrics` document for live updates in dashboards.

## 5. Meeting Non-Functional Requirements
- **Latency (NFR1)**: use Vercel Edge caching for static assets, Redis for API hot paths, and lean JSON payloads. Rails actions target <200ms; Firestore reads cached where possible.
- **Scalability (NFR2)**: serverless Next.js scales automatically; Rails on Railway horizontal autoscaling; Firestore handles concurrent connections; background jobs distributed via Sidekiq workers.
- **Availability (NFR3)**: health checks, uptime alerts, failover plan where Redis downtime falls back to direct Firestore reads; Alpaca outage surfaced with UX messaging per NFR8.
- **Cost Control (NFR4)**: rate-limit AI requests, batch financialdatasets syncs, leverage cached AI summaries, and surface monthly cost dashboards.
- **Responsiveness (NFR5)**: Tailwind breakpoints, Radix primitives, and progressive enhancement ensure mobile-first delivery.
- **Security (NFR6)**: HTTPS enforced, HSTS via Vercel; Rails uses Firebase Admin to verify tokens; tokens encrypted-at-rest; SOC2-ready logging for access events.
- **Caching Strategy (NFR7)**: tiered caching (Redis + Firestore TTL indexes) with invalidation hooks on refresh jobs.
- **Regulatory UX (NFR8)**: reusable disclaimer components, trading window checks, and holiday calendar service referenced by execution routes.

## 6. Developer Workflow & Tooling
- **Environments**: `dev` (local, using emulators), `staging` (preview deployments + sandbox Alpaca), `production`.
- **CI/CD**: GitHub Actions pipeline running lint, Jest/Playwright for frontend, RSpec for Rails, integration contract tests mocking third-party APIs, deploy gates requiring passing checks.
- **Observability**: Honeybadger (Rails) + Sentry (Next.js) for error tracking, Logflare or Datadog for structured logs, Prometheus-compatible metrics exporting p95 latency, error rates, cost usage.
- **Schema & Contract Governance**: OpenAPI spec generated from Rails, shared via Stoplight; Postman collection for manual QA; storybook for UI states of investor cards.

## 7. Open Questions & Next Steps
- Confirm whether we need a lightweight Postgres instance for audit logs versus Firestore-only approach.
- Align on pricing/plan entitlements (e.g., AI usage limits) to finalize access control schema.
- Decide on worker frequency for performance reconciliation to balance freshness vs. Alpaca rate limits.
- Validate feasibility of automated pixel-art portraits (procedural generation vs. curated assets) for investor cards.
- Extend this document with detailed sequence diagrams for execution flow and data model ERDs in the next iteration.
