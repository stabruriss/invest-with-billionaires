# Epic 4: AI Market Analysis

## Epic Overview

**Goal**: Add real-time AI-powered analysis comparing institutional positions against current market conditions, providing the key differentiating feature of contextual investment intelligence.

**Business Value**: Transforms stale 13F data (45-day lag) into actionable intelligence by answering "Is this position still smart today?" This is the premium feature justifying subscription pricing and differentiating from free 13F data sources.

**Success Metrics**:
- 70%+ of users trigger AI analysis at least once
- Average AI response time under 10 seconds
- 85%+ user satisfaction with AI insights quality
- AI analysis costs remain under $0.20 per user per month
- Users reference AI insights in 40%+ of portfolio decisions

## User Stories

### Story 4.1: OpenRouter Integration Setup

**As a** developer
**I want** to integrate OpenRouter for multi-model AI access
**So that** the system can leverage multiple AI models cost-effectively

**Acceptance Criteria**:
- [ ] OpenRouter SDK integrated into backend
- [ ] API authentication configured securely
- [ ] Model selection logic implemented (fallback strategy)
- [ ] Rate limiting and cost tracking configured
- [ ] Error handling for API failures
- [ ] Response streaming enabled for better UX

**OpenRouter Models to Support**:
- **Primary**: Claude 3.5 Sonnet (best reasoning for financial analysis)
- **Fallback**: GPT-4 Turbo (high quality, broader availability)
- **Budget**: Claude 3 Haiku (cost-effective for simple queries)

**Technical Considerations**:
- Implement model selection based on query complexity
- Track per-request costs for budget monitoring
- Cache analysis results to reduce redundant API calls
- Handle API downtime with graceful fallback
- Stream responses for real-time user feedback

**Dependencies**: Epic 1 (API foundation)

**Definition of Done**:
- [ ] OpenRouter SDK installed and configured
- [ ] Test API calls succeed with all models
- [ ] Cost tracking functional per request
- [ ] Rate limiting prevents budget overruns
- [ ] Streaming responses work correctly

---

### Story 4.2: Financial Data Context Aggregation

**As a** system
**I want** to gather relevant financial data context for AI analysis
**So that** AI responses are grounded in current market information

**Acceptance Criteria**:
- [ ] Current stock price fetched for analyzed ticker
- [ ] Recent price changes (1D, 1W, 1M, 3M) calculated
- [ ] Market cap and key metrics retrieved
- [ ] Recent news headlines gathered (top 5-10 articles)
- [ ] Earnings date and recent earnings results included
- [ ] Sector performance and market context added

**Data Sources Required**:
- **Stock Prices**: Real-time or 15-min delayed (Alpha Vantage, Yahoo Finance, IEX Cloud)
- **News**: Financial news aggregator API (NewsAPI, Benzinga, MarketAux)
- **Fundamentals**: Market cap, P/E ratio, sector (Financial Modeling Prep, IEX Cloud)
- **Market Context**: S&P 500 performance, sector indices

**Context Data Structure**:
```json
{
  "ticker": "AAPL",
  "company_name": "Apple Inc.",
  "current_price": 178.25,
  "price_changes": {
    "1d": -0.52,
    "1w": 2.34,
    "1m": 8.12,
    "3m": -4.21
  },
  "market_cap": 2800000000000,
  "pe_ratio": 28.5,
  "sector": "Technology",
  "recent_news": [
    {"title": "Apple unveils new iPhone 16", "date": "2024-09-12", "source": "Reuters"},
    ...
  ],
  "next_earnings_date": "2024-10-31",
  "last_earnings_surprise": 5.2
}
```

**Technical Considerations**:
- Aggregate data from multiple APIs efficiently
- Cache financial data (prices: 5 min, news: 1 hour, fundamentals: 1 day)
- Handle missing data gracefully (not all data available for all stocks)
- Implement fallback data sources
- Monitor API costs against budget

**Dependencies**: Story 4.1 (OpenRouter setup)

**Definition of Done**:
- [ ] Financial data gathered for sample tickers
- [ ] All context fields populated when available
- [ ] Missing data handled gracefully
- [ ] Caching reduces redundant API calls
- [ ] Data retrieval completes in <3 seconds

