# Epic 3: Trading Integration & Execution

## Epic Overview

**Goal**: Implement Alpaca integration for one-click portfolio execution with OAuth authentication, fractional share handling, and order management workflow.

**Business Value**: Transforms the platform from research tool to execution platform, enabling the core "30 minutes from discovery to invested" promise. This is the critical revenue-driving feature that justifies subscription pricing.

**Success Metrics**:
- 80%+ of users successfully connect Alpaca brokerage account
- Average time from portfolio save to order execution: <5 minutes
- Zero failed orders due to system errors (only market/account issues)
- Order execution costs remain predictable and transparent
- 90%+ user satisfaction with execution experience

## User Stories

### Story 3.1: Alpaca API Client Integration

**As a** developer
**I want** a robust Alpaca API client wrapper
**So that** the system can interact with Alpaca services reliably

**Acceptance Criteria**:
- [ ] Alpaca SDK integrated into backend codebase
- [ ] API client supports both paper and live trading environments
- [ ] Authentication handling for OAuth flow implemented
- [ ] Rate limiting and request throttling configured
- [ ] Error handling for all Alpaca API failure modes
- [ ] Logging for all API interactions with Alpaca

**Alpaca API Capabilities Required**:
- Account information retrieval
- Buying power and position queries
- Market order submission (fractional shares)
- Order status tracking
- Position and portfolio value queries

**Technical Considerations**:
- Store Alpaca environment flag (paper vs. live) per user
- Implement exponential backoff for rate limits
- Handle Alpaca API downtime gracefully
- Log all orders for audit trail
- Secure storage of OAuth tokens

**Dependencies**: Epic 1 (API foundation, authentication)

**Definition of Done**:
- [ ] Alpaca SDK installed and configured
- [ ] Test API calls succeed in sandbox
- [ ] Rate limiting prevents quota violations
- [ ] Error handling covers all failure scenarios
- [ ] API interactions logged for monitoring

---

### Story 3.2: Alpaca OAuth Connection Flow

**As a** user
**I want** to securely connect my Alpaca brokerage account
**So that** I can execute portfolio orders through the platform

**Acceptance Criteria**:
- [ ] "Connect Brokerage" button initiates OAuth flow
- [ ] OAuth redirects to Alpaca authorization page
- [ ] User grants permissions and redirects back to platform
- [ ] OAuth tokens securely stored encrypted in database
- [ ] Connection status displayed in user settings
- [ ] User can disconnect and reconnect account

**OAuth Flow Steps**:
1. User clicks "Connect Alpaca Account"
2. System initiates OAuth flow with Alpaca
3. User redirected to Alpaca login/authorization
4. User grants permissions (trading, account data)
5. Alpaca redirects back with authorization code
6. System exchanges code for access/refresh tokens
7. Tokens stored encrypted, user marked as connected

**Technical Considerations**:
- Implement OAuth 2.0 authorization code flow
- Store tokens encrypted at rest
- Handle token refresh automatically
- Implement OAuth state parameter for CSRF protection
- Display clear permission scopes to user

**Dependencies**: Story 3.1 (Alpaca client), Epic 1 Story 1.2 (authentication)

**Definition of Done**:
- [ ] User successfully connects Alpaca account
- [ ] OAuth tokens stored securely encrypted
- [ ] Connection status reflected in UI
- [ ] User can disconnect account
- [ ] Failed OAuth attempts handled gracefully

---

### Story 3.3: Account Information Display

**As a** user
**I want** to view my Alpaca account information
**So that** I understand my buying power and current positions

**Acceptance Criteria**:
- [ ] Account summary page displays buying power
- [ ] Current positions shown with quantities and values
- [ ] Account equity and cash balance displayed
- [ ] Account status (active, suspended, etc.) shown
- [ ] Paper vs. live trading environment clearly indicated
- [ ] Account data refreshes on page load

