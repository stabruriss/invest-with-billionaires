# Screen 6: Landing / Onboarding

## AI UI Generation Prompt

```markdown
Create a minimalist landing page with sophisticated Gameboy aesthetics and compelling value proposition.

DESIGN SYSTEM:
- Primary: #9BBC0F (sage green)
- Accent: #FFB30F (warm amber)
- Background: #F7F3E9 (cream paper texture)
- Typography: Berkeley Mono (all text), IBM Plex Mono (numbers)
- Conservative pixel art with wabi-sabi authenticity

LAYOUT:
- Hero section (60% viewport height)
- Value proposition (3-4 key benefits)
- Social proof (if available)
- ONE primary CTA throughout

HERO SECTION:
- Large headline: "INVEST WITH BILLIONAIRES" (Berkeley Mono, 48-72px, bold)
- Subheadline: "Copy & customize institutional portfolios in under 30 minutes" (24px)
- Small pixel-art icon (32x32): Trophy or dollar sign, hand-drawn style
- ONE large CTA button: "Start Copying Buffett" (sage green, prominent)
- Hero visual: Grid preview of pixel-art investor portraits (3x3 grid, muted/faded)
- Honest tagline: "⚠ 13F data has 45-day lag - we make it useful with AI" (small, amber)

VALUE PROPOSITION (3 Cards):
1. "COPY PROVEN STRATEGIES"
   - Pixel-art icon (16x16): Document with checkmark
   - Text: "Browse 20+ famous investors. Copy portfolios with one click."

2. "CUSTOMIZE YOUR WAY"
   - Pixel-art icon (16x16): Sliders
   - Text: "Adjust allocations to match your conviction. 100% in your control."

3. "AI MARKET ANALYSIS"
   - Pixel-art icon (16x16): Lightbulb or brain
   - Text: "Get current insights on 45-day-old positions. Stay informed."

Each card:
- Light cream background, hand-drawn border
- Generous padding (24-32px)
- Minimal, scannable text
- No overwhelming details

HOW IT WORKS (Simple 3-Step):
1. "Browse Famous Investors" → Pixel-art icon (grid)
2. "Customize Portfolio" → Pixel-art icon (slider)
3. "Execute with Alpaca" → Pixel-art icon (rocket)

Simple horizontal flow with pixel-art arrows between steps
Berkeley Mono, concise descriptions (one line each)

SOCIAL PROOF (Optional):
- "Built for semi-sophisticated investors who want institutional wisdom without 5-hour research sessions"
- Small pixel-art person icons (8x8) as avatars
- No fake testimonials - honest positioning

FOOTER CTA:
- Repeat large button: "Get Started Free" (sage green)
- Small disclaimer: "Paper trading available. No credit card required."
- Legal: "Not investment advice | SEC disclaimers apply"

ATMOSPHERE:
- Confident but not hype-driven
- Honest about limitations (45-day lag acknowledged)
- Nostalgic warmth invites exploration
- Minimal chrome, maximum clarity
- ONE clear action (sign up)

INTERACTIONS:
- Hero CTA: pulsing glow effect (subtle)
- Value prop cards: gentle hover lift
- Smooth scroll to sections
- No aggressive pop-ups or distractions

REFERENCE VIBE:
Retro game start screen meets honest fintech landing page with wabi-sabi authenticity
```

## Screen Purpose

**User Goal**: Understand what the platform does and be compelled to sign up.

**Key User Actions**:
1. Quickly grasp value proposition (< 10 seconds)
2. Understand how it works (simple 3-step flow)
3. Click "Get Started" to sign up

## Design Rationale

**Why this design works**:
- **Hero clarity**: Large headline + one-line subheadline explains product instantly
- **Honest positioning**: Acknowledge 45-day lag upfront (builds trust)
- **Pixel-art warmth**: Inviting aesthetic reduces intimidation factor
- **One CTA**: No confusion about what to do next
- **Minimal complexity**: No overwhelming feature lists, keep it simple

## Copy Principles

**Headlines**:
- Direct, verb-based: "INVEST WITH BILLIONAIRES"
- No vague marketing speak
- Explains product clearly

**Subheadlines**:
- Quantify benefit: "under 30 minutes"
- Sets realistic expectations

**Body Copy**:
- Short sentences, Berkeley Mono
- Scannable (users don't read walls of text)
- Honest about limitations

## Social Proof Strategy

**Early Stage** (no users yet):
- Skip testimonials (don't fake it)
- Position as "for semi-sophisticated investors"
- Credibility from institutional investor data source
- "13F filings + AI analysis + Alpaca execution"

**With Traction**:
- Real user count: "Join 1,247 investors copying billionaires"
- Real stat: "$X invested through the platform"
- Authentic testimonials (with permission)

## Responsive Considerations

**Mobile (< 768px)**:
- Hero: Headline 36-48px (smaller)
- CTA: Full-width button
- Value prop cards: Stack vertically
- How It Works: Vertical flow (not horizontal)

**Desktop (> 1024px)**:
- Hero: Headline 56-72px
- Value prop: 3 cards side-by-side
- How It Works: Horizontal flow with arrows

## Accessibility

- Hero CTA: High contrast (sage green on cream = 4.1:1)
- Skip link to main content
- All pixel-art icons have alt text
- Logical heading hierarchy (H1 → H2 → H3)

## Component Mapping

Maps to Epic 1, Story 1.2: Firebase Authentication Integration

**Next Screen**: Sign Up / Login

**CTA Behavior**: Click "Get Started" → Sign Up modal or page