---

### Story 4.3: AI Analysis Prompt Engineering

**As a** product manager
**I want** optimized AI prompts for financial analysis
**So that** AI responses are insightful, accurate, and actionable

**Acceptance Criteria**:
- [ ] Prompt template created for position analysis
- [ ] Prompt includes institutional investor context (who, when)
- [ ] Current market data integrated into prompt
- [ ] Analysis framework defined (bull case, bear case, risks)
- [ ] Output format structured for consistent parsing
- [ ] Prompt tested with multiple scenarios for quality

**Prompt Structure**:
```
You are a financial analyst providing insights on institutional investment positions.

INSTITUTIONAL POSITION:
- Investor: Warren Buffett (Berkshire Hathaway)
- Position: Apple Inc. (AAPL)
- Filing Date: 2024-08-14 (Q2 2024 13F)
- Position Size: 41.23% of portfolio ($145B value at filing)
- Original Purchase: Buffett has held AAPL since ~2016

CURRENT MARKET DATA (as of 2024-10-15):
- Current Price: $178.25 (down 0.52% today)
- Recent Performance: +2.34% (1W), +8.12% (1M), -4.21% (3M)
- Market Cap: $2.8T
- P/E Ratio: 28.5
- Sector: Technology

RECENT NEWS:
- Apple unveils iPhone 16 with AI features (Sept 12, 2024)
- Services revenue hits record high in Q3 (Aug 3, 2024)
- EU fines Apple $2B over App Store practices (March 2024)

ANALYSIS REQUEST:
Analyze whether this institutional position remains attractive given current market conditions.

Structure your response as follows:

1. CURRENT THESIS (2-3 sentences)
   Why this position might still be compelling today

2. KEY DEVELOPMENTS SINCE FILING (3-4 bullet points)
   Major events or changes affecting the investment thesis

3. BULL CASE (3 points)
   Reasons the position looks attractive today

4. BEAR CASE (3 points)
   Risks or concerns about the position today

5. BOTTOM LINE (1-2 sentences)
   Your assessment of whether the position still makes sense

Keep analysis objective, data-driven, and actionable. Avoid generic advice.
Acknowledge uncertainty where appropriate.
```

**Prompt Variations**:
- **Single Position Analysis**: Deep dive on one holding
- **Portfolio-Level Analysis**: Review entire institutional portfolio
- **Comparative Analysis**: Compare multiple institutional investors' views on same stock
- **Sector Analysis**: Analyze institutional sector bets

**Technical Considerations**:
- Keep prompts under token limits (4K-8K tokens)
- Structure for easy parsing of sections
- Include clear output format instructions
- Test with edge cases (delisted stocks, recent bankruptcies, etc.)
- Version prompts for A/B testing quality

**Dependencies**: Story 4.2 (data context aggregation)

**Definition of Done**:
- [ ] Prompt template created and documented
- [ ] Prompt tested with 10+ scenarios
- [ ] Output format consistent across models
- [ ] Analysis quality meets product standards
- [ ] Prompt versioned for future improvements

---

### Story 4.4: AI Analysis API Endpoint

**As a** frontend developer
**I want** an API endpoint to request AI analysis
**So that** users can trigger insights on demand

**Acceptance Criteria**:
- [ ] POST /api/ai/analyze-position endpoint created
- [ ] Accepts ticker, portfolio context, and analysis type
- [ ] Returns structured AI analysis response
- [ ] Streams response for real-time user feedback
- [ ] Rate limits prevent abuse (5 analyses per user per hour)
- [ ] Analysis requests logged for cost tracking

**API Request/Response**:
```json
POST /api/ai/analyze-position
{
  "ticker": "AAPL",
  "portfolio_id": "buffett-2024-q3",
  "user_portfolio_id": "user-uuid-123",
  "analysis_type": "position_analysis"
}

Response (streamed):
{
  "analysis_id": "uuid",
  "ticker": "AAPL",
  "company_name": "Apple Inc.",
  "analysis": {
    "current_thesis": "Apple remains a core holding...",
    "key_developments": [...],
    "bull_case": [...],
    "bear_case": [...],
    "bottom_line": "..."
  },
  "generated_at": "2024-10-15T14:23:15Z",
  "model_used": "claude-3.5-sonnet",
  "cost": 0.0234
}
```

