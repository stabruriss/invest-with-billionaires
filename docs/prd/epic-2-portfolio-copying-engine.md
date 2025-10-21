# Epic 2: Portfolio Copying Engine

## Epic Overview

**Goal**: Create the percentage-based portfolio editor and allocation engine, enabling users to view, modify, and validate institutional portfolio allocations with real-time calculations.

**Business Value**: Delivers the core product differentiator - allowing users to customize institutional strategies while maintaining allocation integrity. This feature transforms passive portfolio viewing into active investment decision-making.

**Success Metrics**:
- Users successfully create customized portfolio versions
- 100% allocation validation prevents invalid portfolios
- Real-time calculation updates complete in <100ms
- 60%+ of users modify at least one allocation from original
- Zero calculation errors in position sizing logic

## User Stories

### Story 2.1: Portfolio Customization Data Model

**As a** developer
**I want** a database schema for user-customized portfolios
**So that** user modifications persist and can be tracked over time

**Acceptance Criteria**:
- [ ] Database schema created for user portfolios (customized versions)
- [ ] Schema links user portfolios to source institutional portfolios
- [ ] Custom allocations stored per holding with modification timestamps
- [ ] Portfolio version history tracked for user's changes
- [ ] Total allocation constraint enforced at database level
- [ ] Schema supports multiple custom portfolios per user

**Database Entities**:
- **UserPortfolios**: id, user_id, source_portfolio_id, name, created_at, updated_at, is_active
- **UserHoldings**: id, user_portfolio_id, ticker, custom_allocation_percent, original_allocation_percent, modified_at
- **PortfolioVersions**: id, user_portfolio_id, snapshot_data, created_at (for history tracking)

**Technical Considerations**:
- Implement database trigger/constraint to validate 100% total allocation
- Support soft deletes for user portfolios
- Index on user_id for efficient portfolio queries
- Store original allocation for comparison features

**Dependencies**: Epic 1 (database foundation, authentication)

**Definition of Done**:
- [ ] Schema deployed to all environments
- [ ] Sample user portfolio data insertable
- [ ] 100% allocation constraint validated
- [ ] Queries perform efficiently (<100ms)
- [ ] Migration documentation updated

---

### Story 2.2: "Copy Portfolio" Initialization API

**As a** user
**I want** to create my own version of an institutional portfolio
**So that** I can customize allocations based on my preferences

**Acceptance Criteria**:
- [ ] POST /api/portfolios/:id/copy endpoint creates user portfolio
- [ ] API initializes user portfolio with 100% matching allocations
- [ ] User can optionally name their customized portfolio
- [ ] API returns new user portfolio ID for editing
- [ ] User can have multiple copies of same institutional portfolio
- [ ] Copying captures current filing data as baseline

**Request/Response Example**:
```json
POST /api/portfolios/buffett-2024-q3/copy
{
  "name": "My Buffett Strategy"
}

Response:
{
  "user_portfolio_id": "uuid-here",
  "name": "My Buffett Strategy",
  "source_investor": "Warren Buffett",
  "source_filing_date": "2024-11-14",
  "holdings": [
    {
      "ticker": "AAPL",
      "company": "Apple Inc.",
      "allocation_percent": 41.23,
      "original_allocation_percent": 41.23
    }
  ],
  "total_allocation": 100.0
}
```

**Technical Considerations**:
- Validate user authentication before copy
- Handle concurrent copy requests safely
- Log portfolio copy events for analytics
- Return full portfolio data to avoid additional fetch

**Dependencies**: Story 2.1 (data model), Epic 1 Story 1.7 (API foundation)

**Definition of Done**:
- [ ] User can successfully copy institutional portfolio
- [ ] Copied portfolio contains all original holdings
- [ ] Allocations initially match source portfolio 100%
- [ ] API response includes full portfolio data
- [ ] Copy action logged for tracking

---

### Story 2.3: Portfolio Allocation Editing API

**As a** frontend developer
**I want** API endpoints to update user portfolio allocations
**So that** users can customize their portfolio positions

