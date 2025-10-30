# Screen 4: Performance Dashboard

## AI UI Generation Prompt

```markdown
Create a minimalist performance dashboard with tactile hardware design, LED-style numbers, and clean data visualization.

DESIGN SYSTEM:
- Primary action: #FF6B35 or #FFB30F (warm orange)
- Secondary: #9BBC0F (sage green for gains/success)
- Background: #F7F3E9 (cream/off-white texture)
- Typography: Berkeley Mono (UI), IBM Plex Mono (numbers - LED display style)
- Style: Clean modular layout with hardware-inspired controls

LAYOUT:
- Hero metrics at top (large LED-style numbers)
- Time period selector (simple pill buttons)
- Performance chart (dominant visual)
- Comparison section (vs Buffett, vs S&P 500)
- ONE primary action at bottom

HERO METRICS:
- Portfolio value: Large LED-style numbers (IBM Plex Mono, 56-72px, sage green glow)
- "$10,234.56" with retro 7-segment display feel
- Today's change: "+$45.23 (+0.44%)" in sage green with pixel-art ▲ icon
- Total return: "+$234.56 (+2.35%)" below, slightly smaller
- Generous spacing between metrics
- Subtle pixel-art trophy icon (32x32, hand-drawn)

TIME PERIOD SELECTOR (Modular Button Grid):
- Horizontal button group: [1D] [1W] [1M] [3M] [6M] [1Y] [ALL]
- Selected state: Dark charcoal background (#2A2823), white text, tactile 3D pressed appearance
- Unselected: Light gray (#E8E6E0), dark text, raised appearance
- Berkeley Mono labels, uppercase
- Hardware-inspired button grid like EP-133 controls

PERFORMANCE CHART:
- Simple line chart (not overly complex)
- Sage green line (#9BBC0F) for user portfolio
- Dashed gray line for comparison (Buffett)
- Subtle grid with pixel dithering (not harsh lines)
- Clean axis labels (Berkeley Mono)
- Organic feel: slight hand-drawn irregularity in line rendering
- Chart fills 60% of screen vertical space
- Paper texture background behind chart

COMPARISON SECTION:
- Clean comparison cards (2-3 columns):
  - YOU: "+1.85%" (LED-style, sage green)
  - BUFFETT: "+1.50%" with delta "+0.35% ahead" (amber)
  - S&P 500: "+2.10%" with delta "-0.25% behind" (muted red)
- Pixel-art icons: user (pixelated person), Buffett (pixel portrait), S&P (pixel chart)
- Hand-drawn borders with imperfections
- Generous padding

PRIMARY ACTION:
- ONE button: "ANALYZE WITH AI" (warm orange #FF6B35, uppercase, tactile 3D depth)
- Or: "VIEW POSITIONS" as secondary action (light gray button)

ATMOSPHERE:
- Calm confidence, honest data presentation
- Retro scoreboard meets sophisticated analytics
- Warm, organic, not cold/clinical
- Celebrate wins gently (no aggressive gamification)
- Acknowledge losses honestly

INTERACTIONS:
- Period selector: smooth transitions, not jarring
- Chart hover: crosshair with pixel-art cursor (8x8)
- Value tooltip: LED-style numbers in small popup
- Gentle animations, nothing aggressive

REFERENCE VIBE:
Gameboy meets Bloomberg Terminal with wabi-sabi warmth and authentic data storytelling
```

## Screen Purpose

**User Goal**: Monitor portfolio performance, compare to institutional benchmark and broader market, understand investment success.

**Key User Actions**:
1. View current portfolio value and today's change
2. Select time period to analyze (1D to All-time)
3. Visualize performance trend via chart
4. Compare performance to Buffett and S&P 500
5. Access detailed position-level analysis

## Design Rationale

**Why this design works**:
- **LED scoreboard aesthetic**: Makes checking performance feel like checking a game score (nostalgic, less anxiety-inducing)
- **Honest comparisons**: Show both outperformance and underperformance authentically
- **Organic chart lines**: Slight hand-drawn irregularity humanizes data, reduces cold financial feeling
- **Generous spacing**: Complex financial data presented calmly
- **One action**: Clear next step after reviewing performance

