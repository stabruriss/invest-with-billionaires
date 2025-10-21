# Epic 5: Performance Tracking & Analytics

## Epic Overview

**Goal**: Build comprehensive portfolio performance comparison system showing user's customized strategy against original institutional portfolios with key metrics and historical tracking.

**Business Value**: Validates the platform's core hypothesis by demonstrating whether customized institutional strategies outperform or underperform the originals. This feature drives 40%+ monthly retention by giving users ongoing value to return and monitor performance.

**Success Metrics**:
- Users check performance dashboard 3+ times per week
- Performance data loads in <2 seconds
- 85%+ accuracy in performance calculations vs. actual brokerage
- 60%+ of users compare their performance to institutional baseline
- Feature drives 40%+ monthly user retention

## User Stories

### Story 5.1: Portfolio Performance Data Model

**As a** developer
**I want** a database schema for tracking portfolio performance over time
**So that** historical performance data is efficiently stored and queried

**Acceptance Criteria**:
- [ ] Database schema created for daily portfolio snapshots
- [ ] Schema stores portfolio value, returns, and position-level data
- [ ] Historical snapshots captured daily at market close
- [ ] Schema supports efficient time-series queries
- [ ] Aggregation tables for monthly/quarterly performance
- [ ] Indexes optimized for common query patterns

**Database Entities**:
- **PortfolioSnapshots**: id, user_portfolio_id, snapshot_date, total_value, cash_balance, created_at
- **PositionSnapshots**: id, portfolio_snapshot_id, ticker, quantity, price, market_value, day_gain_loss, total_gain_loss
- **PerformanceMetrics**: id, portfolio_snapshot_id, period, total_return_pct, daily_return_pct, vs_institutional_delta, vs_sp500_delta
- **BenchmarkData**: id, benchmark_type (sp500, institutional_portfolio), date, value, return_pct

**Technical Considerations**:
- Partition tables by date for efficient historical queries
- Store both absolute values and calculated metrics
- Implement automated snapshot capture at market close
- Optimize for time-series aggregation queries (daily → weekly → monthly)
- Consider data retention policy (keep daily for 1 year, monthly thereafter)

**Dependencies**: Epic 2 (user portfolios), Epic 3 (executed positions)

**Definition of Done**:
- [ ] Schema deployed to all environments
- [ ] Snapshot data insertable and queryable
- [ ] Indexes improve query performance measurably
- [ ] Time-series queries perform in <500ms
- [ ] Data retention policy documented

---

### Story 5.2: Daily Portfolio Value Snapshot Service

**As a** system
**I want** automated daily snapshots of portfolio values
**So that** historical performance can be accurately tracked

**Acceptance Criteria**:
- [ ] Scheduled job runs daily at market close (4:00 PM ET)
- [ ] Fetches current positions from Alpaca for all connected users
- [ ] Calculates portfolio value based on closing prices
- [ ] Stores snapshot in database with timestamp
- [ ] Handles market holidays gracefully (skips snapshot)
- [ ] Logs successful/failed snapshot captures

**Snapshot Capture Process**:
1. Job triggers at 4:30 PM ET (30 min after market close)
2. Query all users with connected Alpaca accounts
3. Fetch current positions via Alpaca API
4. Fetch closing prices for all tickers
5. Calculate portfolio total value
6. Calculate daily returns vs. previous snapshot
7. Store snapshot in database
8. Log completion status

**Technical Considerations**:
- Use scheduled job system (cron, Sidekiq, etc.)
- Handle time zones correctly (market close is ET)
- Implement retry logic for API failures
- Skip snapshot on market holidays and weekends
- Monitor job execution for failures
- Batch process users to avoid API rate limits

**Dependencies**: Story 5.1 (data model), Epic 3 Story 3.3 (Alpaca integration)

**Definition of Done**:
- [ ] Job runs reliably at scheduled time
- [ ] Snapshots captured for all users daily
- [ ] Market holidays handled correctly
- [ ] Failures logged and alerting configured
- [ ] API rate limits respected

