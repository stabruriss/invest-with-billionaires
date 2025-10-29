# Screen 6: Landing / Onboarding

## AI UI Generation Prompt

```markdown
Create a minimalist landing page with energetic, empowering design and compelling value proposition.

DESIGN SYSTEM:
- Primary action: #FF6B35 or #FFB30F (warm orange for main CTA)
- Secondary: #9BBC0F (sage green)
- Background: #F7F3E9 (cream/off-white with subtle texture)
- Typography: Berkeley Mono (all text), IBM Plex Mono (numbers)
- Style: Clean minimalism with energetic hand-drawn illustrations (inspired by EP-133 marketing)

LAYOUT:
- Hero section (60% viewport height)
- Value proposition (3 key benefits with illustrations)
- How it works (3-step visual flow)
- Social proof (if available)
- ONE primary CTA throughout

HERO SECTION:
- Large headline: "INVEST WITH BILLIONAIRES" (Berkeley Mono, 48-72px, bold, dark charcoal)
- Subheadline: "Copy & customize institutional portfolios in under 30 minutes" (24px, lighter weight)
- Energetic illustration: Hand-drawn character or diagram showing empowering concept (bold line art, orange accents)
- ONE large CTA button: "START COPYING BUFFETT" (warm orange #FF6B35, uppercase, tactile 3D depth)
- Button has raised appearance with shadow, lifts on hover
- Honest disclaimer: "⚠ 13F data has 45-day lag - we make it useful with AI" (small, orange text)

VALUE PROPOSITION (3 Cards with Illustrations):
1. "COPY PROVEN STRATEGIES"
   - Hand-drawn illustration: Portfolio/document with checkmark (energetic line art)
   - Text: "Browse 20+ famous investors. Copy portfolios with one click."

2. "CUSTOMIZE YOUR WAY"
   - Hand-drawn illustration: Control sliders or knobs (hardware-inspired)
   - Text: "Adjust allocations to match your conviction. 100% in your control."

3. "AI MARKET ANALYSIS"
   - Hand-drawn illustration: Brain or lightbulb with energy rays
   - Text: "Get current insights on 45-day-old positions. Stay informed."

Each card:
- Clean white/light background, subtle border, minimal shadow
- Generous padding (24-32px)
- Minimal, scannable text
- Illustration style: Bold black line art with orange accent fills

HOW IT WORKS (3-Step Visual Flow):
Inspired by EP-133 step-by-step marketing:
1. Numbered circle "①" + Title "BROWSE" + Illustration (hand pointing at investor grid)
2. Numbered circle "②" + Title "CUSTOMIZE" + Illustration (hand adjusting sliders)
3. Numbered circle "③" + Title "EXECUTE" + Illustration (rocket or celebration)

Black rounded header bars for each step (like EP-133 video thumbnails)
Simple play button arrow (▶) connecting steps
Berkeley Mono for titles, concise one-line descriptions

SOCIAL PROOF (Optional):
- "Built for investors who want institutional wisdom without 5-hour research sessions"
- Simple illustrated avatars (hand-drawn style)
- No fake testimonials - honest, empowering positioning

FOOTER CTA:
- Large orange button: "GET STARTED FREE" (same tactile style as hero)
- Small disclaimer: "Paper trading available. No credit card required."
- Legal: "Not investment advice | SEC disclaimers apply"

ATMOSPHERE:
- Empowering, energetic, confident
- Honest about limitations (lag acknowledged upfront)
- Playful illustrations create approachability
- Professional yet fun
- ONE clear action (sign up)

INTERACTIONS:
- Hero CTA: Tactile hover (lifts 2px, shadow deepens)
- Value prop cards: Gentle lift on hover
- Illustrations may have subtle animation (optional, tasteful)
- Smooth scroll to sections
- No aggressive pop-ups

REFERENCE VIBE:
Teenage Engineering EP-133 marketing energy meets honest fintech landing page with empowering, champion mindset
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
