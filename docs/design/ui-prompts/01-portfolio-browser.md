# Screen 1: Portfolio Browser (Investor Grid)

## AI UI Generation Prompt

```markdown
Create a minimalist portfolio browser screen with a sophisticated Gameboy aesthetic.

DESIGN SYSTEM:
- Primary color: #9BBC0F (sage green)
- Accent color: #FFB30F (warm amber)
- Background: #F7F3E9 (cream paper with subtle texture)
- Typography: Berkeley Mono for all text
- Style: Conservative 8-bit pixel art with wabi-sabi imperfections

LAYOUT:
- Clean header with small pixel art logo and app name "INVEST WITH BILLIONAIRES"
- Grid of investor cards (2 columns on mobile, 3-4 on desktop)
- Generous white space between cards
- Each card should feel hand-crafted with subtle imperfections

INVESTOR CARD DESIGN:
- Soft rounded rectangle with subtle pixel-art-inspired corners
- Light border (#8B8680) with intentional slight irregularities
- Hand-drawn pixel art portrait of investor (32x32px style, simplified, iconic)
- Investor name in Berkeley Mono, bold
- Firm name in lighter weight
- Key metrics: Portfolio value (IBM Plex Mono, LED display style), Number of holdings
- ONE primary button: "Copy Portfolio" (sage green #9BBC0F, rounded)
- Button has subtle hand-drawn quality (slightly imperfect edges)
- Hover state: gentle lift with soft shadow

ATMOSPHERE:
- Warm, approachable, sophisticated
- Nostalgic 8-bit gaming meets modern fintech
- Organic textures (paper grain background)
- Minimal UI chrome, focus on content
- Each card feels unique (slight variations in positioning/borders)

INTERACTIONS:
- Smooth hover animations (lift cards slightly)
- Gentle fade-in on scroll
- Button hover: slight scale + glow effect

REFERENCE VIBE:
Gameboy aesthetics meets Linear's minimalism with authentic wabi-sabi imperfections
```

## Screen Purpose

**User Goal**: Discover and browse 20+ famous institutional investor portfolios to find one worth copying.

**Key User Actions**:
1. Browse investor cards in grid
2. View investor details (name, firm, portfolio size, holdings count)
3. Click "Copy Portfolio" to start customization

## Design Rationale

**Why this design works**:
- **One action per card**: Clear call-to-action reduces decision paralysis
- **Pixel art portraits**: Humanizes institutional investors, adds nostalgic warmth
- **Generous spacing**: Prevents overwhelming users with too much data
- **LED-style numbers**: Makes large portfolio values ($354B) feel authentic and precise
- **Wabi-sabi imperfections**: Hand-drawn borders create approachable, non-corporate feeling

## Responsive Considerations

**Mobile (< 768px)**:
- Single column card layout
- Larger tap targets (min 44x44px)
- Portraits remain 32x32px (crisp on mobile)

**Tablet (768px - 1024px)**:
- 2 column grid
- Maintain generous spacing

**Desktop (> 1024px)**:
- 3-4 column grid
- Maximum content width: 1400px (centered)

## Accessibility

- High contrast text on cream background (WCAG AA compliant)
- Interactive elements keyboard navigable (tab order)
- Investor portraits have alt text: "Warren Buffett pixel art portrait"
- Focus states clearly visible (sage green outline)

## Component Mapping

Maps to Epic 1, Story 1.8: "Portfolio Browser UI - Investor Grid"

**Required Data**:
- Investor name, firm, photo URL
- Latest portfolio filing date
- Total portfolio value (formatted)
- Number of holdings

**API Endpoint**: `GET /api/investors`