---

### Story 5.3: Performance Calculation Engine

**As a** system
**I want** to calculate portfolio performance metrics accurately
**So that** users see meaningful, correct analytics

**Acceptance Criteria**:
- [ ] Calculate total return (time-weighted and money-weighted)
- [ ] Calculate daily, weekly, monthly, quarterly, YTD returns
- [ ] Calculate gain/loss per position (realized and unrealized)
- [ ] Calculate vs. institutional portfolio benchmark
- [ ] Calculate vs. S&P 500 benchmark
- [ ] Handle cash flows (deposits, withdrawals) correctly

**Performance Metrics to Calculate**:
- **Total Return %**: (Current Value - Initial Investment + Withdrawals - Deposits) / Initial Investment
- **Daily Return %**: (Today Value - Yesterday Value) / Yesterday Value
- **Period Return %**: Returns for 1W, 1M, 3M, 6M, 1Y, YTD
- **Position Gain/Loss**: (Current Price - Average Cost) * Quantity
- **vs. Benchmark**: User Return % - Benchmark Return %
- **Sharpe Ratio**: (Return - Risk Free Rate) / Standard Deviation (advanced)

**Cash Flow Handling**:
- **Deposits**: Reduce performance calculations (user added capital)
- **Withdrawals**: Increase performance calculations (user removed capital)
- **Time-Weighted Return**: Neutralizes impact of cash flows for accurate comparison

**Technical Considerations**:
- Implement time-weighted return for accurate performance comparison
- Handle edge cases (portfolio inception mid-period, no prior snapshot)
- Cache calculated metrics to avoid redundant computation
- Validate calculations against known benchmarks
- Use decimal precision for financial calculations

**Dependencies**: Story 5.2 (snapshots), Story 5.1 (data model)

**Definition of Done**:
- [ ] All performance metrics calculated correctly
- [ ] Calculations validated against test scenarios
- [ ] Cash flows handled appropriately
- [ ] Benchmarks compared accurately
- [ ] Calculation service performs efficiently (<100ms)

---

### Story 5.4: Performance Dashboard API Endpoints

**As a** frontend developer
**I want** API endpoints for portfolio performance data
**So that** I can build performance visualizations

**Acceptance Criteria**:
- [ ] GET /api/user-portfolios/:id/performance - returns performance summary
- [ ] GET /api/user-portfolios/:id/performance/history - returns time-series data
- [ ] GET /api/user-portfolios/:id/positions - returns current positions with gains
- [ ] API supports time period filters (1D, 1W, 1M, 3M, 6M, 1Y, YTD, ALL)
- [ ] Includes comparison data (institutional portfolio, S&P 500)
- [ ] Response times under 500ms for all endpoints

**API Response Examples**:
```json
GET /api/user-portfolios/uuid/performance?period=1M

{
  "portfolio_id": "uuid",
  "portfolio_name": "My Buffett Strategy",
  "current_value": 10234.56,
  "cost_basis": 10000.00,
  "total_gain_loss": 234.56,
  "total_return_pct": 2.35,
  "period_return_pct": 1.85,
  "daily_change": 45.23,
  "daily_change_pct": 0.44,
  "vs_institutional": {
    "name": "Warren Buffett (Berkshire Hathaway)",
    "portfolio_return_pct": 1.50,
    "delta": 0.35
  },
  "vs_sp500": {
    "return_pct": 2.10,
    "delta": -0.25
  },
  "last_updated": "2024-10-15T16:00:00Z"
}
```

**Technical Considerations**:
- Aggregate snapshot data for requested time period
- Cache performance calculations (5-minute TTL)
- Return comparison benchmarks in single request
- Support multiple portfolios per user
- Optimize queries with database indexes

**Dependencies**: Story 5.3 (calculation engine), Story 5.2 (snapshots)