## Chart Design Principles

**Visual Hierarchy**:
- User's line prominent (sage green, solid)
- Comparison lines subtle (dashed gray)
- Grid minimal (pixel dithering, not harsh)

**Hover Interaction**:
- Pixel-art crosshair cursor (8x8)
- Tooltip shows: Date, Your value, Buffett value, Delta
- LED-style numbers in tooltip
- Appears near cursor (not obstructing chart)

**Y-Axis Range**:
- Auto-scale to data range
- Include comparison lines in range calculation
- Round to clean numbers (not $10,234.567)

**X-Axis Labels**:
- Date labels appropriate for period:
  - 1D: Hourly (9:30, 10:30, 11:30...)
  - 1W: Daily (Mon, Tue, Wed...)
  - 1M-3M: Weekly (Oct 1, Oct 8...)
  - 6M-1Y: Monthly (Jan, Feb, Mar...)
  - ALL: Quarterly or monthly

## Performance States

**Positive Returns (Gains)**:
- Numbers in sage green (#9BBC0F)
- Pixel-art ▲ icon (8x8)
- Gentle positive vibe (not aggressive celebration)

**Negative Returns (Losses)**:
- Numbers in muted red (#C13B3B)
- Pixel-art ▼ icon (8x8)
- Honest presentation (not doom-and-gloom)

**Neutral/Flat**:
- Numbers in neutral gray
- Pixel-art ━ icon (8x8)

## Comparison Cards

**Structure**:
```
┌──────────────────────────┐
│ [Pixel Icon]             │
│ YOU                      │
│ +1.85%  (LED-style)      │
└──────────────────────────┘

┌──────────────────────────┐
│ [Pixel Portrait]         │
│ BUFFETT                  │
│ +1.50%                   │
│ You're ahead +0.35%      │ (amber accent)
└──────────────────────────┘

┌──────────────────────────┐
│ [Pixel Chart]            │
│ S&P 500                  │
│ +2.10%                   │
│ You're behind -0.25%     │ (muted red)
└──────────────────────────┘
```

**Visual Treatment**:
- Hand-drawn borders (slight imperfections)
- Pixel-art icons (16x16 or 32x32)
- LED-style numbers for percentages
- Delta prominently shown (relative performance)

## Responsive Considerations

**Mobile (< 768px)**:
- Hero metrics stack vertically
- Period selector scrollable horizontal
- Chart height: 50% of viewport
- Comparison cards stack (single column)

**Tablet (768px - 1024px)**:
- Hero metrics: 2 columns
- Comparison cards: 2 columns (You + Buffett top, S&P below)

**Desktop (> 1024px)**:
- Hero metrics: horizontal layout
- Comparison cards: 3 columns side-by-side
- Chart fills available width (max 1200px)

## Accessibility

- Chart has text alternative: "Portfolio performance chart showing 1.85% return over 1 month"
- Keyboard navigation for period selector
- High contrast maintained for colorblind users
- Screen reader announces current value and change

## Empty/Loading States

**No Data Yet** (new portfolio):
- Placeholder chart area
- Message: "Performance tracking begins after first market close"
- Pixel-art hourglass icon (16x16)
- Educational content: "Check back tomorrow!"

**Loading**:
- Skeleton screens for metrics
- Animated pixel-art loading dots (8-bit style)
- Chart area: light pulse animation

## Component Mapping

Maps to Epic 5, Stories 5.5-5.6:
- Story 5.5: Performance Dashboard UI Overview
- Story 5.6: Performance Chart Visualization
- Story 5.10: Performance Comparison View

**Required Data**:
- Current portfolio value, daily change, total return
- Historical portfolio values (time-series)
- Institutional portfolio benchmark returns
- S&P 500 returns for same periods
- Last update timestamp

**API Endpoints**:
- `GET /api/user-portfolios/:id/performance?period=1M` (summary metrics)
- `GET /api/user-portfolios/:id/performance/history?period=1M` (chart data)