**Account Information Displayed**:
- **Buying Power**: Available funds for trading
- **Portfolio Value**: Total account equity
- **Cash Balance**: Uninvested cash
- **Current Positions**: Existing holdings with quantities
- **Account Status**: Active, restricted, etc.
- **Environment**: Paper Trading or Live Trading

**Technical Considerations**:
- Fetch account data from Alpaca on authenticated requests
- Cache account data with short TTL (5 minutes)
- Handle cases where account is restricted/suspended
- Display clear warnings if buying power insufficient

**Dependencies**: Story 3.2 (OAuth connection)

**Definition of Done**:
- [ ] Account summary displays all key metrics
- [ ] Buying power shown accurately
- [ ] Current positions listed correctly
- [ ] Data refreshes on page load
- [ ] Account restrictions displayed clearly

---

### Story 3.4: Portfolio Execution Preview

**As a** user
**I want** to preview my portfolio execution before submitting orders
**So that** I can verify costs and understand what will happen

**Acceptance Criteria**:
- [ ] Execution preview shows all orders to be submitted
- [ ] Each order displays ticker, shares, order type, estimated price
- [ ] Total investment amount calculated and displayed
- [ ] Buying power check performed before submission
- [ ] Fractional share orders clearly indicated
- [ ] Estimated execution cost and fees shown

**Preview Display Components**:
```
Portfolio Execution Preview
Total Investment: $10,000

Orders to be placed:
1. AAPL - Buy 25.24 shares (fractional) @ ~$178.25 = $4,497.51
2. BAC - Buy 43.97 shares (fractional) @ ~$34.12 = $1,500.03
3. KO - Buy 24.15 shares (fractional) @ ~$62.08 = $1,499.23
... (15 more orders)

Total Estimated Cost: $9,996.77
Your Buying Power: $15,000
Remaining After Execution: $5,003.23

⚠️ Orders will be placed as market orders during next market hours
⚠️ Actual execution prices may vary from estimates
```

**Technical Considerations**:
- Fetch current market prices for preview
- Calculate total cost with price estimates
- Verify buying power covers total cost
- Handle market closed scenarios (show last close)
- Display clear timing expectations (immediate vs. market open)

**Dependencies**: Story 3.3 (account info), Epic 2 Story 2.11 (position calculator)

**Definition of Done**:
- [ ] Preview displays all orders accurately
- [ ] Total cost calculated correctly
- [ ] Buying power check prevents over-spending
- [ ] Market price estimates shown
- [ ] User understands timing and risks

---

### Story 3.5: One-Click Portfolio Execution

**As a** user
**I want** to execute my entire portfolio with one action
**So that** I can quickly invest without manual order entry

**Acceptance Criteria**:
- [ ] "Execute Portfolio" button available after preview
- [ ] Single click submits all portfolio orders to Alpaca
- [ ] Orders placed as market orders for immediate execution
- [ ] Fractional shares enabled for all orders
- [ ] Order submission status displayed in real-time
- [ ] Success/failure feedback for each order

**Execution Flow**:
1. User reviews execution preview
2. User clicks "Execute Portfolio"
3. System validates buying power one final time
4. System submits orders sequentially to Alpaca
5. Real-time status updates displayed per order
6. Final summary shows successful/failed orders
7. User redirected to order status page

**Technical Considerations**:
- Submit orders with `fractional_shares: true` parameter
- Use market orders for immediate execution
- Handle partial order failures gracefully
- Implement order submission retry logic (3 attempts)
- Log all order submissions for audit

**Error Scenarios**:
- Insufficient buying power
- Ticker not tradeable (halted, delisted)
- Market closed (queue for market open)
- Alpaca API timeout
- Account restrictions preventing trading

**Dependencies**: Story 3.4 (execution preview), Story 3.1 (Alpaca client)

**Definition of Done**:
- [ ] User can execute full portfolio with one click
- [ ] All orders submitted to Alpaca successfully
- [ ] Fractional share orders accepted
- [ ] Real-time feedback during submission
- [ ] Failed orders handled with clear messaging