**Definition of Done**:
- [ ] All API endpoints functional and documented
- [ ] Response times meet <500ms requirement
- [ ] Time period filters work correctly
- [ ] Comparison benchmarks included
- [ ] API handles edge cases gracefully

---

### Story 5.5: Performance Dashboard UI Overview

**As a** user
**I want** a dashboard showing my portfolio performance at a glance
**So that** I can quickly assess how my investment is performing

**Acceptance Criteria**:
- [ ] Dashboard displays current portfolio value prominently
- [ ] Today's gain/loss shown with color coding (green/red)
- [ ] Total return % since inception displayed
- [ ] Period selector for performance views (1D, 1W, 1M, etc.)
- [ ] Performance chart visualizes value over time
- [ ] Comparison to institutional portfolio and S&P 500 shown

**Dashboard Layout Components**:
```
┌─────────────────────────────────────────────────────────┐
│  My Buffett Strategy                                    │
│  ───────────────────────────────────────────────────    │
│                                                          │
│  Portfolio Value: $10,234.56                            │
│  Today: +$45.23 (+0.44%) 🟢                             │
│  Total Return: +$234.56 (+2.35%) 🟢                     │
│                                                          │
│  [1D] [1W] [1M] [3M] [6M] [1Y] [YTD] [ALL]             │
│                                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │         Performance Chart (1M)                   │   │
│  │  $10,400 ┤                                ╭─╮    │   │
│  │  $10,200 ┤                        ╭──╮    │ │    │   │
│  │  $10,000 ┤  ────────────╮        │  ╰────╯ │    │   │
│  │   $9,800 ┤              ╰────────╯          │    │   │
│  │          └────────────────────────────────────   │   │
│  │          Oct 1      Oct 8      Oct 15           │   │
│  └─────────────────────────────────────────────────┘   │
│                                                          │
│  Comparisons (1M):                                      │
│  You:             +1.85%                                │
│  Buffett (BRK):   +1.50%  (You're ahead by +0.35%)     │
│  S&P 500:         +2.10%  (You're behind by -0.25%)    │
│                                                          │
│  [View Detailed Positions]                              │
└─────────────────────────────────────────────────────────┘
```

**Technical Considerations**:
- Implement responsive layout for mobile/tablet
- Use charting library (Chart.js, Recharts, Victory)
- Real-time updates during market hours (optional)
- Handle empty states (no positions, insufficient history)
- Optimize for fast initial load

**Dependencies**: Story 5.4 (API endpoints)

**Definition of Done**:
- [ ] Dashboard displays all key metrics correctly
- [ ] Performance chart renders smoothly
- [ ] Period selector updates data correctly
- [ ] Comparisons shown clearly
- [ ] Responsive design functional on all devices

---

### Story 5.6: Performance Chart Visualization

**As a** user
**I want** an interactive chart showing portfolio value over time
**So that** I can visualize performance trends

**Acceptance Criteria**:
- [ ] Line chart displays portfolio value over selected period
- [ ] Chart updates based on period selection (1D, 1W, 1M, etc.)
- [ ] Hover/tooltip shows exact value and date
- [ ] Multiple lines for comparison (user vs. institutional vs. S&P 500)
- [ ] Y-axis scales appropriately for value range
- [ ] X-axis shows appropriate date granularity

**Chart Features**:
- **Single Line Mode**: User portfolio value only
- **Comparison Mode**: User + Institutional + S&P 500 overlaid
- **Normalized Mode**: Show all as % returns from starting point
- **Hover Details**: Date, value, return %, vs. benchmarks
- **Zoom/Pan**: Allow user to zoom into time periods (optional)

**Visual Design**:
- User portfolio: Blue solid line
- Institutional benchmark: Gray dashed line
- S&P 500: Orange dotted line
- Gain areas: Light green shading
- Loss areas: Light red shading

**Technical Considerations**:
- Choose performant charting library
- Optimize data points for period (daily for 1M, hourly for 1D, weekly for 1Y)
- Implement responsive chart sizing
- Handle missing data gracefully (gaps in snapshots)
- Support dark mode if applicable

