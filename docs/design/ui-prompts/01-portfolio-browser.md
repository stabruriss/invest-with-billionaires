# Screen 1: Portfolio Browser (Investor Grid)

## AI UI Generation Prompt

```markdown
Create a minimalist portfolio browser screen with tactile hardware-inspired design and 8-bit nostalgia.

DESIGN SYSTEM:
- Primary action color: #FF6B35 or #FFB30F (warm orange for main CTAs)
- Secondary color: #9BBC0F (sage green)
- Background: #F7F3E9 (cream paper with subtle texture)
- Typography: Berkeley Mono for all text
- Style: Clean minimalism with tactile 3D button elements (inspired by Teenage Engineering EP-133)

LAYOUT:
- Clean header with small logo and app name "INVEST WITH BILLIONAIRES"
- Grid of investor cards (2 columns on mobile, 3-4 on desktop)
- Generous white space between cards
- Modular, organized grid alignment

INVESTOR CARD DESIGN:
- Clean rounded rectangle (6-8px border radius)
- Light border (#8B8680), subtle 1px shadow for depth
- Investor portrait: Simplified icon or illustrated portrait (32x32px, clean geometric or hand-drawn energetic style)
- Investor name in Berkeley Mono, bold
- Firm name in lighter weight
- Key metrics: Portfolio value (IBM Plex Mono, LED display style with subtle glow), Number of holdings
- Small status indicator dot (6px, orange or green) showing filing freshness
- ONE primary button: "COPY PORTFOLIO" (warm orange #FF6B35, uppercase)
- Button has tactile 3D depth (1-2px bottom shadow, raised appearance)
- Hover state: lifts 2px, shadow deepens, feels pressable

ATMOSPHERE:
- Empowering, energetic, confident
- Hardware-inspired tactile UI meets modern fintech
- Subtle texture on background
- Minimal UI chrome, focus on content
- Professional yet approachable

INTERACTIONS:
- Card hover: gentle lift with soft shadow
- Button hover: tactile press effect (lift + shadow)
- Smooth transitions (200ms ease-out)
- Status dots may pulse for fresh data

REFERENCE VIBE:
Teenage Engineering EP-133 button interface meets Linear's minimalism with energetic, empowering personality
```

## Screen Purpose

**User Goal**: Discover and browse 20+ famous institutional investor portfolios to find one worth copying.

**Key User Actions**:
1. Browse investor cards in grid
2. View investor details (name, firm, portfolio size, holdings count)
3. Click "Copy Portfolio" to start customization

## Design Rationale

**Why this design works**:
- **One action per card**: Clear orange CTA reduces decision paralysis
- **Tactile buttons**: 3D depth makes primary action feel clickable and empowering
- **Status indicators**: Small colored dots provide at-a-glance freshness info
- **Generous spacing**: Prevents overwhelming users with too much data
- **LED-style numbers**: Makes large portfolio values ($354B) feel authentic and precise
- **Hardware-inspired UI**: Familiar tactile patterns create confidence in financial decisions

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
