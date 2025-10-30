# General Project Prompt for UI Builders (v0, Lovable, etc.)

**Use this prompt first to establish project context, then follow with individual screen prompts.**

---

```markdown
# PROJECT OVERVIEW: Invest with Billionaires

## Product Concept
A fintech web application that allows retail investors to browse, copy, and customize institutional investor portfolios from SEC 13F filings. Users can discover what billionaire investors like Warren Buffett hold, customize the allocations to match their preferences, and execute trades through Alpaca brokerage integration.

## Target Users
- **Primary**: Semi-sophisticated retail investors (ages 25-45, 2-5 years experience)
- **Secondary**: Aspiring investors (ages 22-35, 0-2 years experience)
- **Values**: Authenticity, simplicity, learning from experts, control over their investments

## Core User Flow
1. **Browse** 20+ famous institutional investors and their portfolios
2. **Copy** a portfolio with one click
3. **Customize** allocations using sliders/inputs (must total 100%)
4. **Execute** trades via connected Alpaca brokerage account
5. **Monitor** performance vs. original institutional portfolio and benchmarks
6. **Analyze** positions with AI-powered market insights (bridges 45-day 13F lag)

## Key Product Principles
- **Honest & Transparent**: Acknowledge 13F data has 45-day lag, prices may vary, not investment advice
- **One Action Per Screen**: Reduce decision paralysis with clear primary CTAs
- **Empowering**: Users feel confident and in control of their investment decisions
- **Educational**: Learn from institutional strategies without intimidation
- **100% Allocation Constraint**: Portfolio editor enforces real-time validation

## Design Aesthetic

### Core Identity
**Tactile hardware minimalism meets 8-bit nostalgia with empowering energy**

Inspired by Teenage Engineering EP-133 music hardware:
- Modular button grids with tactile 3D depth
- Hardware control panel aesthetics
- LED-style displays for critical numbers
- Status indicator dots showing system state
- Energetic hand-drawn illustrations (bold line art)
- Professional yet playful, empowering champion mindset

### Color Palette
- **Primary Action (Orange)**: #FF6B35 or #FFB30F - Use for EXECUTE, COMMIT, SAVE buttons
- **Secondary (Sage Green)**: #9BBC0F - Success states, gains, secondary actions
- **Background**: #F7F3E9 - Cream/off-white with subtle paper texture
- **Text Primary**: #2A2823 - Dark charcoal for body text
- **Text Secondary**: #6B6860 - Muted gray for supporting text
- **Neutral Gray**: #8B8680 - Borders, dividers, inactive states
- **Accent (Amber)**: #FFB30F - Warnings, attention, validation errors
- **Success (Gains)**: #9BBC0F - Positive returns, upward trends
- **Danger (Losses)**: #C13B3B - Negative returns (muted, not harsh)
- **Info**: #7A8C8E - Informational messages, neutral states

### Typography
- **UI Text**: Berkeley Mono (monospace for all interface labels, buttons, body text)
- **Numbers/Data**: IBM Plex Mono with LED display glow effect (portfolio values, prices, percentages)
- **Hierarchy**: Varied sizing for dynamic visual hierarchy
- **Button Text**: UPPERCASE for primary actions, sentence case for secondary
- **Fallbacks**: 'Berkeley Mono', 'IBM Plex Mono', 'Courier New', monospace

### Type Scale
- **H1**: 48px (mobile: 36-42px), bold, page titles
- **H2**: 32px, bold, section headers
- **H3**: 24px, semi-bold, subsection headers
- **H4**: 20px, semi-bold, card headers
- **Body Large**: 18px, main content
- **Body**: 16px, standard text
- **Body Small**: 14px, supporting text
- **Caption**: 12px, metadata, timestamps
- **LED Display**: Variable size, 500 weight, letter-spacing 0.02em, with glow effect

### UI Components Philosophy

**Buttons (Hardware-Inspired)**:
- **Primary (Orange)**: Warm orange (#FF6B35), white text, uppercase, for dominant CTAs (EXECUTE, COMMIT, SAVE)
- **Main Action (Sage Green)**: Sage green (#9BBC0F), white text, for secondary important actions
- **Dark**: Dark charcoal (#2A2823), white text, for main functions and mode selection
- **Light**: Light gray (#E8E6E0), dark text, for secondary/tertiary actions
- **Danger**: Muted red (#C13B3B), white text, for destructive actions

**Button States (Tactile 3D Design)**:
- **Default**: Solid color with 1-2px bottom shadow/border creating raised appearance, rounded corners (6-8px)
- **Hover**: Lifts 2px (translateY: -2px), shadow deepens, feels pressable
- **Active/Press**: Pressed down (translateY: 0), shadow reduces, darker shade (brightness 0.9)
- **Disabled**: 40% opacity, desaturated, no shadow (flat appearance)
- **Loading**: Animated spinner or pulsing orange dot

**Button Sizing**:
- Small: 32px height, 12px horizontal padding
- Medium: 40px height, 16px horizontal padding
- Large: 48px height, 24px horizontal padding
- **Minimum touch target**: 44x44px on mobile

**Status Indicators**:
- Small colored dots (6-8px diameter circles)
- **Orange (#FFB30F)**: Active, recording, processing (may pulse: scale 1 → 1.2 → 1)
- **Green (#9BBC0F)**: Connected, success, ready
- **Red (#C13B3B)**: Error, disconnected, warning
- **Gray (#8B8680)**: Inactive, off, neutral
- Positioned near labels or within buttons
- Used for: Connection status, mode indicators, processing states

**LED Displays**:
- Large numbers (portfolio values, percentages, prices)
- IBM Plex Mono typography
- Subtle glow effect: `text-shadow: 0 0 8px rgba(155, 188, 15, 0.3), 0 0 16px rgba(155, 188, 15, 0.1)`
- Color changes based on state:
  - Green (#9BBC0F) = valid/100% allocation/gains
  - Orange (#FFB30F) = invalid/warning/attention needed
  - Red (muted) = losses/negative
- Font size: 48-72px for hero numbers, 24-36px for inline numbers

**Cards**:
- Background: Slightly darker cream (#F0ECE3) or white
- Border: 1px solid #8B8680
- Border radius: 8px
- Padding: 16-24px
- Shadow: Subtle (0 1px 3px rgba(0,0,0,0.1))
- Hover: Lift 4px, shadow deepens

**Illustrations**:
- Bold black line art with orange accent fills
- Energetic, empowering characters and diagrams
- Hand-drawn style (not corporate stock illustrations)
- Usage: Hero sections, empty states, onboarding flows, feature explanations
- Examples: Investors as energetic characters, hand pointing at interfaces, technical diagrams with personality

**Input Fields**:
- Background: Light cream or white
- Border: 1px solid #8B8680
- Focus state: Orange border (#FFB30F), subtle glow
- Error state: Red border, shake animation, error message below
- Labels: Always visible (not placeholder-only), 14px, 600 weight

**Sliders**:
- Track: Thin (4px), gray (#8B8680)
- Fill: Orange (#FFB30F) or sage green (#9BBC0F)
- Handle: Chunky (24px), rounded, tactile with shadow
- Hover: Handle enlarges (26px)
- Active: Handle glows, track thickens (6px)

### Layout Principles
- **8px base unit grid**: All spacing in multiples of 8 (8, 16, 24, 32, 48, 64, 96)
- **Generous Spacing**: Not cramped, calm presentation reduces investment anxiety
- **Modular Grids**: Clean alignment like hardware control panels
- **Minimal Chrome**: Content-focused, essential UI only
- **One Primary CTA**: Per screen maximum, clear action hierarchy
- **Max content width**: 1400px (centered)
- **Page margins**: 16px (mobile), 32px (tablet), 48px (desktop)

### Responsive Breakpoints
- **Mobile**: 320px - 767px (single column, stacked elements)
- **Tablet**: 768px - 1023px (2-column grids)
- **Desktop**: 1024px - 1439px (3-4 column grids)
- **Wide**: 1440px+ (max-width 1400px centered)

### Atmosphere & Personality
- **Empowering**: "You can invest like a champion"
- **Energetic**: Playful illustrations, dynamic interactions
- **Honest**: Never hide limitations or uncertainties
- **Confident**: Not reckless, but assured and trustworthy
- **Professional**: Fintech standards with approachable warmth
- **Nostalgic**: 8-bit references, LED displays, retro hardware aesthetic

### Interaction Patterns
- **Hover animations**: 200ms ease-out transitions
- **Button clicks**: Tactile press effect (translateY and brightness changes)
- **Card hovers**: Lift 4px with shadow deepening
- **Number updates**: Gentle LED-style flicker (opacity 0.8 → 1, 150ms)
- **Validation feedback**: Immediate, non-jarring (pulsing orange indicators)
- **Loading states**: Skeleton screens or minimal spinners
- **Modals**: Scale + fade (300ms), ESC to close, focus trap

## Technical Context
- **Frontend**: React (modern hooks/components)
- **Styling**: Tailwind CSS preferred (or CSS-in-JS)
- **Data**: REST API endpoints (mock data acceptable for prototypes)
- **Auth**: Firebase Authentication
- **Brokerage**: Alpaca API integration (OAuth flow)
- **Charts**: Lightweight library (Recharts, Chart.js, or similar)
- **Icons**: Custom SVG icons or simple geometric shapes
- **Fonts**: Google Fonts or similar CDN (Berkeley Mono alternatives: IBM Plex Mono, Roboto Mono)

## Data Structures (for reference)

### Investor
```json
{
  "id": "buffett-berkshire",
  "name": "Warren Buffett",
  "firm": "Berkshire Hathaway",
  "photoUrl": "/images/investors/buffett.png",
  "portfolioValue": 354000000000,
  "holdingsCount": 45,
  "latestFilingDate": "2024-09-30",
  "performanceYTD": 12.5
}
```

### Holding
```json
{
  "ticker": "AAPL",
  "companyName": "Apple Inc.",
  "allocation": 45.2,
  "shares": 915560000,
  "marketValue": 162500000000,
  "pricePerShare": 177.50
}
```

### Portfolio (User's Custom)
```json
{
  "id": "user-portfolio-123",
  "name": "My Buffett Copy",
  "baseInvestorId": "buffett-berkshire",
  "totalAllocation": 100.0,
  "holdings": [...],
  "createdAt": "2024-10-29T10:00:00Z"
}
```

## Accessibility Requirements
- **WCAG 2.1 Level AA compliance**
- **Color contrast**: 4.5:1 minimum for body text, 3:1 for large text/UI components
- **Keyboard navigation**: All interactive elements accessible via Tab, Enter, Space, Arrow keys
- **Focus indicators**: 2px solid outline, 2px offset, visible on all focusable elements
- **Screen reader support**: Semantic HTML, ARIA labels, alt text for images
- **Touch targets**: Minimum 44x44px on mobile, 8px spacing between targets
- **Form labels**: Always visible (not placeholder-only)
- **Error messages**: Clearly associated with fields, announced to screen readers
- **Reduced motion**: Respect `prefers-reduced-motion` media query

## Compliance & Legal
- Display disclaimers: "Not investment advice | SEC disclaimers apply"
- Show 13F data lag warnings: "⚠ 13F data has 45-day lag - we make it useful with AI"
- Market order warnings in execution flow: "Orders placed as market orders - actual prices may vary"
- "Prices may vary" messaging on execution preview

## Important Constraints
- **100% Allocation Rule**: Portfolio editor must validate total = 100.0% before allowing save
- **One Primary CTA**: Only ONE orange primary button per screen
- **Honest Transparency**: Never hide data limitations or uncertainties
- **Real-time Validation**: Allocation changes update total immediately
- **No Fake Precision**: Acknowledge price variability, 45-day lag, market uncertainties

---

**Now generate [SPECIFIC SCREEN NAME] following this project context and the screen-specific prompt below.**
```

## Usage Instructions

1. **Copy the entire prompt above** (between the triple backticks)
2. **Paste into v0/Lovable** as your first message
3. **Follow with the specific screen prompt** from files like:
   - `01-portfolio-browser.md`
   - `02-portfolio-editor.md`
   - `03-execution-preview.md`
   - etc.

This establishes consistent context across all screen generations.