**Dependencies**: Story 5.5 (dashboard UI), Story 5.4 (API endpoints)

**Definition of Done**:
- [ ] Chart renders correctly for all periods
- [ ] Hover interactions functional
- [ ] Comparison lines display accurately
- [ ] Chart responsive on all devices
- [ ] Performance acceptable with 365+ data points

---

### Story 5.7: Position-Level Performance Display

**As a** user
**I want** to see gain/loss for each position in my portfolio
**So that** I understand which holdings are performing well/poorly

**Acceptance Criteria**:
- [ ] Positions table shows all current holdings
- [ ] Each position displays ticker, quantity, avg cost, current price
- [ ] Gain/loss shown in dollars and percentage
- [ ] Positions sortable by gain/loss, value, allocation
- [ ] Color coding for gains (green) and losses (red)
- [ ] Total portfolio gain/loss summarized

**Positions Table Layout**:
```
Current Holdings

┌──────────────────────────────────────────────────────────────┐
│ Ticker │ Shares │ Avg Cost │ Current │ Value    │ Gain/Loss  │
├────────┼────────┼──────────┼─────────┼──────────┼────────────┤
│ AAPL   │ 25.24  │ $178.25  │ $182.45 │ $4,605   │ +$106 +2.3%│
│ BAC    │ 43.97  │ $34.12   │ $33.80  │ $1,486   │ -$14 -0.9% │
│ KO     │ 24.15  │ $62.08   │ $63.25  │ $1,527   │ +$28 +1.9% │
│ ...    │        │          │         │          │            │
├────────┴────────┴──────────┴─────────┴──────────┴────────────┤
│ Total Portfolio Value: $10,234.56                            │
│ Total Gain/Loss: +$234.56 (+2.35%)                          │
└──────────────────────────────────────────────────────────────┘

[Sort by: Gain/Loss ▼] [Value] [Ticker]
```

**Technical Considerations**:
- Fetch position data from Alpaca API
- Calculate average cost from order history
- Fetch current prices for all tickers
- Implement client-side sorting for responsiveness
- Handle fractional shares display correctly
- Support mobile-responsive table (card layout)

**Dependencies**: Story 5.4 (API endpoints), Epic 3 Story 3.3 (Alpaca integration)

**Definition of Done**:
- [ ] Positions table displays all holdings
- [ ] Gain/loss calculated correctly per position
- [ ] Sorting functional for all columns
- [ ] Color coding applied appropriately
- [ ] Table responsive on mobile devices

---

### Story 5.8: Institutional Portfolio Benchmark Tracking

**As a** system
**I want** to track institutional portfolio performance over time
**So that** users can compare their customized versions to the original

**Acceptance Criteria**:
- [ ] Daily snapshots captured for institutional portfolios
- [ ] Performance calculated for institutional portfolios
- [ ] Institutional performance stored in benchmark tables
- [ ] API provides institutional performance for comparison
- [ ] Historical institutional performance accessible
- [ ] Handles quarterly 13F updates correctly

**Institutional Benchmark Process**:
1. Use 13F filing data as baseline portfolio
2. Calculate daily value based on holdings and prices
3. Store snapshots in benchmark tables
4. Calculate returns over time
5. Provide via API for user comparison

**Handling 13F Quarterly Updates**:
- **Q2 Filing Released Aug 14**: Use Q1 holdings until Aug 14, switch to Q2 holdings after
- **Rebalancing**: Assume instant rebalancing to new allocations (not realistic but simple)
- **Disclaimer**: Note that actual institutional returns may differ due to intra-quarter changes

**Technical Considerations**:
- Snapshot institutional portfolios alongside user portfolios
- Handle portfolio composition changes at filing dates
- Calculate returns assuming quarterly rebalancing
- Provide clear disclaimers about benchmark limitations
- Optimize storage (avoid duplicating price data)

