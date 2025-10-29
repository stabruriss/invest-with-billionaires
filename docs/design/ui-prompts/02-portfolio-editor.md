# Screen 2: Portfolio Editor (Allocation Customizer)

## AI UI Generation Prompt

```markdown
Create a minimalist portfolio allocation editor with tactile hardware interface design and LED display numbers.

DESIGN SYSTEM:
- Primary action: #FF6B35 or #FFB30F (warm orange for SAVE/COMMIT)
- Secondary: #9BBC0F (sage green)
- Background: #F7F3E9 (cream paper texture)
- Typography: Berkeley Mono (UI), IBM Plex Mono (numbers with LED display style)
- Style: Clean modular layout inspired by music hardware interfaces (EP-133)

LAYOUT:
- Header section:
  - Portfolio name (editable, Berkeley Mono)
  - Large LED-style total allocation display: "100.0%"
  - Color: Sage green when valid (100%), pulsing orange when invalid
  - Small status indicator dot showing edit state
- Split view (desktop) or stacked (mobile):
  - LEFT: Original portfolio (read-only, muted/gray tones)
  - RIGHT: Your custom version (editable, full color, orange accents)
- Comparison deltas shown prominently (+/- from original)

HOLDINGS LIST (Modular Grid Layout):
- Clean list with generous spacing (not cramped table)
- Each holding row/module:
  - Small company icon (16x16, clean geometric or minimal illustration)
  - Ticker symbol (Berkeley Mono, bold, dark charcoal)
  - Company name (Berkeley Mono, lighter weight)
  - Allocation percentage (IBM Plex Mono, LED display style with subtle glow)
  - Allocation control: Slider OR direct input (orange accent for active state)
  - Delta indicator: "+3.2%" (orange) or "-1.5%" (muted red) vs original
  - Small remove button (× icon, minimal, light gray when inactive)
- Subtle 1px dividers between holdings
- Tactile control elements with depth

ALLOCATION CONTROLS:
- Slider option: Thin track (dark gray), orange fill, chunky handle with rounded edges and subtle shadow (3D tactile feel)
- Direct input option: LED-style number input with orange border on focus
- Real-time validation: Total allocation updates instantly
- Invalid state (≠100%): Orange pulsing glow around total, helpful message ("Add 12.5%" or "Reduce by 5%")

PRIMARY ACTIONS (Modular Button Group):
- "ADD POSITION" button (light gray/white background, dark text, secondary)
- "SAVE PORTFOLIO" button (warm orange #FF6B35, uppercase, tactile 3D depth)
- Save button only enabled when allocation = 100%
- Disabled state: Flat appearance, 40% opacity, no shadow
- Active state: Raised, prominent shadow, feels clickable

ATMOSPHERE:
- Focused, empowering, professional
- Hardware control panel aesthetic
- LED scoreboard feel for critical numbers
- Warm paper texture background
- Minimal chrome, maximum clarity and control

INTERACTIONS:
- Slider: Smooth dragging with tactile feedback
- Number updates: Gentle LED flicker effect
- Validation: Immediate feedback with pulsing orange indicator
- Button hover: Lift effect (2px), shadow deepens
- Button press: Tactile click (translateY: 0), satisfying interaction

REFERENCE VIBE:
Teenage Engineering EP-133 control panel meets professional trading interface with empowering tactile interactions
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
