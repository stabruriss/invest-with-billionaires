# Screen 3: Execution Preview (Order Confirmation)

## AI UI Generation Prompt

```markdown
Create a minimal, confident execution preview screen with sophisticated Gameboy aesthetics and retro gaming nostalgia.

DESIGN SYSTEM:
- Primary: #9BBC0F (sage green)
- Accent: #FFB30F (warm amber)
- Background: #F7F3E9 (cream paper texture)
- Typography: Berkeley Mono (UI), IBM Plex Mono (numbers - LED display style)
- Conservative pixel art with wabi-sabi authenticity

LAYOUT:
- Centered, focused design (not full-width)
- Clear visual hierarchy: total investment → order list → action
- Generous spacing, one primary action

HERO SECTION:
- Large LED-style total investment amount (IBM Plex Mono, 48-72px)
- "Total Investment: $10,000.00" with retro LED glow effect (sage green)
- Subtle pixel-art piggy bank or coins icon (32x32, hand-drawn)
- Buying power remaining shown below (smaller, amber accent)

ORDER LIST:
- Clean, scannable list (not dense table)
- Each order row:
  - Ticker (Berkeley Mono, bold)
  - Action: "Buy 25.24 shares" with fractional indicator
  - Estimated price per share (LED-style numbers)
  - Total allocation: "$4,500.00" (LED-style)
- Max 5 orders visible, "...and 13 more" with expand option
- Pixel-art checkmark icon next to each order (8x8, hand-drawn)
- Subtle dithered dividers

WARNINGS/INFO:
- Amber warning box (not harsh):
  - "⚠ Orders placed as market orders"
  - "Actual prices may vary"
- Pixel-art info icon (16x16)
- Warm amber (#FFB30F) background with subtle texture
- Berkeley Mono text, concise

PRIMARY ACTION:
- ONE large button: "Execute Portfolio" (sage green #9BBC0F)
- Confident size, rounded corners with pixel texture
- Subtle hand-drawn border irregularity
- Hover: gentle glow, slight lift

SECONDARY ACTION:
- Small text link: "← Go back and edit" (muted, top-left)

ATMOSPHERE:
- Confident but not reckless
- Retro game "Continue?" prompt vibe but sophisticated
- Warm, trustworthy, clear
- Honest about uncertainty (prices may vary)
- Minimal distractions, focus on decision

INTERACTIONS:
- Button hover: pulsing glow effect (retro game style but subtle)
- Expand order list: smooth accordion
- No aggressive animations, calm confidence

REFERENCE VIBE:
Retro game save screen meets fintech confidence with authentic warmth
```

## Screen Purpose

**User Goal**: Review and confirm portfolio execution details before submitting orders to brokerage.

**Key User Actions**:
1. Review total investment amount
2. Scan order list (holdings to purchase)
3. Understand execution timing and risks
4. Click "Execute Portfolio" to submit orders

## Design Rationale

**Why this design works**:
- **Hero number**: Large LED-style total immediately captures attention
- **Scannable orders**: List format (not table) easier to review on mobile
- **Honest warnings**: Amber info box sets realistic expectations
- **One button**: Clear single action reduces anxiety at decision point
- **Retro "save screen"**: Familiar pattern from gaming creates comfort

## Information Hierarchy

**Priority 1: Total Investment**
- Largest element on screen
- LED-style numbers create focus
- Shows buying power remaining (validates affordability)

**Priority 2: Order Details**
- First 5 orders visible by default
- Expand to see all (doesn't overwhelm initially)
- Each order shows: ticker, shares (fractional noted), price estimate, total

**Priority 3: Warnings/Disclaimers**
- Amber box not ignorable but not aggressive
- Sets realistic expectations about market orders
- Timing information (market hours, execution delay)

**Priority 4: Action**
- Large confident button at bottom
- Secondary "go back" link subtle but accessible

## States & Scenarios

**Sufficient Buying Power**:
- Green hero number
- "Execute Portfolio" button enabled
- Remaining buying power shown positively

**Insufficient Buying Power**:
- Hero number + amber warning
- "Insufficient buying power" message
- "Execute Portfolio" button disabled
- Suggestion: "Reduce investment or deposit funds"

**Market Closed**:
- Info message: "Market closed. Orders will execute at market open (tomorrow 9:30 AM ET)"
- Clock icon (pixel art, 16x16)
- Button still enabled (queues orders)

**Loading State** (after click):
- Button text: "Submitting orders..."
- Pixel-art loading spinner (8-bit style)
- Disable further clicks

## Fractional Share Indicator

**Visual Treatment**:
- Fractional shares noted: "Buy 25.24 shares (fractional)"
- Small pixel-art "½" icon (8x8)
- Tooltip on hover: "Fractional shares allow precise dollar amounts"

## Responsive Considerations

**Mobile (< 768px)**:
- Hero number scales down (36-48px)
- Order list: single column, larger touch targets
- Button full-width for easy tapping

**Desktop (> 1024px)**:
- Max content width: 800px (centered)
- Hero number: 56-72px
- Button fixed width (not full-width)

## Accessibility

- Focus order: Total → Order list → Warnings → Button
- Button has clear aria-label: "Execute portfolio with 18 orders totaling $10,000"
- Warnings announced to screen readers
- Keyboard shortcut: Enter to execute (with confirmation)

## Component Mapping

Maps to Epic 3, Stories 3.4-3.5:
- Story 3.4: Portfolio Execution Preview
- Story 3.5: One-Click Portfolio Execution
- Story 3.7: Buying Power Validation

**Required Data**:
- User's custom portfolio allocations
- Current market prices for all tickers
- Calculated shares to purchase (fractional)
- User's buying power from Alpaca
- Market status (open/closed)

**API Endpoints**:
- `GET /api/user-portfolios/:id/execution-preview` (preview data)
- `POST /api/user-portfolios/:id/execute` (submit orders)