**Dependencies**: Story 5.2 (snapshot service), Epic 1 Story 1.5 (13F ingestion)

**Definition of Done**:
- [ ] Institutional portfolios snapshotted daily
- [ ] Performance calculated for institutional portfolios
- [ ] Benchmark data accessible via API
- [ ] Quarterly updates handled correctly
- [ ] Benchmark limitations documented

---

### Story 5.9: S&P 500 Benchmark Integration

**As a** system
**I want** S&P 500 performance data for comparison
**So that** users can benchmark against the broader market

**Acceptance Criteria**:
- [ ] Daily S&P 500 close prices fetched automatically
- [ ] S&P 500 returns calculated for all time periods
- [ ] Benchmark data stored efficiently
- [ ] API includes S&P 500 comparison in responses
- [ ] Historical S&P 500 data available for backfilling
- [ ] Data source reliable and cost-effective

**Data Source Options**:
- **Free**: Yahoo Finance API, Alpha Vantage (free tier)
- **Paid**: IEX Cloud, Polygon.io, Financial Modeling Prep
- **Index Symbol**: SPY (S&P 500 ETF proxy) or ^GSPC (index)

**Benchmark Calculations**:
- Fetch daily close price for SPY
- Calculate daily return %
- Calculate cumulative returns for all periods (1D, 1W, 1M, etc.)
- Store in benchmark tables alongside institutional data

**Technical Considerations**:
- Choose reliable, low-cost data source
- Implement daily fetch job (same time as portfolio snapshots)
- Backfill historical data for comparison (1+ years)
- Cache benchmark data aggressively (daily granularity)
- Handle data source failures with fallback

**Dependencies**: Story 5.2 (snapshot service), Story 5.1 (data model)

**Definition of Done**:
- [ ] S&P 500 daily prices fetched automatically
- [ ] Returns calculated for all periods
- [ ] Benchmark data accessible via API
- [ ] Historical data backfilled
- [ ] Data source reliable and cost-effective

---

### Story 5.10: Performance Comparison View

**As a** user
**I want** a detailed comparison of my performance vs. benchmarks
**So that** I understand if my customizations improved or hurt returns

**Acceptance Criteria**:
- [ ] Comparison view shows user vs. institutional vs. S&P 500
- [ ] Returns displayed for multiple time periods side-by-side
- [ ] Delta (outperformance/underperformance) highlighted
- [ ] Visual indicators for beating/trailing benchmarks
- [ ] Attribution analysis shows which positions drove differences
- [ ] Comparison exportable as PDF or image (optional)

**Comparison View Layout**:
```
Performance Comparison: My Buffett Strategy

Period      │ You      │ Buffett (BRK) │ Delta  │ S&P 500  │ Delta  │
────────────┼──────────┼───────────────┼────────┼──────────┼────────┤
1 Day       │ +0.44%   │ +0.38%        │ +0.06% │ +0.55%   │ -0.11% │
1 Week      │ +2.12%   │ +1.85%        │ +0.27% │ +2.01%   │ +0.11% │
1 Month     │ +1.85%   │ +1.50%        │ +0.35% │ +2.10%   │ -0.25% │
3 Months    │ +5.67%   │ +4.23%        │ +1.44% │ +6.12%   │ -0.45% │
YTD         │ +12.45%  │ +10.20%       │ +2.25% │ +18.50%  │ -6.05% │
Since Start │ +2.35%   │ +1.50%        │ +0.85% │ +2.10%   │ +0.25% │

🏆 You're OUTPERFORMING Buffett by +0.85% since inception!
⚠️ You're UNDERPERFORMING S&P 500 by -6.05% YTD

Top Contributing Positions to Outperformance:
• AAPL: +50% allocation vs Buffett (contributed +0.60%)
• TSLA: New addition (contributed +0.40%)
• BAC: -3% allocation vs Buffett (saved -0.15% loss)
```

