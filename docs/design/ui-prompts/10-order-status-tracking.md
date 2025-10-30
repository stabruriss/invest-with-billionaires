# Screen 10: Order Status Tracking

## AI UI Generation Prompt

```markdown
Create a real-time order tracking screen with tactile hardware design and clear status communication.

DESIGN SYSTEM:
- Primary: #9BBC0F (sage green)
- Accent: #FFB30F (warm amber)
- Background: #F7F3E9 (cream paper texture)
- Typography: Berkeley Mono (all text), IBM Plex Mono (numbers - LED style)
- Conservative pixel art with hand-drawn authenticity

LAYOUT:
- Header: Order summary + refresh button
- Status timeline (visual progress indicator)
- Order list (all submitted orders with individual statuses)
- ONE primary action (View Portfolio Performance)
- Generous spacing, scannable layout

HEADER SECTION:
- Title: "Portfolio Execution Status" (Berkeley Mono, 28px, bold)
- Subtitle: Portfolio name "My Buffett Strategy" (muted, 16px)
- Timestamp: "Submitted Oct 15, 2024 at 10:23 AM ET" (small, 14px)
- Refresh button: Pixel-art ↻ icon (16x16) with "Refresh" text (small, top-right)

OVERALL STATUS (Hero Section):
- Large status indicator:
  - "18 of 18 Orders Filled ✓" (sage green, LED-style number)
  - Or: "15 of 18 Orders Filled..." (amber, with pixel-art loading spinner)
  - Or: "3 Orders Failed ⚠" (muted red)
- Progress bar: Visual fill showing completion (18/18 = 100% filled)
  - Filled: Sage green
  - Unfilled: Gray
  - Failed: Muted red segment

EXECUTION SUMMARY:
- Total invested: "$10,001.45" (LED-style, large, 32-48px)
- Commission: "$0.00 (zero-commission)" (small text)
- Average execution time: "2.3 seconds per order" (small text)
- Remaining buying power: "$4,998.55" (LED-style, smaller)

STATUS TIMELINE (Visual):
Horizontal pixel-art timeline showing order flow:
1. "Submitted" (checkmark, sage green)
2. "Processing" (current, if pending, amber pulsing)
3. "Filled" (checkmark, sage green)

Simple pixel-art icons (16x16) connected by dashed line

ORDER LIST:
- Clean list (not dense table)
- Each order row shows:

1. **Ticker Symbol** (bold, Berkeley Mono, 18px)
   - Company name below (muted, 14px)
   - Small pixel-art stock icon (16x16)

2. **Order Details**
   - "Buy 25.24 shares @ $178.30" (Berkeley Mono)
   - "(fractional)" indicator if < 1 share
   - Total: "$4,500.17" (LED-style)

3. **Status Badge** (color-coded):
   - "FILLED" (sage green background, cream text)
   - "PENDING" (amber background, pulsing)
   - "FAILED" (muted red background)
   - Pixel-art icon (8x8): checkmark, clock, or X

4. **Timestamp**
   - Filled: "10:23:05 AM ET"
   - Pending: "Submitted 2 min ago"
   - Failed: "Failed at 10:23:08 AM"

5. **Failure Reason** (if failed):
   - Amber warning box below order
   - "Insufficient buying power" or "Ticker not tradeable"
   - Suggested action: "Remove this position and try again"
   - Retry button (if retryable)

ORDER ROW STYLING:
- Generous padding (16-20px)
- Hand-drawn divider between orders (subtle, dithered)
- Hover: Slight background darken
- Successful orders: Normal treatment
- Failed orders: Amber left border (4px), warning box

REAL-TIME UPDATES:
- Auto-refresh every 5 seconds (while orders pending)
- Subtle animation when status changes (gentle fade-in)
- Pixel-art loading spinner (8x8) if polling
- No aggressive refresh (avoid jarring updates)

MARKET HOURS CONTEXT:
- If market closed: Info message
  - "⏰ Market closed. Orders will execute at market open (tomorrow 9:30 AM ET)"
  - Pixel-art clock icon (16x16)
  - Amber info box (not harsh)

PRIMARY ACTION (Bottom):
- ONE large button: "View Portfolio Performance" (sage green)
- Only enabled after all orders filled or handled
- Disabled state: Muted, "Waiting for orders to fill..."

SECONDARY ACTIONS:
- "Export Order Receipt" (small link, downloads CSV or PDF)
- "Contact Support" (if failures, small link)
- "Return to Dashboard" (breadcrumb or back link)

EMPTY/LOADING STATES:
- Initial load: Skeleton screens for order rows
- No orders: "No orders to display" (shouldn't happen, but handle gracefully)

ATMOSPHERE:
- Calm confidence during execution
- Honest about failures (clear reasons, retry options)
- Retro "loading level" aesthetic (game loading screen)
- Real-time without being jarring
- Transparent about what's happening

INTERACTIONS:
- Refresh button: gentle spin animation
- Status change: fade-in new status (150ms)
- Retry button: confirm, resubmit order
- Auto-scroll to failed orders (if any)

REFERENCE VIBE:
Retro game level loading screen meets real-time order tracking with honest transparency
```

## Screen Purpose

**User Goal**: Monitor portfolio execution in real-time, understand which orders filled/failed, and access next steps.

**Key User Actions**:
1. View overall execution status (X of Y filled)
2. See individual order statuses
3. Understand failure reasons (if any)
4. Retry failed orders (if retryable)
5. Proceed to performance dashboard when complete

## Design Rationale

