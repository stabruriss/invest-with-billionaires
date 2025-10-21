# Screen 2: Portfolio Editor (Allocation Customizer)

## AI UI Generation Prompt

```markdown
Create a minimalist portfolio allocation editor with sophisticated Gameboy aesthetics and retro LED display numbers.

DESIGN SYSTEM:
- Primary: #9BBC0F (sage green)
- Accent: #FFB30F (warm amber)
- Background: #F7F3E9 (cream paper texture)
- Typography: Berkeley Mono (UI), IBM Plex Mono (numbers with LED display style)
- Conservative pixel art with hand-drawn imperfections

LAYOUT:
- Simple header: Portfolio name + total allocation indicator (large LED-style number showing "100.0%" in sage green when complete)
- Split view (desktop) or stacked (mobile):
  - LEFT: Original Buffett portfolio (read-only, muted colors)
  - RIGHT: Your custom version (editable, full color)
- Comparison delta shown prominently (+/- from original)

HOLDINGS LIST:
- Clean list layout (not dense table)
- Each holding row:
  - Small pixel art stock icon (16x16, hand-drawn feel)
  - Ticker symbol (Berkeley Mono, bold)
  - Company name (Berkeley Mono, lighter)
  - Allocation percentage (IBM Plex Mono, LED display style with subtle glow)
  - Simple slider OR direct input field (sage green accent)
  - Delta indicator: "+3.2%" in amber or "-1.5%" in muted red
- Generous spacing between rows (not cramped)
- Subtle dithered dividers between holdings

ALLOCATION CONTROL:
- Minimalist slider: thin track, chunky handle with pixel corners
- Or: Direct percentage input with LED-style numbers
- Real-time validation: total allocation indicator updates immediately
- When total ≠ 100%: gentle amber warning glow around total indicator

BOTTOM ACTION:
- ONE primary button: "Save Portfolio" (only enabled when 100%)
- Large, confident button (sage green)
- Disabled state: desaturated with subtle pixel texture

ATMOSPHERE:
- Focused, calm, empowering
- Retro calculator/scoreboard feel for numbers
- Hand-crafted pixel borders with slight irregularities
- Warm paper texture background
- Minimal chrome, maximum clarity

INTERACTIONS:
- Slider movement smooth but with subtle "stepped" feel (8-bit callback)
- Number updates with gentle LED-style flicker
- Validation feedback immediate but not jarring
- Hover states: subtle glow, no aggressive animations

REFERENCE VIBE:
Gameboy meets sophisticated spreadsheet with human touch
```

## Screen Purpose

**User Goal**: Customize institutional portfolio allocations to match personal preferences while maintaining 100% total allocation.

**Key User Actions**:
1. View original vs. custom portfolio side-by-side
2. Adjust allocation percentages via slider or direct input
3. See real-time total allocation (must equal 100%)
4. Save customized portfolio when valid

## Design Rationale

**Why this design works**:
- **LED-style numbers**: Creates focus on precision, mimics retro calculator displays
- **Real-time validation**: Large 100% indicator provides instant feedback
- **Side-by-side comparison**: Users always see delta from original strategy
- **Generous spacing**: Complex allocation task made calm and manageable
- **One save button**: Clear single action when ready

## Validation States

**Valid (Total = 100.0%)**:
- Total indicator: Sage green (#9BBC0F) with subtle glow
- Save button: Enabled, full color
- Positive reinforcement without being loud

**Invalid (Total ≠ 100.0%)**:
- Total indicator: Warm amber (#FFB30F) with gentle pulse
- Message: "Allocate remaining X.X%" or "Reduce by X.X%"
- Save button: Disabled (desaturated)
- Helpful, not punishing

## Interactive Elements

**Allocation Slider**:
- Range: 0% - 100%
- Step: 0.01% (precise control)
- Visual: Thin track, chunky pixel-corner handle
- Color: Sage green fill, gray track
- Snapping: Optional snap to 0%, 5%, 10% increments

**Direct Input**:
- Format: "XX.XX%" (LED-style numbers)
- Input validation: 0.00 - 100.00
- Focus state: Amber border
- Invalid state: Gentle shake animation

**Add/Remove Positions**:
- "Add Position" button (secondary, top-right)
- Remove icon per holding (pixel-art × icon, 8x8)

## Responsive Considerations

**Mobile (< 768px)**:
- Stack original/custom views vertically
- Collapse original view by default (expandable)
- Larger touch targets for sliders
- Direct input preferred over sliders on mobile

**Desktop (> 1024px)**:
- True side-by-side comparison
- Sticky total allocation indicator (top)
- Keyboard shortcuts (arrow keys adjust slider)

## Accessibility

- Sliders keyboard accessible (arrow keys adjust value)
- Input fields support screen readers with labels
- Validation errors announced to screen readers
- High contrast maintained in all states

## Component Mapping

Maps to Epic 2, Stories 2.3-2.6:
- Story 2.3: Portfolio Allocation Editing API
- Story 2.4: Real-Time Allocation Calculator
- Story 2.5: Portfolio Editor UI - Allocation Sliders
- Story 2.6: "Add New Position" Feature

**Required Data**:
- Original portfolio holdings with allocations
- User's custom allocations (if editing existing)
- Real-time calculation of total allocation

**API Endpoints**:
- `PATCH /api/user-portfolios/:id/holdings` (update allocations)
- `POST /api/user-portfolios/:id/holdings` (add position)