**Technical Considerations**:
- Calculate deltas from benchmark returns
- Identify top contributors to performance difference
- Implement attribution analysis (position-level impact)
- Support exporting comparison table
- Handle cases where user portfolio is newer than benchmarks

**Dependencies**: Story 5.8 (institutional benchmark), Story 5.9 (S&P 500 benchmark)

**Definition of Done**:
- [ ] Comparison view displays all periods
- [ ] Deltas calculated and highlighted correctly
- [ ] Attribution analysis identifies key drivers
- [ ] Visual indicators enhance readability
- [ ] Export functionality works (optional)

---

### Story 5.11: Historical Portfolio Value Timeline

**As a** user
**I want** to see my portfolio value history in a timeline
**So that** I can track progress over time

**Acceptance Criteria**:
- [ ] Timeline displays major portfolio events chronologically
- [ ] Events include: portfolio created, positions added, orders executed
- [ ] Portfolio value milestones highlighted (e.g., crossed $10K)
- [ ] AI analysis events shown in timeline (optional)
- [ ] User can filter timeline by event type
- [ ] Timeline scrollable with infinite scroll for long histories

**Timeline Events**:
- **Portfolio Created**: "Created 'My Buffett Strategy' based on Buffett's Q3 2024 portfolio"
- **Orders Executed**: "Bought 25.24 shares of AAPL at $178.25"
- **Value Milestones**: "Portfolio value reached $10,000"
- **Performance Milestones**: "Outperformed Buffett by +1% for the first time"
- **AI Analysis**: "Generated AI analysis for AAPL position"
- **Rebalancing**: "Rebalanced portfolio, sold 5 shares of BAC" (future)

**Timeline UI Design**:
```
Portfolio Timeline

Oct 15, 2024  Portfolio value reached $10,234.56 (+2.35%)
              🎉 Milestone: Crossed $10,000!

Oct 14, 2024  Daily return: +0.44% (+$45.23)

Oct 10, 2024  Generated AI analysis for AAPL
              "Position remains defensible..."

Oct 1, 2024   Executed portfolio - 18 positions filled
              Total invested: $10,001.45

Sept 28, 2024 Created "My Buffett Strategy"
              Copied from Warren Buffett Q3 2024 portfolio
```

**Technical Considerations**:
- Store timeline events in database
- Query events efficiently (index by user, date)
- Implement pagination for long timelines
- Support filtering by event type
- Optimize for mobile viewing

**Dependencies**: Story 5.2 (snapshots), Epic 3 Story 3.6 (order tracking)

**Definition of Done**:
- [ ] Timeline displays portfolio events
- [ ] Events chronologically ordered
- [ ] Milestones highlighted appropriately
- [ ] Filtering works for event types
- [ ] Pagination functional for long histories

---

### Story 5.12: Performance Alerts & Notifications

**As a** user
**I want** notifications when my portfolio hits milestones
**So that** I stay engaged with my investment performance

**Acceptance Criteria**:
- [ ] User can configure performance alert preferences
- [ ] Alerts triggered for configurable milestones
- [ ] Notifications sent via email and/or in-app
- [ ] Alert types: value milestones, return thresholds, benchmark beating
- [ ] User can enable/disable specific alert types
- [ ] Alert history viewable in notifications center

**Alert Types**:
- **Value Milestones**: Portfolio reaches $10K, $25K, $50K, $100K
- **Return Thresholds**: Total return exceeds +10%, +25%, +50%
- **Daily Moves**: Daily change exceeds ±5%
- **Benchmark Beating**: Outperform institutional or S&P 500 by 1%+
- **Underperformance**: Trail benchmark by 5%+ (warning alert)
- **Anniversary**: 1 month, 3 months, 1 year since portfolio creation

**Alert Examples**:
```
🎉 Milestone Reached!
Your "My Buffett Strategy" portfolio just crossed $10,000!
Current value: $10,234.56 (+2.35% total return)

[View Portfolio Performance]
```