---

### Story 3.6: Order Status Tracking

**As a** user
**I want** to see the status of my submitted orders
**So that** I know if my portfolio execution succeeded

**Acceptance Criteria**:
- [ ] Order status page lists all submitted orders
- [ ] Each order shows current status (pending, filled, failed)
- [ ] Fill price and timestamp displayed for completed orders
- [ ] Failed orders show failure reason
- [ ] Status updates in real-time (or with refresh)
- [ ] User can view order history

**Order Statuses Displayed**:
- **Pending**: Order submitted, awaiting market execution
- **Filled**: Order executed successfully
- **Partially Filled**: Order partially executed (unlikely with market orders)
- **Canceled**: Order canceled before execution
- **Rejected**: Order rejected by broker/exchange
- **Failed**: System error during submission

**Order Details Shown**:
- Ticker symbol and company name
- Order type (market buy)
- Shares ordered (fractional)
- Submitted timestamp
- Fill price and timestamp (if filled)
- Failure reason (if failed)

**Technical Considerations**:
- Poll Alpaca API for order status updates
- Store order records in database for history
- Implement webhooks for real-time updates (future)
- Handle orders that remain pending overnight
- Display market hours context for pending orders

**Dependencies**: Story 3.5 (portfolio execution)

**Definition of Done**:
- [ ] Order status page displays all orders
- [ ] Status updates reflect Alpaca data
- [ ] Fill prices shown for completed orders
- [ ] Failure reasons displayed clearly
- [ ] Order history accessible

---

### Story 3.7: Buying Power Validation

**As a** system
**I want** to prevent portfolio executions exceeding buying power
**So that** users don't experience order failures

**Acceptance Criteria**:
- [ ] Buying power checked before showing execution preview
- [ ] Real-time validation as user adjusts investment amount
- [ ] Clear error message if buying power insufficient
- [ ] Suggested reduction amount calculated and displayed
- [ ] Final validation performed before order submission
- [ ] Buying power cached briefly to avoid excessive API calls

**Validation Points**:
1. **Portfolio Editor**: Show buying power context when user enters investment amount
2. **Execution Preview**: Validate total cost ≤ buying power
3. **Pre-Submission**: Final check before submitting orders to Alpaca
4. **Post-Market-Close**: Re-validate at market open for queued orders

**Error Messages**:
```
⚠️ Insufficient Buying Power
Total portfolio cost: $12,500
Your buying power: $10,000
Shortfall: $2,500

Suggestions:
- Reduce investment amount to $10,000 or less
- Deposit additional funds to your Alpaca account
- Adjust portfolio allocations to fewer positions
```

**Technical Considerations**:
- Fetch buying power from Alpaca account API
- Cache buying power for 5 minutes to reduce API calls
- Account for pending orders reducing buying power
- Handle overnight buying power changes

**Dependencies**: Story 3.3 (account info), Story 3.4 (execution preview)

**Definition of Done**:
- [ ] Buying power validated at all critical points
- [ ] Clear error messages when insufficient
- [ ] Suggested actions provided to user
- [ ] Validation prevents failed order submissions
- [ ] Caching reduces API call costs

---

### Story 3.8: Fractional Share Handling

**As a** user
**I want** fractional share orders to execute correctly
**So that** I can invest precise dollar amounts

**Acceptance Criteria**:
- [ ] Fractional shares enabled for all Alpaca orders
- [ ] Share quantities calculated to 6 decimal places
- [ ] UI clearly indicates fractional shares (e.g., "25.24 shares")
- [ ] Fractional share limitations communicated to user
- [ ] User understands benefits of fractional investing
- [ ] Fractional positions displayed in account view

**Fractional Share Details**:
- **Precision**: Up to 6 decimal places (0.000001 shares minimum)
- **Availability**: Most stocks supported, some exclusions (penny stocks, etc.)
- **Pricing**: Same price as full shares
- **Voting Rights**: Proportional to ownership