**Acceptance Criteria**:
- [ ] PATCH /api/user-portfolios/:id/holdings - updates multiple holdings atomically
- [ ] API validates total allocation equals 100% before saving
- [ ] Individual holding updates rejected if total ≠ 100%
- [ ] API returns validation errors with clear messages
- [ ] Optimistic locking prevents concurrent edit conflicts
- [ ] Allocation changes tracked with timestamps

**Request Example**:
```json
PATCH /api/user-portfolios/uuid/holdings
{
  "holdings": [
    {"ticker": "AAPL", "allocation_percent": 45.00},
    {"ticker": "BAC", "allocation_percent": 18.50},
    {"ticker": "KO", "allocation_percent": 15.00}
    // ... remaining holdings totaling 100%
  ]
}
```

**Validation Rules**:
- Total allocation must equal 100.00% (±0.01% tolerance)
- Individual allocations between 0.01% and 100%
- Cannot modify non-existent tickers
- All holdings must be included in update

**Technical Considerations**:
- Use database transactions for atomic updates
- Calculate totals server-side (don't trust client)
- Return detailed validation errors per holding
- Implement version checking for concurrent edits

**Dependencies**: Story 2.2 (portfolio copying)

**Definition of Done**:
- [ ] Valid allocation updates save successfully
- [ ] Invalid updates rejected with clear errors
- [ ] 100% total validation enforced
- [ ] Concurrent edits handled safely
- [ ] API response time under 200ms

---

### Story 2.4: Real-Time Allocation Calculator

**As a** user
**I want** live feedback as I adjust allocations
**So that** I know how much more I need to allocate to reach 100%

**Acceptance Criteria**:
- [ ] Client-side calculator updates total allocation in real-time
- [ ] Displays remaining allocation to reach 100%
- [ ] Color-coded feedback (green=100%, yellow=close, red=invalid)
- [ ] Shows allocation delta vs. original institutional portfolio
- [ ] Updates complete in <100ms as user types
- [ ] Prevents submission if total ≠ 100%

**Visual Feedback Elements**:
- **Total Indicator**: "95.5% allocated (4.5% remaining)"
- **Status Color**: Red (<99%), Yellow (99-99.9%), Green (100%)
- **Delta Display**: "+3.77% from original" per holding
- **Submit Button**: Disabled until 100% reached

**Technical Considerations**:
- Implement client-side validation mirroring server rules
- Debounce calculation updates for performance
- Handle floating-point precision correctly
- Provide clear error messages for invalid states

**Dependencies**: Story 2.3 (editing API)

**Definition of Done**:
- [ ] Total allocation updates live as user edits
- [ ] Color feedback reflects allocation status
- [ ] Remaining allocation calculated correctly
- [ ] Submit button disabled when invalid
- [ ] Floating-point errors handled properly

---

### Story 2.5: Portfolio Editor UI - Allocation Sliders

**As a** user
**I want** intuitive controls to adjust position allocations
**So that** I can easily customize my portfolio mix

**Acceptance Criteria**:
- [ ] Each holding displays with interactive slider or input field
- [ ] Sliders range from 0% to 100% with fine-grained control
- [ ] Direct numeric input available for precise values
- [ ] Original allocation displayed for comparison
- [ ] Holdings sortable by ticker, allocation, or delta
- [ ] Visual indicator shows modified vs. original holdings

**UI Components Per Holding Row**:
- Ticker symbol and company name
- Original allocation percentage (read-only)
- Adjustable allocation control (slider + input)
- Delta indicator (+/- from original)
- Remove holding option (sets to 0%)

**Interaction Patterns**:
- Drag slider to adjust allocation
- Click input field to type exact percentage
- Tab navigation between holdings
- Keyboard arrows for fine adjustments (0.1% increments)

**Technical Considerations**:
- Optimize rendering for 50+ holdings (virtualization)
- Implement smooth slider animations
- Validate input field values on blur
- Support undo/redo for allocation changes

**Dependencies**: Story 2.4 (allocation calculator)

**Definition of Done**:
- [ ] Sliders smoothly adjust allocations
- [ ] Numeric input accepts valid percentages
- [ ] Original allocations displayed for reference
- [ ] Holdings sortable by multiple columns
- [ ] UI performs smoothly with 50+ holdings

---

### Story 2.6: "Add New Position" Feature

**As a** user
**I want** to add positions not in the original institutional portfolio
**So that** I can personalize my strategy with additional stocks

**Acceptance Criteria**:
- [ ] "Add Position" button available in portfolio editor
- [ ] Ticker search/autocomplete for adding new holdings
- [ ] New position initializes at 0% allocation (user must allocate)
- [ ] Added positions clearly marked as "custom additions"
- [ ] User can remove custom positions completely
- [ ] Validation prevents duplicate ticker additions

**Add Position Flow**:
1. User clicks "Add Position" button
2. Ticker search modal appears
3. User searches and selects ticker
4. New holding added to portfolio at 0%
5. User adjusts allocation to include position
6. Total allocation validation still enforced

**Technical Considerations**:
- Implement ticker validation (check if tradeable)
- Fetch company name for selected ticker
- Store "is_custom" flag on user holdings
- Prevent adding tickers not supported by broker

**Dependencies**: Story 2.5 (editor UI)

**Definition of Done**:
- [ ] User can search and add new tickers
- [ ] New positions added at 0% allocation
- [ ] Custom positions visually distinguished
- [ ] Duplicate ticker prevention works
- [ ] Validation prevents invalid tickers

---

### Story 2.7: "Remove Position" Feature

**As a** user
**I want** to remove holdings from the institutional portfolio
**So that** I can focus on positions I believe in

**Acceptance Criteria**:
- [ ] Remove button available for each holding
- [ ] Removing a position sets allocation to 0% and hides row
- [ ] Removed positions still counted in 100% validation
- [ ] User can restore removed positions
- [ ] Removed positions tracked separately from 0% allocations
- [ ] Confirmation prompt for removing large allocations (>10%)

**Remove Position Behavior**:
- Setting allocation to 0% ≠ Removing position
- Removed positions excluded from default view
- "Show removed" toggle displays removed holdings
- Removed positions greyed out with "Restore" option

**Technical Considerations**:
- Implement soft delete (don't remove from database)
- Adjust UI to exclude removed from active holdings
- Maintain allocation validation with removed positions
- Allow undo within editing session

**Dependencies**: Story 2.5 (editor UI)

**Definition of Done**:
- [ ] User can remove holdings with confirmation
- [ ] Removed positions excluded from display
- [ ] Allocation validation still enforced
- [ ] Removed positions restorable
- [ ] Large allocation removals confirmed

---

### Story 2.8: Portfolio Comparison View

**As a** user
**I want** to see my customized portfolio side-by-side with the original
**So that** I can understand how my strategy differs

**Acceptance Criteria**:
- [ ] Split-pane or toggle view comparing original vs. custom
- [ ] Holdings with allocation changes highlighted
- [ ] Added positions and removed positions clearly marked
- [ ] Summary statistics show total % changed
- [ ] Color coding indicates increase (green) or decrease (red)
- [ ] Export comparison as PDF or image (future enhancement)

**Comparison Metrics**:
- **Total Positions**: Original count vs. Modified count
- **Modified Holdings**: Number and % of positions changed
- **Largest Increases**: Top 3 holdings increased
- **Largest Decreases**: Top 3 holdings decreased
- **Custom Additions**: Count of new tickers added

**Visual Design**:
```
Original Portfolio          My Custom Version
Apple Inc.    41.23%   →   Apple Inc.    45.00%  (+3.77%)
Bank of America  18.25%  →  Bank of America  15.00%  (-3.25%)
[removed]                →  Tesla Inc.    5.00%  (NEW)
```

**Technical Considerations**:
- Efficiently query both datasets for comparison
- Calculate deltas client-side for responsiveness
- Support responsive layout (stack on mobile)
- Implement smooth transitions for view toggle

**Dependencies**: Story 2.5 (editor UI)

**Definition of Done**:
- [ ] Side-by-side comparison displays correctly
- [ ] Allocation deltas calculated and displayed
- [ ] Added/removed positions marked clearly
- [ ] Summary statistics accurate
- [ ] View responsive on mobile devices

---

### Story 2.9: Save & Name Custom Portfolio

**As a** user
**I want** to save my customized portfolio with a memorable name
**So that** I can manage multiple portfolio strategies

**Acceptance Criteria**:
- [ ] "Save Portfolio" button available after valid allocations
- [ ] User can name/rename portfolio (default: "[Investor] - My Version")
- [ ] Save button disabled until 100% allocation reached
- [ ] Confirmation message displayed on successful save
- [ ] Saved portfolios appear in user's portfolio list
- [ ] User can edit saved portfolios later

**Save Flow**:
1. User completes allocation adjustments (total = 100%)
2. "Save Portfolio" button becomes enabled
3. User clicks save, prompted for portfolio name
4. Portfolio saved with timestamp
5. Redirect to portfolio list or success confirmation

**Technical Considerations**:
- Validate portfolio name uniqueness per user
- Auto-save drafts to prevent data loss (optional)
- Track last modified timestamp
- Handle save errors gracefully with retry

**Dependencies**: Story 2.3 (editing API), Story 2.4 (calculator)

**Definition of Done**:
- [ ] User can save valid portfolios successfully
- [ ] Portfolio naming functional with validation
- [ ] Saved portfolios retrievable from user account
- [ ] Save errors handled with clear messaging
- [ ] Confirmation feedback displayed on save

---

### Story 2.10: My Portfolios Dashboard

**As a** user
**I want** to view all my saved custom portfolios
**So that** I can manage and access my strategies easily

**Acceptance Criteria**:
- [ ] Dashboard displays all user's custom portfolios
- [ ] Each portfolio card shows name, source investor, last modified
- [ ] Portfolio cards display summary metrics (holdings count, total value)
- [ ] User can edit, duplicate, or delete portfolios from dashboard
- [ ] Dashboard accessible from main navigation
- [ ] Empty state encourages creating first portfolio

**Dashboard Layout**:
- Card grid similar to institutional investor browser
- Each card contains: Portfolio name, Source investor photo, Holdings count, Last modified date, Edit/Delete actions

**Portfolio Actions**:
- **Edit**: Opens portfolio editor
- **Duplicate**: Creates copy for variation testing
- **Delete**: Removes portfolio with confirmation
- **View Performance**: Links to performance tracking (Epic 5)

**Technical Considerations**:
- Paginate if user has many portfolios
- Sort by last modified (most recent first)
- Implement search/filter for large portfolio lists
- Cache portfolio list for performance

**Dependencies**: Story 2.9 (save portfolio), Epic 1 Story 1.3 (user profile)

**Definition of Done**:
- [ ] Dashboard displays all user portfolios
- [ ] Portfolio cards show correct metadata
- [ ] Edit/duplicate/delete actions functional
- [ ] Empty state displayed for new users
- [ ] Navigation to dashboard from menu works

---

### Story 2.11: Position Sizing Calculator

**As a** user
**I want** to know how many shares to buy based on my capital
**So that** I can understand the real-world execution of my portfolio

**Acceptance Criteria**:
- [ ] User inputs total investment amount ($)
- [ ] System calculates dollar allocation per holding
- [ ] System displays estimated shares to purchase (fractional)
- [ ] Current market prices fetched for share calculations
- [ ] Total invested amount displayed with allocation breakdown
- [ ] Calculator updates in real-time as allocations change

**Calculation Display**:
```
Total Investment: $10,000

Apple Inc. (AAPL) - 45.00%
  Allocation: $4,500
  Current Price: $178.25
  Shares: 25.24 shares

Bank of America (BAC) - 15.00%
  Allocation: $1,500
  Current Price: $34.12
  Shares: 43.97 shares
```

**Technical Considerations**:
- Fetch real-time or delayed market prices
- Handle market closed scenarios (use last close)
- Support fractional share display
- Cache prices to reduce API costs
- Display price data age/source

**Dependencies**: Story 2.4 (calculator), Story 2.5 (editor UI)

**Definition of Done**:
- [ ] User can input investment amount
- [ ] Shares calculated correctly per holding
- [ ] Market prices fetched and displayed
- [ ] Fractional shares displayed properly
- [ ] Calculator updates with allocation changes

---

### Story 2.12: Portfolio Validation & Error Prevention

**As a** system
**I want** comprehensive validation preventing invalid portfolios
**So that** users cannot save portfolios with calculation errors

**Acceptance Criteria**:
- [ ] Total allocation must equal 100.00% (±0.01% tolerance)
- [ ] Individual allocations between 0.01% and 100%
- [ ] No negative allocations permitted
- [ ] Duplicate tickers prevented
- [ ] Minimum 1 holding required in portfolio
- [ ] Validation errors displayed with clear correction guidance

**Validation Rules**:
| Rule | Error Message |
|------|---------------|
| Total ≠ 100% | "Total allocation must equal 100%. Currently {total}%" |
| Allocation < 0.01% | "Minimum allocation is 0.01% per holding" |
| Allocation > 100% | "Maximum allocation is 100% per holding" |
| Duplicate ticker | "Ticker {symbol} already exists in portfolio" |
| Zero holdings | "Portfolio must contain at least 1 holding" |
| Invalid ticker | "Ticker {symbol} is not tradeable" |

**Technical Considerations**:
- Implement validation on both client and server
- Display validation errors inline per holding
- Aggregate validation errors in summary panel
- Prevent form submission until all errors resolved
- Log validation failures for monitoring

**Dependencies**: Story 2.3 (editing API), Story 2.4 (calculator)

**Definition of Done**:
- [ ] All validation rules enforced client-side
- [ ] Server-side validation matches client rules
- [ ] Error messages clear and actionable
- [ ] Invalid portfolios cannot be saved
- [ ] Edge cases handled (floating-point errors)

---

## Epic Completion Criteria

**Epic 2 is considered complete when**:
- [ ] All 12 user stories marked as done
- [ ] User can copy institutional portfolio and customize allocations
- [ ] Real-time validation enforces 100% allocation constraint
- [ ] User can add/remove positions from original portfolio
- [ ] Saved portfolios accessible from user dashboard
- [ ] Position sizing calculator displays shares to purchase
- [ ] Comparison view shows original vs. customized portfolios
- [ ] End-to-end test: user copies Buffett portfolio, modifies 3 positions, saves successfully

## Dependencies for Future Epics

**Epic 2 provides for**:
- **Epic 3**: User portfolios ready for execution via Alpaca integration
- **Epic 4**: Custom portfolio data available for AI analysis context
- **Epic 5**: Saved portfolios enable performance tracking over time

## Risks & Mitigation

| Risk | Impact | Mitigation Strategy |
|------|--------|---------------------|
| Floating-point precision errors in allocation calculations | High | Use decimal types, implement ±0.01% tolerance |
| User frustration with 100% constraint | Medium | Clear real-time feedback, auto-balance feature (future) |
| Performance degradation with large portfolios (100+ holdings) | Medium | Implement virtualization, optimize calculations |
| Concurrent editing conflicts | Low | Optimistic locking with version checking |
| Market data costs exceed budget | Medium | Aggressive caching, batch price fetches |

## Technical Debt Considerations

**Acceptable for MVP**:
- Manual portfolio name entry (no AI suggestions)
- Basic price data caching (improve in Epic 5)
- No auto-rebalance feature (user adjusts manually)
- Single portfolio editing (no bulk operations)

**Must Address in Epic 2**:
- Precise decimal handling for allocations
- Client-server validation consistency
- Atomic transaction handling for updates
- Efficient calculation for large portfolios

## Future Enhancements (Post-MVP)

- Auto-balance feature (distribute remaining % across holdings)
- Portfolio templates (e.g., "Tech-Heavy Buffett")
- Allocation recommendations based on user risk profile
- Compare multiple custom portfolios side-by-side
- Import portfolios from CSV
- Portfolio sharing with other users