**Why this design works**:
- **Overall status**: Hero section shows aggregate progress immediately
- **Real-time updates**: Auto-refresh keeps user informed without manual action
- **Clear failures**: Failed orders highlighted with reasons and retry options
- **Timeline visual**: Simple progress indicator reduces anxiety
- **One action**: Clear next step after execution completes
- **Loading aesthetic**: Retro game loading screen creates familiarity

## Order Status Types

**1. Pending**:
- Amber badge with clock icon
- "Submitted X seconds/minutes ago"
- Auto-refresh status every 5 seconds
- Spinner animation while waiting

**2. Filled (Success)**:
- Sage green badge with checkmark icon
- Fill price and timestamp displayed
- Final total calculated and shown
- Permanent record

**3. Failed**:
- Muted red badge with X icon
- Failure reason displayed below order
- Suggested actions provided
- Retry button (if applicable)

**4. Partially Filled** (rare with market orders):
- Amber badge with partial checkmark
- "Filled 10 of 25.24 shares"
- Remaining shares pending or canceled

## Real-Time Update Strategy

**Polling Frequency**:
- While orders pending: Poll every 5 seconds
- All orders filled/failed: Stop polling
- User navigates away: Stop polling (resume on return)

**Update Behavior**:
- Fetch order status from Alpaca API
- Update UI with new statuses (smooth transitions)
- If all complete: Show "All orders filled!" celebration
- If failures: Auto-scroll to failed orders

**Performance**:
- Debounce manual refresh button (prevent spam)
- Efficient API calls (batch status check)
- Graceful handling of API timeouts

## Failure Handling

**Common Failure Reasons**:

| Reason | User-Friendly Message | Suggested Action |
|--------|----------------------|------------------|
| Insufficient buying power | "Not enough funds available" | "Reduce portfolio value or deposit funds" |
| Ticker not tradeable | "Stock temporarily unavailable" | "Remove ticker or try again later" |
| Market halted | "Trading halted for this stock" | "Wait for trading to resume" |
| Order rejected | "Order rejected by broker" | "Contact support for details" |
| API timeout | "Connection issue with broker" | "Retry order" [Button] |

**Retry Logic**:
- Retry button available for transient failures (timeout, network)
- Not available for permanent failures (insufficient funds, invalid ticker)
- Retry attempts logged (max 3 attempts)
- Exponential backoff between retries

## Market Hours Handling

**During Market Hours** (9:30 AM - 4:00 PM ET):
- Orders execute immediately
- Real-time status updates
- Expected completion: 2-5 minutes

**After Market Close**:
- Info message: "Orders queued for market open tomorrow"
- Expected execution time: "Tomorrow at 9:30 AM ET"
- User can cancel queued orders (if supported by broker)
- No real-time updates until market opens

**Market Holidays**:
- Info message: "Market closed for holiday (Thanksgiving)"
- "Orders will execute on next trading day (Friday 9:30 AM ET)"

## Partial Execution Scenario

**Some Orders Fill, Some Fail**:
- Show clear separation:
  - "15 orders filled successfully ✓"
  - "3 orders failed ⚠"
- Highlight failed orders in list
- Calculate total invested from successful orders only
- Provide options:
  1. Continue with partial portfolio (proceed to dashboard)
  2. Retry failed orders
  3. Cancel entire execution (if possible)

## Success Celebration

**All Orders Filled**:
- Brief animated checkmark (pixel-art, 32x32)
- Message: "✓ All 18 orders filled successfully!"
- Confetti effect (optional, subtle pixel-art confetti)
- Enable "View Portfolio Performance" button
- Auto-redirect after 3 seconds (with countdown)

## Order Receipt Export

**Export Options**:
- CSV: Machine-readable, for spreadsheets
- PDF: Human-readable, printable receipt

**CSV Contents**:
```csv
Ticker,Shares,Fill Price,Total,Status,Timestamp
AAPL,25.24,$178.30,$4500.17,FILLED,2024-10-15 10:23:05 ET
BAC,43.97,$34.15,$1501.56,FILLED,2024-10-15 10:23:07 ET
...
```

**PDF Receipt**:
- Portfolio name, execution date
- Table of orders with statuses
- Total invested, commission
- Pixel-art branding (logo, aesthetic)
- Legal disclaimers

## Responsive Considerations

**Mobile (< 768px)**:
- Stack order details vertically
- Full-width status badges
- Larger tap targets for retry buttons
- Simplified timeline (vertical)

**Desktop (> 1024px)**:
- Order list: Tabular layout (wider)
- Timeline: Horizontal, prominent
- More details visible without scrolling

## Accessibility

- Screen reader announces status updates (ARIA live region)
- Keyboard navigable (Tab through orders, Enter to retry)
- Color-coding supplemented with icons (not color alone)
- Focus indicators visible (sage green outline)
- Status changes announced ("Order 1 filled successfully")

## Component Mapping

Maps to Epic 3, Story 3.6: Order Status Tracking

**Required Data**:
- Portfolio execution ID
- List of submitted orders with IDs
- Real-time order statuses from Alpaca
- Fill prices, timestamps
- Failure reasons (if any)

**API Endpoints**:
- `GET /api/executions/:id/status` (poll for updates)
- `POST /api/orders/:id/retry` (retry failed order)
- `GET /api/executions/:id/receipt` (export receipt)

**Next Screens**:
- After success: Performance Dashboard
- Retry failed: Execution Preview (edit and retry)
- Cancel: My Portfolios Dashboard