**Educational Content**:
```
💡 Fractional Shares Enabled
You can invest exact dollar amounts without being constrained by
full share prices. For example, with $1,000 you can buy 5.61 shares
of a $178.25 stock instead of only 5 shares.

Benefits:
✓ Invest precise dollar amounts
✓ Maintain exact allocation percentages
✓ Access high-priced stocks with small capital
```

**Technical Considerations**:
- Set `fractional_shares=true` on all Alpaca orders
- Calculate share quantities with 6 decimal precision
- Handle stocks where fractional shares unavailable
- Display fractional positions correctly in portfolio

**Dependencies**: Story 3.5 (portfolio execution)

**Definition of Done**:
- [ ] Fractional share orders submit successfully
- [ ] Share quantities precise to 6 decimals
- [ ] UI clearly shows fractional quantities
- [ ] Educational content explains benefits
- [ ] Limitations communicated to user

---

### Story 3.9: Market Hours & Order Timing

**As a** user
**I want** to understand when my orders will execute
**So that** I have realistic expectations about timing

**Acceptance Criteria**:
- [ ] Market status displayed (open, closed, pre-market, after-hours)
- [ ] Current time and next market open time shown
- [ ] Orders submitted during closed hours queued for market open
- [ ] User notified of order queueing behavior
- [ ] Market holidays identified and communicated
- [ ] Timezone conversions handled correctly (display in user's local time)

**Market Status Indicators**:
```
🟢 Market Open (9:30 AM - 4:00 PM ET)
"Your orders will execute immediately at current market prices"

🔴 Market Closed
"Your orders will be queued and execute at market open tomorrow (9:30 AM ET)"

🎉 Market Holiday (e.g., Thanksgiving)
"Market closed for holiday. Orders will execute on next trading day (Friday 9:30 AM ET)"
```

**Technical Considerations**:
- Implement market hours detection (9:30 AM - 4:00 PM ET)
- Handle market holidays using calendar data
- Display times in user's timezone with ET reference
- Update status indicator in real-time
- Queue orders submitted outside market hours

**Dependencies**: Story 3.5 (portfolio execution)

**Definition of Done**:
- [ ] Market status accurately displayed
- [ ] User understands order execution timing
- [ ] Market holidays identified correctly
- [ ] Timezones handled properly
- [ ] Queued orders explained clearly

---

### Story 3.10: Order Confirmation & Receipt

**As a** user
**I want** a confirmation receipt after executing my portfolio
**So that** I have a record of my investment

**Acceptance Criteria**:
- [ ] Confirmation page displays after successful execution
- [ ] Receipt includes all order details and fill prices
- [ ] Total invested amount and remaining buying power shown
- [ ] Confirmation email sent to user (optional)
- [ ] Receipt downloadable as PDF (future enhancement)
- [ ] Link to view portfolio performance

**Confirmation Receipt Format**:
```
✅ Portfolio Execution Complete
"My Buffett Strategy" - Executed on March 15, 2024 at 10:23 AM ET

Orders Filled:
1. AAPL - Bought 25.24 shares @ $178.30 = $4,500.17
2. BAC - Bought 43.97 shares @ $34.15 = $1,501.56
3. KO - Bought 24.15 shares @ $62.10 = $1,499.72
... (15 more orders)

Total Invested: $10,001.45
Commission: $0 (zero-commission trading)
Previous Buying Power: $15,000
Remaining Buying Power: $4,998.55

📊 View Portfolio Performance
```

**Technical Considerations**:
- Generate confirmation immediately after all orders filled
- Store confirmation data in database for history
- Implement email notification service (SendGrid/AWS SES)
- Design printable confirmation format
- Link to performance tracking (Epic 5)

**Dependencies**: Story 3.6 (order status tracking)

**Definition of Done**:
- [ ] Confirmation page displays after execution
- [ ] All order details shown accurately
- [ ] Total invested amount calculated correctly
- [ ] Email confirmation sent (if enabled)
- [ ] Receipt accessible from order history

---

### Story 3.11: Failed Order Handling & Retry

**As a** user
**I want** clear guidance when orders fail
**So that** I can resolve issues and successfully invest

**Acceptance Criteria**:
- [ ] Failed orders clearly marked with failure reason
- [ ] User-friendly error messages explain what went wrong
- [ ] Retry button available for transient failures
- [ ] Suggested actions provided based on failure type
- [ ] Partial execution handled (some orders succeed, others fail)
- [ ] Support contact information for complex failures

**Common Failure Reasons & Handling**:

| Failure Reason | User-Friendly Message | Suggested Action |
|----------------|----------------------|------------------|
| Insufficient buying power | Not enough funds | Reduce investment amount or deposit funds |
| Ticker not tradeable | Stock temporarily unavailable | Remove ticker or try again later |
| Market closed | Can't execute now | Queue for market open tomorrow |
| Account restricted | Account has trading restrictions | Contact Alpaca support |
| API timeout | Connection issue | Retry submission |
| Invalid order size | Order too small/large | Adjust allocation amounts |

**Partial Execution Handling**:
- Display successful orders separately from failed
- Calculate total invested from successful orders
- Allow user to retry only failed orders
- Update buying power based on successful executions

**Technical Considerations**:
- Map Alpaca error codes to user-friendly messages
- Implement retry logic with exponential backoff
- Log all failures for monitoring and support
- Track retry attempts to prevent infinite loops
- Provide support ticket creation for persistent failures

**Dependencies**: Story 3.6 (order status tracking), Story 3.5 (execution)

**Definition of Done**:
- [ ] Failed orders show clear failure reasons
- [ ] Error messages user-friendly and actionable
- [ ] Retry functionality works for appropriate failures
- [ ] Partial executions handled gracefully
- [ ] Support escalation path available

---

### Story 3.12: Existing Position Handling

**As a** user
**I want** to understand how my existing positions affect portfolio execution
**So that** I don't accidentally over-allocate to stocks I already own

**Acceptance Criteria**:
- [ ] System detects existing positions from Alpaca account
- [ ] Warning displayed if user already owns portfolio tickers
- [ ] Option to "top up" existing positions to target allocation
- [ ] Option to "ignore and add" (may result in over-allocation)
- [ ] Clear explanation of position consolidation
- [ ] Final allocations shown after considering existing holdings

**Existing Position Scenarios**:

**Scenario 1: User owns AAPL, copying portfolio with AAPL**
```
⚠️ Existing Position Detected
You already own 15 shares of AAPL ($2,673.75 current value)

Your new portfolio allocates 45% ($4,500) to AAPL

Options:
1. Top Up: Buy additional shares to reach $4,500 total (buy 10.24 shares)
2. Keep & Add: Buy full allocation, resulting in $7,173.75 AAPL (52% of new total)
3. Skip: Don't buy additional AAPL, adjust other allocations proportionally
```

**Technical Considerations**:
- Query Alpaca positions before portfolio execution
- Calculate position overlap with target portfolio
- Provide clear math showing before/after allocations
- Allow user choice on handling existing positions
- Recalculate allocations based on user selection

**Dependencies**: Story 3.3 (account info), Story 3.4 (execution preview)

**Definition of Done**:
- [ ] Existing positions detected from Alpaca
- [ ] User warned of position overlaps
- [ ] Options provided for handling overlaps
- [ ] Allocation math shown clearly
- [ ] User choice implemented in execution

---

### Story 3.13: Paper Trading Mode Toggle

**As a** user
**I want** to practice portfolio execution with paper trading
**So that** I can learn the system without risking real money

**Acceptance Criteria**:
- [ ] User can toggle between paper and live trading modes
- [ ] Paper trading mode clearly indicated throughout UI
- [ ] All features functional in paper trading mode
- [ ] User cannot accidentally execute live trades in paper mode
- [ ] Tutorial/onboarding encourages paper trading first
- [ ] Easy transition from paper to live trading

**UI Indicators for Paper Mode**:
```
🧪 Paper Trading Mode Active
You're practicing with simulated money. No real trades will be executed.

[Switch to Live Trading]
```

**Mode Toggle Safeguards**:
- Confirmation required to switch to live trading
- Warning about real money implications
- Require OAuth connection for live trading
- Default new users to paper trading
- Display mode prominently in navigation

**Technical Considerations**:
- Store trading mode preference per user
- Use Alpaca paper trading environment when in paper mode
- Prevent live API calls from paper mode
- Sync paper trading portfolio separately from live
- Clear distinction in database (paper vs. live orders)

**Dependencies**: Story 3.2 (OAuth connection), Epic 1 Story 1.2 (authentication)

**Definition of Done**:
- [ ] User can toggle paper/live trading modes
- [ ] Paper mode clearly indicated in UI
- [ ] All features work in paper mode
- [ ] Safeguards prevent accidental live trading
- [ ] New users default to paper trading

---

## Epic Completion Criteria

**Epic 3 is considered complete when**:
- [ ] All 13 user stories marked as done
- [ ] User can connect Alpaca brokerage account via OAuth
- [ ] User can execute custom portfolio with one click
- [ ] Fractional share orders execute successfully
- [ ] Order status tracking shows real-time updates
- [ ] Failed orders handled with clear guidance and retry
- [ ] Buying power validation prevents over-spending
- [ ] Market hours and timing communicated clearly
- [ ] Paper trading mode available for practice
- [ ] End-to-end test: user connects Alpaca, executes portfolio, receives confirmation

## Dependencies for Future Epics

**Epic 3 provides for**:
- **Epic 4**: Executed portfolios available for AI market analysis
- **Epic 5**: Order history and positions enable performance tracking

## Risks & Mitigation

| Risk | Impact | Mitigation Strategy |
|------|--------|---------------------|
| Alpaca API downtime during market hours | High | Queue orders, retry logic, status page monitoring |
| OAuth connection failures | High | Clear error messages, support escalation, fallback manual entry |
| Order execution failures (market conditions) | Medium | Comprehensive error handling, retry logic, user education |
| Fractional shares unavailable for certain tickers | Medium | Pre-execution validation, alternative suggestions |
| User confusion about market timing | Low | Prominent market status indicators, educational content |
| Buying power calculation errors | High | Multi-point validation, conservative estimates |
| Security breach of OAuth tokens | Critical | Encrypted storage, token rotation, security audits |

## Technical Debt Considerations

**Acceptable for MVP**:
- Sequential order submission (not batched)
- Basic retry logic (improve with exponential backoff)
- Manual refresh for order status (add webhooks later)
- Limited order types (market orders only)

**Must Address in Epic 3**:
- Secure OAuth token storage (encrypted)
- Atomic order submission transactions
- Comprehensive error handling for all Alpaca errors
- Buying power validation at all critical points

## Future Enhancements (Post-MVP)

- Limit order support for price control
- Scheduled portfolio execution (e.g., monthly rebalancing)
- DCA (Dollar Cost Averaging) automated execution
- Tax-loss harvesting recommendations
- Multi-brokerage support (beyond Alpaca)
- Rebalancing for existing portfolios
- Automatic position top-up based on target allocations
- Order execution analytics (slippage, timing)

## Compliance & Legal Considerations

- **Brokerage Disclaimers**: User understands platform facilitates orders, does not provide investment advice
- **Execution Risk**: User acknowledges market order risks, price variation
- **Account Permissions**: User grants specific permissions to Alpaca OAuth
- **Data Security**: OAuth tokens encrypted at rest, transmitted via HTTPS
- **Order Audit Trail**: All orders logged for compliance and support

## User Education Content Needed

- "What are fractional shares?" explainer
- "Understanding market orders" guide
- "Paper trading vs. live trading" tutorial
- "How portfolio execution works" walkthrough
- "What to do if orders fail" troubleshooting guide