**Technical Considerations**:
- Implement response streaming for progressive display
- Cache analysis results for 6 hours (avoid duplicates)
- Rate limit per user to control costs
- Log all requests for cost monitoring and quality review
- Handle API timeouts gracefully (>30 seconds)

**Dependencies**: Story 4.3 (prompt engineering), Story 4.2 (data context)

**Definition of Done**:
- [ ] API endpoint functional and tested
- [ ] Streaming responses work correctly
- [ ] Rate limiting enforced per user
- [ ] Analysis cached to reduce costs
- [ ] Response times under 10 seconds (95th percentile)

---

### Story 4.5: AI Analysis Trigger UI - Position Level

**As a** user
**I want** to request AI analysis on specific positions
**So that** I can understand current market relevance

**Acceptance Criteria**:
- [ ] "AI Analysis" button available per holding in portfolio view
- [ ] Click triggers analysis request with loading state
- [ ] Analysis streams in real-time as it generates
- [ ] Analysis displayed in expandable panel or modal
- [ ] Rate limit messaging if user exceeds quota
- [ ] Option to regenerate analysis if unsatisfied

**UI Flow**:
1. User viewing portfolio detail (e.g., Buffett's Q3 2024)
2. Each holding has "✨ Analyze" button
3. User clicks button for AAPL position
4. Loading indicator with "Analyzing current market conditions..."
5. Analysis streams in section by section
6. Full analysis displayed in readable format
7. User can collapse, share, or request new analysis

**UI Components**:
- **Trigger Button**: Prominent but not overwhelming
- **Loading State**: Progress indicator with estimated time
- **Analysis Display**: Formatted sections (thesis, bull/bear, conclusion)
- **Metadata**: Generated timestamp, model used, refresh option
- **Error State**: Fallback for API failures

**Technical Considerations**:
- Disable button during analysis generation
- Show rate limit status (e.g., "3 analyses remaining today")
- Persist analysis in database for future viewing
- Optimize streaming display for readability
- Handle interrupted streams gracefully

**Dependencies**: Story 4.4 (analysis API endpoint)

**Definition of Done**:
- [ ] Analyze button functional per position
- [ ] Streaming analysis displays progressively
- [ ] Rate limits communicated to user
- [ ] Analysis persists for later viewing
- [ ] Error states handled gracefully

---

### Story 4.6: AI Analysis Display Formatting

**As a** user
**I want** AI analysis presented in a clear, scannable format
**So that** I can quickly extract key insights

**Acceptance Criteria**:
- [ ] Analysis sections clearly delineated with headers
- [ ] Bullet points and numbering preserved from AI output
- [ ] Key phrases highlighted (e.g., risks, opportunities)
- [ ] Markdown formatting supported for readability
- [ ] Analysis scrollable within constrained container
- [ ] Print-friendly layout for saving/sharing

**Formatted Display Example**:
```
✨ AI Analysis: Apple Inc. (AAPL)
Warren Buffett's Position | Generated Oct 15, 2024 2:23 PM

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 CURRENT THESIS
Apple remains a core holding due to its ecosystem strength
and services growth, though facing headwinds from iPhone
saturation and regulatory pressure in Europe.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔔 KEY DEVELOPMENTS SINCE FILING (Aug 2024)
• iPhone 16 launched with AI features (Sept 2024)
• Services revenue hit record $24B in Q3
• EU imposed $2B fine over App Store practices
• China sales declined 3% year-over-year

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📈 BULL CASE
✓ Services growing 15%+ annually with 80% margins
✓ $2.8T market cap shows continued market confidence
✓ AI features in iPhone 16 may drive upgrade cycle

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️  BEAR CASE
⚠ iPhone sales plateauing in mature markets
⚠ Regulatory risks with EU App Store ruling
⚠ China weakness amid geopolitical tensions

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 BOTTOM LINE
Position remains defensible given services growth and
ecosystem moat, but China risks and EU regulation warrant
monitoring. Consider holding but watch for Q4 earnings.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Generated by Claude 3.5 Sonnet | Not investment advice
🔄 Regenerate Analysis
```

**Technical Considerations**:
- Parse AI response into structured sections
- Apply consistent styling for headers, bullets, icons
- Support markdown rendering for formatting
- Implement collapsible sections for long analyses
- Ensure mobile-responsive display

**Dependencies**: Story 4.5 (analysis trigger UI)

**Definition of Done**:
- [ ] Analysis formatted with clear sections
- [ ] Icons and styling enhance readability
- [ ] Markdown formatting rendered correctly
- [ ] Display responsive on all devices
- [ ] Collapsible sections functional

---

### Story 4.7: Portfolio-Level AI Analysis

**As a** user
**I want** AI analysis of the entire institutional portfolio
**So that** I can understand overall strategy and sector bets

**Acceptance Criteria**:
- [ ] "Analyze Portfolio" button available at portfolio level
- [ ] AI analyzes top holdings, sector allocation, recent changes
- [ ] Portfolio-level thesis and key themes identified
- [ ] Sector concentration risks highlighted
- [ ] Recent portfolio changes (vs. previous quarter) analyzed
- [ ] Analysis considers market environment and investor style

**Portfolio Analysis Sections**:
1. **Overall Strategy**: What is this investor's current thesis?
2. **Top Holdings Analysis**: Commentary on largest 5-10 positions
3. **Sector Bets**: Which sectors is the investor overweight/underweight?
4. **Recent Changes**: What did they buy, sell, or trim this quarter?
5. **Risk Assessment**: Concentration risks, sector exposure, market timing
6. **Current Relevance**: How does this portfolio fit today's market?

**Technical Considerations**:
- Aggregate data for all portfolio holdings
- Compare to previous quarter's filing (if available)
- Calculate sector weightings vs. S&P 500
- Identify largest position changes quarter-over-quarter
- Generate longer analysis (may take 15-20 seconds)

**Dependencies**: Story 4.4 (analysis API), Story 4.3 (prompt engineering)

**Definition of Done**:
- [ ] Portfolio-level analysis functional
- [ ] All sections generated coherently
- [ ] Analysis considers portfolio context
- [ ] Generation time under 20 seconds
- [ ] User can request portfolio analysis

---

### Story 4.8: Analysis History & Persistence

**As a** user
**I want** to view previously generated AI analyses
**So that** I can reference insights without regenerating

**Acceptance Criteria**:
- [ ] All generated analyses stored in database
- [ ] User can view analysis history for each position
- [ ] Analyses timestamped with generation date
- [ ] Historical analyses display with "as of [date]" context
- [ ] User can compare analyses over time (same position, different dates)
- [ ] Old analyses archived after 90 days (optional)

**Analysis History UI**:
```
AAPL - Analysis History

📅 Oct 15, 2024 (Current)
"Position remains defensible given services growth..."
[View Full Analysis]

📅 Sept 12, 2024 (After iPhone 16 Launch)
"New iPhone features strengthen ecosystem moat..."
[View Full Analysis]

📅 Aug 5, 2024 (Original Filing Date)
"Core holding benefits from services transition..."
[View Full Analysis]
```

**Technical Considerations**:
- Store full analysis JSON in database
- Index by user, portfolio, ticker, timestamp
- Implement efficient query for recent analyses
- Display condensed preview with expand option
- Archive old analyses to cold storage

**Dependencies**: Story 4.5 (analysis trigger UI), Story 4.4 (API endpoint)

**Definition of Done**:
- [ ] Analyses persisted to database
- [ ] User can view analysis history
- [ ] Timestamps displayed clearly
- [ ] Historical context preserved
- [ ] Queries perform efficiently

---

### Story 4.9: Rate Limiting & Cost Controls

**As a** system
**I want** to limit AI analysis requests per user
**So that** costs remain within budget constraints

**Acceptance Criteria**:
- [ ] Rate limit enforced (5 analyses per user per hour)
- [ ] Daily limit enforced (20 analyses per user per day)
- [ ] User notified when approaching limits
- [ ] Clear messaging when limit exceeded with reset time
- [ ] Premium tier allows higher limits (future upsell)
- [ ] Admin dashboard displays aggregate usage and costs

**Rate Limit Tiers**:
- **Free Trial**: 3 analyses per day
- **Standard ($15/month)**: 20 analyses per day
- **Pro ($25/month)**: 50 analyses per day
- **Enterprise**: Unlimited (custom pricing)

**Rate Limit Messaging**:
```
⚠️  Daily Analysis Limit Reached
You've used 20 of 20 AI analyses today.

Your limit resets in 4 hours (6:00 PM ET)

💎 Upgrade to Pro for 50 analyses per day
[Upgrade Now]
```

**Technical Considerations**:
- Implement rate limiting with Redis or in-memory cache
- Track usage per user per time window (sliding or fixed)
- Store daily/monthly usage for billing integration
- Cache analysis results to avoid duplicate charges
- Admin monitoring dashboard for cost tracking

**Dependencies**: Story 4.4 (analysis API endpoint)

**Definition of Done**:
- [ ] Rate limits enforced correctly
- [ ] User notified when exceeding limits
- [ ] Limits configurable per subscription tier
- [ ] Usage tracked for billing
- [ ] Admin dashboard displays costs

---

### Story 4.10: AI Analysis Feedback Loop

**As a** product manager
**I want** users to rate AI analysis quality
**So that** we can improve prompts and model selection

**Acceptance Criteria**:
- [ ] Thumbs up/down feedback option after each analysis
- [ ] Optional text feedback for low ratings
- [ ] Feedback stored with analysis ID for review
- [ ] Aggregate feedback displayed in admin dashboard
- [ ] Low-rated analyses flagged for prompt improvement
- [ ] A/B testing framework for prompt variations

**Feedback UI**:
```
Was this analysis helpful?
👍 Yes    👎 No

[If No selected:]
What could be improved? (optional)
[ ] Analysis was too generic
[ ] Missing important context
[ ] Incorrect information
[ ] Not actionable
[Other: ____________]

[Submit Feedback]
```

**Feedback Analytics**:
- **Overall Rating**: % positive feedback
- **Rating by Model**: Compare Claude vs. GPT-4
- **Rating by Analysis Type**: Position vs. portfolio
- **Common Issues**: Categorized feedback themes
- **Low Performers**: Analyses with negative feedback for review

**Technical Considerations**:
- Store feedback linked to analysis ID
- Implement simple thumbs up/down UI
- Track feedback metrics in analytics dashboard
- Flag analyses below threshold for review
- A/B test prompt variations based on feedback

**Dependencies**: Story 4.6 (analysis display formatting)

**Definition of Done**:
- [ ] Feedback UI functional and intuitive
- [ ] Feedback stored in database
- [ ] Analytics dashboard displays metrics
- [ ] Low-rated analyses flagged
- [ ] Prompt improvement process defined

---

### Story 4.11: AI Analysis Disclaimer & Education

**As a** product owner
**I want** clear disclaimers on AI-generated content
**So that** users understand limitations and avoid over-reliance

**Acceptance Criteria**:
- [ ] Disclaimer displayed with every AI analysis
- [ ] Educational content explains AI capabilities and limits
- [ ] Clear messaging that AI is not investment advice
- [ ] Reminder that analysis is based on public data (not insider info)
- [ ] Encouragement to do additional research
- [ ] Link to full terms of service and disclaimers

**Disclaimer Text**:
```
⚠️  AI-Generated Analysis | Not Investment Advice

This analysis is generated by AI using publicly available market data.
It is not personalized investment advice and should not be relied upon
as the sole basis for investment decisions.

• AI may make errors or miss critical information
• Past institutional performance doesn't predict future results
• Always conduct your own research and consult a financial advisor
• This platform does not provide investment recommendations

Read our full disclaimers: [Terms of Service]
```

**Educational Content**:
- "How AI Analysis Works" explainer
- "Limitations of AI in Investing" article
- "Using AI Insights Responsibly" guide
- "What AI Can and Cannot Do" FAQ

**Technical Considerations**:
- Display disclaimer prominently but non-intrusively
- Require first-time users to acknowledge disclaimer
- Track user acknowledgment for compliance
- Include disclaimer in PDF exports and emails
- Legal review of all disclaimer text

**Dependencies**: Story 4.6 (analysis display formatting)

**Definition of Done**:
- [ ] Disclaimer displayed with all analyses
- [ ] Educational content created and accessible
- [ ] First-time users acknowledge disclaimer
- [ ] Disclaimer legally reviewed and approved
- [ ] Terms of service updated accordingly

---

### Story 4.12: Comparative Analysis - Multiple Investors

**As a** user
**I want** to see how multiple investors view the same stock
**So that** I can identify consensus or contrarian positions

**Acceptance Criteria**:
- [ ] "Compare Investors" feature for individual stocks
- [ ] Shows which investors hold the stock and their allocations
- [ ] AI analyzes consensus (many holders) vs. contrarian (few holders)
- [ ] Identifies differing investment theses if detectable
- [ ] Highlights recent buying vs. selling trends
- [ ] Visualizes investor sentiment distribution

**Comparative Analysis Display**:
```
AAPL - Investor Comparison

WHO HOLDS AAPL?
• Warren Buffett (Berkshire): 41.23% of portfolio ($145B)
• Bill Ackman (Pershing Square): 8.5% of portfolio ($2.1B)
• Nancy Pelosi (Congress): 2.3% of portfolio ($150K)

✨ AI CONSENSUS ANALYSIS
Strong consensus among value investors (Buffett) and activist
investors (Ackman), suggesting both growth and value appeal.

RECENT ACTIVITY:
📈 Increased: Buffett (+2.5% from Q1), Pelosi (+5%)
📉 Decreased: None
➡️  Unchanged: Ackman (no change)

THESIS DIVERGENCE:
• Buffett: Services growth + ecosystem moat
• Ackman: Undervalued tech hardware play
• Pelosi: Tech sector momentum (speculative)
```

**Technical Considerations**:
- Query all portfolios for specific ticker
- Aggregate position data across investors
- Generate AI analysis comparing theses
- Visualize with charts (allocation distribution)
- Cache comparative data for popular stocks

**Dependencies**: Story 4.7 (portfolio analysis), Epic 1 Story 1.7 (API endpoints)

**Definition of Done**:
- [ ] Comparative analysis functional for any ticker
- [ ] Multiple investor holdings displayed
- [ ] AI consensus analysis generated
- [ ] Recent activity trends shown
- [ ] Visualizations enhance understanding

---

### Story 4.13: News-Driven Analysis Triggers

**As a** user
**I want** AI analysis when major news affects my portfolio
**So that** I can react to market-moving events quickly

**Acceptance Criteria**:
- [ ] System monitors news for portfolio holdings
- [ ] Major news events trigger automatic analysis (optional user setting)
- [ ] User notified of significant events affecting holdings
- [ ] AI analyzes impact of news on investment thesis
- [ ] User can view news-triggered analyses in timeline
- [ ] User controls which holdings to monitor (all vs. top 5)

**News Trigger Scenarios**:
- Earnings announcements (beats/misses)
- Major product launches
- Regulatory actions (SEC filings, lawsuits)
- Executive changes (CEO departure)
- M&A activity (acquisitions, buyouts)
- Significant stock price moves (±10% in one day)

**News-Triggered Analysis Flow**:
1. System detects major news for AAPL (iPhone 16 launch)
2. Notification sent to users holding AAPL in portfolio
3. AI analysis generated automatically
4. User views "Impact Analysis" in news feed
5. Analysis explains how news affects Buffett's thesis

**Technical Considerations**:
- Integrate with news API for real-time monitoring
- Define "major news" criteria (source reputation, sentiment)
- Implement notification system (email, in-app, push)
- Balance notification frequency (avoid spam)
- User preference controls for notification types

**Dependencies**: Story 4.2 (data context aggregation), Story 4.5 (analysis UI)

**Definition of Done**:
- [ ] News monitoring functional for holdings
- [ ] Major events trigger analyses automatically
- [ ] Users notified of significant events
- [ ] Analysis quality meets standards
- [ ] Notification preferences configurable

---

## Epic Completion Criteria

**Epic 4 is considered complete when**:
- [ ] All 13 user stories marked as done
- [ ] User can trigger AI analysis on individual positions
- [ ] AI responses include current market context and insights
- [ ] Portfolio-level AI analysis functional
- [ ] Analysis history persisted and viewable
- [ ] Rate limiting controls costs effectively
- [ ] User feedback loop captures quality metrics
- [ ] Disclaimers and education content prominent
- [ ] End-to-end test: user analyzes Buffett's AAPL position, receives contextual insights in <10 seconds

## Dependencies for Future Epics

**Epic 4 provides for**:
- **Epic 5**: AI insights available for performance attribution analysis
- Future: AI-powered portfolio recommendations and rebalancing

## Risks & Mitigation

| Risk | Impact | Mitigation Strategy |
|------|--------|---------------------|
| AI costs exceed budget ($0.20/user/month) | High | Aggressive caching, rate limiting, model fallbacks |
| AI generates incorrect/misleading information | Critical | Disclaimers, feedback loop, human review of flagged content |
| Analysis quality inconsistent across models | Medium | A/B testing, prompt optimization, model selection logic |
| User over-reliance on AI recommendations | High | Strong disclaimers, education content, "not advice" messaging |
| OpenRouter API downtime | Medium | Fallback to direct model APIs, cached responses |
| News API costs spiral | Medium | Monitor usage, limit news triggers, batch processing |
| Prompt injection or abuse | Low | Input sanitization, rate limiting, abuse detection |

## Technical Debt Considerations

**Acceptable for MVP**:
- Basic caching strategy (improve with smarter invalidation)
- Single AI model (add multi-model optimization later)
- Manual prompt management (build prompt versioning system later)
- Simple rate limiting (enhance with usage tiers later)

**Must Address in Epic 4**:
- Secure API key management for AI services
- Comprehensive error handling for AI failures
- Cost tracking and alerting for budget control
- Prompt versioning for quality improvement

## Future Enhancements (Post-MVP)

- AI-powered portfolio recommendations ("Build a portfolio like Buffett")
- Sentiment analysis across multiple institutional investors
- AI explanations for user's custom allocation decisions
- Predictive analysis ("What might Buffett do next quarter?")
- Voice-activated analysis requests
- AI comparison of user portfolio vs. institutional strategies
- Integration with earnings call transcripts for deeper context
- AI-generated portfolio reports (PDF exports)
- Custom analysis queries ("Why is Buffett selling this?")

## AI Model Selection Strategy

**Model Selection Logic**:
1. **Single Position Analysis**: Claude 3.5 Sonnet (best reasoning)
2. **Portfolio Analysis**: Claude 3.5 Sonnet (handles complexity)
3. **Simple Queries**: Claude 3 Haiku (cost-effective)
4. **Fallback**: GPT-4 Turbo if Claude unavailable

**Cost Estimates (per analysis)**:
- Claude 3.5 Sonnet: ~$0.02-0.05
- GPT-4 Turbo: ~$0.03-0.07
- Claude 3 Haiku: ~$0.001-0.003

**Target**: Average $0.01 per analysis with caching and optimization

## Quality Assurance for AI Output

**Quality Metrics**:
- **Factual Accuracy**: Claims verifiable against market data
- **Coherence**: Analysis sections logically structured
- **Actionability**: Insights provide decision-making value
- **Relevance**: Analysis addresses current market context
- **Objectivity**: Balanced bull/bear perspectives

**Quality Control Process**:
1. Automated checks for output format compliance
2. User feedback collection (thumbs up/down)
3. Manual review of low-rated analyses weekly
4. Prompt iteration based on feedback patterns
5. A/B testing of prompt variations

## Compliance & Legal Considerations

- **Not Investment Advice**: Clear disclaimers on all AI content
- **No Guarantees**: AI analysis may contain errors or omissions
- **User Responsibility**: Users make own investment decisions
- **Data Sources**: AI uses publicly available market data only
- **No Insider Info**: Platform does not access non-public information
- **Terms of Service**: Updated to cover AI-generated content