```
⚠️  Underperformance Alert
Your portfolio is trailing S&P 500 by -6.05% YTD.
Consider reviewing your allocations or generating AI analysis.

[View Comparison] [Analyze Portfolio]
```

**Technical Considerations**:
- Check alert conditions during daily snapshot
- Store user alert preferences in database
- Implement notification delivery system (email, push, in-app)
- Avoid alert fatigue (rate limiting, smart triggers)
- Track alert delivery and user engagement

**Dependencies**: Story 5.2 (snapshots), Story 5.10 (comparison view)

**Definition of Done**:
- [ ] Alert preferences configurable per user
- [ ] Alerts trigger correctly for milestones
- [ ] Notifications delivered reliably
- [ ] Alert types cover key scenarios
- [ ] Alert history accessible to user

---

### Story 5.13: Performance Export & Reporting

**As a** user
**I want** to export my portfolio performance data
**So that** I can analyze it externally or share with others

**Acceptance Criteria**:
- [ ] User can export performance data as CSV
- [ ] Export includes date, value, returns, benchmark comparisons
- [ ] User can export position history with gains/losses
- [ ] PDF report generated with charts and summaries (optional)
- [ ] Export filtered by date range
- [ ] Tax reporting data included (cost basis, gains) for tax time

**Export Formats**:

**CSV Export (Performance History)**:
```csv
Date,Portfolio Value,Daily Return %,Total Return %,Buffett Return %,S&P 500 Return %
2024-10-01,10000.00,0.00,0.00,0.00,0.00
2024-10-02,10050.25,0.50,0.50,0.35,0.45
2024-10-03,10023.40,-0.27,0.23,0.20,0.30
...
```

**CSV Export (Position Gains/Losses)**:
```csv
Ticker,Shares,Avg Cost,Current Price,Market Value,Gain/Loss $,Gain/Loss %
AAPL,25.24,178.25,182.45,4605.13,106.05,2.36
BAC,43.97,34.12,33.80,1486.19,-14.06,-0.94
...
```

**PDF Report** (optional):
- Executive summary (portfolio value, total return, vs. benchmarks)
- Performance chart (value over time)
- Positions table with gains/losses
- Comparison table vs. benchmarks
- Timeline of major events

**Technical Considerations**:
- Implement CSV generation from snapshot data
- Generate PDF using reporting library (PDFKit, Puppeteer)
- Support date range filtering for exports
- Include tax-relevant data (acquisition date, cost basis, realized gains)
- Handle large exports (thousands of rows) efficiently

**Dependencies**: Story 5.4 (API endpoints), Story 5.7 (position performance)

**Definition of Done**:
- [ ] CSV exports generated correctly
- [ ] PDF reports formatted professionally (optional)
- [ ] Date range filtering functional
- [ ] Tax data included for reporting
- [ ] Large exports handled without timeout

---

## Epic Completion Criteria

**Epic 5 is considered complete when**:
- [ ] All 13 user stories marked as done
- [ ] User can view comprehensive performance dashboard
- [ ] Performance chart visualizes portfolio value over time
- [ ] Position-level gains/losses displayed accurately
- [ ] Comparison to institutional and S&P 500 benchmarks functional
- [ ] Performance alerts notify users of milestones
- [ ] Historical timeline shows portfolio events
- [ ] Export functionality allows CSV/PDF download
- [ ] End-to-end test: user views performance dashboard, sees gains, compares to Buffett, receives milestone alert

## Dependencies for Future Features

**Epic 5 enables**:
- Tax optimization features (harvest losses, optimize gains)
- Rebalancing recommendations based on performance
- Predictive analytics (forecast future performance)
- Social features (share performance with friends)
- Advanced analytics (Sharpe ratio, alpha, beta)

## Risks & Mitigation

| Risk | Impact | Mitigation Strategy |
|------|--------|---------------------|
| Performance calculation errors | Critical | Comprehensive testing, validation against known scenarios |
| Alpaca API downtime prevents snapshots | High | Retry logic, fallback to cached data, manual snapshot triggers |
| Benchmark data unavailable | Medium | Multiple data source fallbacks, cached benchmark data |
| Snapshot job failures | High | Monitoring alerts, retry mechanisms, manual recovery tools |
| Storage costs for historical data | Medium | Data retention policy, aggregate old data, archive cold data |
| User confusion about benchmark comparisons | Low | Educational content, clear disclaimers about limitations |

## Technical Debt Considerations

**Acceptable for MVP**:
- Simple time-weighted return (no money-weighted return initially)
- Daily snapshot granularity only (no intraday)
- Manual benchmark comparison (no automatic attribution analysis)
- Basic CSV export (enhance PDF reporting later)

**Must Address in Epic 5**:
- Accurate performance calculation with cash flows
- Efficient time-series queries with indexing
- Reliable snapshot job with monitoring
- Benchmark data integrity and fallback sources

## Future Enhancements (Post-MVP)

- Real-time performance updates during market hours
- Advanced metrics (Sharpe ratio, alpha, beta, max drawdown)
- Tax-loss harvesting recommendations
- Automatic rebalancing based on drift from targets
- Performance attribution analysis (which decisions drove returns)
- Social features (leaderboards, share performance)
- Custom benchmarks (user-defined portfolios to compare against)
- Monte Carlo simulation for future performance scenarios
- Dividend tracking and reinvestment modeling
- Multi-portfolio aggregated performance view

## Performance Calculation Examples

**Scenario 1: Simple Gain (No Cash Flows)**
- Initial Investment: $10,000 on Oct 1
- Current Value: $10,234.56 on Oct 15
- Total Return: ($10,234.56 - $10,000) / $10,000 = 2.35%

**Scenario 2: With Deposit**
- Initial Investment: $10,000 on Oct 1
- Value before deposit: $10,200 on Oct 8
- Deposit: $5,000 on Oct 8
- Current Value: $15,500 on Oct 15
- Time-Weighted Return: [(10,200/10,000) * (15,500/15,200)] - 1 = 3.98%

**Scenario 3: With Withdrawal**
- Initial Investment: $10,000 on Oct 1
- Value before withdrawal: $10,500 on Oct 8
- Withdrawal: $2,000 on Oct 8
- Current Value: $8,700 on Oct 15
- Time-Weighted Return: [(10,500/10,000) * (8,700/8,500)] - 1 = 7.35%

## Benchmark Limitations & Disclaimers

**Institutional Portfolio Benchmark Limitations**:
- Based on quarterly 13F filings (45-day lag)
- Assumes instant rebalancing at filing date (unrealistic)
- Does not account for intra-quarter trades
- Does not include private positions or derivatives
- Performance calculated from public holdings only

**Disclaimer Text**:
```
⚠️  Benchmark Comparison Limitations

Institutional portfolio returns are estimated based on publicly
disclosed 13F holdings updated quarterly. Actual institutional
returns may differ significantly due to:

• Intra-quarter trading not reflected in 13F filings
• Private holdings and derivatives not disclosed
• Cash positions and market timing
• Trading costs and fees

This comparison is for educational purposes only and should not
be the sole basis for investment decisions.
```

## Data Retention & Storage Strategy

**Data Retention Policy**:
- **Daily Snapshots**: Keep for 1 year at daily granularity
- **Weekly Aggregates**: Keep for 3 years at weekly granularity
- **Monthly Aggregates**: Keep for 10 years at monthly granularity
- **User Data**: Retain indefinitely while account active, archive on closure

**Storage Optimization**:
- Partition tables by date for efficient queries
- Archive old snapshots to cold storage (S3 Glacier)
- Pre-aggregate common queries (monthly/quarterly returns)
- Compress historical data for storage efficiency

**Cost Estimates**:
- Daily snapshots: ~1KB per user per day = ~365KB per user per year
- 1,000 users = ~365MB per year (negligible)
- Storage costs insignificant compared to compute/API costs
