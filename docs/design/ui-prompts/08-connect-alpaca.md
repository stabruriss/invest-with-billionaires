# Screen 8: Connect Alpaca (OAuth Flow)

## AI UI Generation Prompt

```markdown
Create a trustworthy brokerage connection screen with tactile hardware design and clear security messaging.

DESIGN SYSTEM:
- Primary: #9BBC0F (sage green)
- Accent: #FFB30F (warm amber)
- Background: #F7F3E9 (cream paper texture)
- Typography: Berkeley Mono (all text)
- Conservative pixel art with hand-drawn authenticity

LAYOUT:
- Centered card (max-width 600px)
- Clear visual hierarchy: why → what → action
- ONE primary CTA (Connect button)
- Security badges/messaging prominent

CONNECTION CARD DESIGN:
- Soft rounded rectangle, hand-drawn border
- Light background (#F0ECE3)
- Padding: 40px
- Pixel-art Alpaca logo (32x32) + lock icon (16x16, secure green)

HEADLINE:
- "Connect Your Alpaca Account" (Berkeley Mono, 28px, bold)
- Subheadline: "Execute portfolios through your own brokerage account" (16px, muted)

WHY CONNECT (Benefits):
- Small pixel-art icons (16x16) + text
  1. 🔒 "Your keys, your control" - We never hold your funds
  2. ⚡ "One-click execution" - Place 20+ orders in seconds
  3. 📊 "Real-time tracking" - Monitor orders and positions live
  4. 🧪 "Paper trading available" - Practice risk-free first

- Clean list layout, generous spacing
- Berkeley Mono, 15-16px
- Each benefit: icon + bold headline + supporting text

WHAT WE ACCESS (Permissions):
- Amber info box (not harsh warning):
  - Title: "What we'll access:" (Berkeley Mono, bold)
  - Bullet list:
    - "View account balance and buying power"
    - "View current positions and order history"
    - "Place buy orders on your behalf"
    - "Track order status"
  - Bottom text: "We NEVER withdraw funds or sell without your explicit action"

SECURITY MESSAGING:
- Small section with pixel-art shield icon (16x16):
  - "Secured by OAuth 2.0"
  - "Your credentials never pass through our servers"
  - "Revoke access anytime in Alpaca settings"

PRIMARY ACTION:
- ONE large button: "Connect Alpaca Account" (sage green, prominent)
- Below button: Small text "You'll be redirected to Alpaca to authorize"
- Secondary action: "Skip for now" link (subtle, muted)

PAPER TRADING TOGGLE:
- Toggle switch above Connect button:
  - Label: "🧪 Use Paper Trading Account (practice mode)"
  - Default: ON for first-time users
  - Style: Sage green when enabled, gray when disabled
  - Explanation: "Practice with simulated money. No risk."

DISCLAIMERS (Footer):
- "⚠ Brokerage services provided by Alpaca Securities LLC, member FINRA/SIPC"
- "Not investment advice | Orders executed at your own risk"
- Small, muted, honest

OAUTH REDIRECT EXPERIENCE:
After "Connect" click:
1. Loading state: "Redirecting to Alpaca..." (pixel-art loading spinner)
2. Redirect to Alpaca OAuth page (external)
3. User authorizes on Alpaca (external)
4. Redirect back to app with success message

SUCCESS STATE (After OAuth Return):
- Brief modal: "✓ Alpaca Connected Successfully"
- Pixel-art checkmark (32x32)
- Account info: "Connected to: [Paper Trading / Live Trading]"
- Buying power: "$10,000 available" (LED-style number)
- CTA: "Start Executing Portfolios" (redirect to My Portfolios)

ERROR STATES:
- OAuth canceled: "Connection canceled. You can connect anytime from Settings."
- OAuth failed: "Connection failed. Please try again or contact support."
- Network error: "Unable to reach Alpaca. Check connection and retry."

ATMOSPHERE:
- Trustworthy, secure, transparent
- Honest about permissions (no hiding what we access)
- Emphasize user control (never withdraw funds, revoke anytime)
- Paper trading option reduces fear for new users
- Nostalgic warmth balances security seriousness

INTERACTIONS:
- Connect button: pulsing glow effect (inviting)
- Paper trading toggle: smooth slide animation
- Hover on benefits: subtle highlight
- Loading state: pixel-art spinner (8-bit style)

REFERENCE VIBE:
Retro game "Connect Controller" screen meets trustworthy fintech OAuth with honest transparency
```

## Screen Purpose

**User Goal**: Securely connect Alpaca brokerage account to enable portfolio execution.

**Key User Actions**:
1. Understand why connection is needed
2. Review permissions being requested
3. Choose paper trading or live trading
4. Click "Connect Alpaca Account"
5. Authorize on Alpaca OAuth page (external)
6. Return to app with connected account

## Design Rationale

**Why this design works**:
- **Benefits upfront**: User understands value before committing
- **Transparent permissions**: Explicitly list what we access (builds trust)
- **Security messaging**: OAuth 2.0, credentials never stored, revoke anytime
- **Paper trading default**: Reduces fear for first-time users
- **One action**: Clear single CTA (connect)
- **Honest disclaimers**: Not investment advice, orders at user's risk

## OAuth Flow Diagram

```
[App: Connect Alpaca Screen]
     ↓ User clicks "Connect"
[App: Loading state "Redirecting..."]
     ↓ Redirect to Alpaca
[Alpaca: Login page] (external)
     ↓ User logs in
[Alpaca: Authorization page] (external)
     "Invest with Billionaires requests access to..."
     ↓ User clicks "Authorize"
[App: OAuth callback URL]
     ↓ Exchange code for tokens
[App: Success modal "✓ Connected"]
     ↓ Store tokens (encrypted)
[App: Redirect to Dashboard]
```

## Security Best Practices

**OAuth Implementation**:
- Use Authorization Code flow (not Implicit)
- State parameter for CSRF protection
- PKCE (Proof Key for Code Exchange) if supported
- Store tokens encrypted at rest
- Refresh tokens automatically
- Handle token expiration gracefully

**User Education**:
- Explain OAuth: "You authorize on Alpaca's site, not ours"
- Clarify: "We never see your Alpaca password"
- Revocation: "You can revoke access anytime in Alpaca settings"

## Paper Trading vs. Live Trading

**Paper Trading** (Default for new users):
- Toggle ON by default
- Explanation: "Practice with simulated $100,000"
- No real money risk
- Connect to Alpaca Paper Trading API

**Live Trading**:
- Toggle OFF to use live trading
- Warning: "Real money will be used"
- Confirmation modal: "Are you sure? Real money will be invested."
- Connect to Alpaca Live Trading API

**Switch Later**:
- User can switch mode in Settings
- Requires reconnecting (different OAuth scope)

## Error Handling

**OAuth Errors**:
- **Canceled**: "You canceled the connection. No changes made."
- **Denied**: "Authorization denied. You can try again anytime."
- **Invalid State**: "Security error. Please try connecting again."
- **Network Error**: "Unable to reach Alpaca. Check your connection."
- **Token Exchange Failed**: "Connection failed. Please contact support."

**Display Strategy**:
- Show error in amber info box (not harsh red)
- Provide retry button
- Link to help docs or support
- Log errors for debugging (server-side)

## Permissions Explanation

**What We Access** (be specific):
- ✅ View account balance and buying power
- ✅ View current positions and order history
- ✅ Place buy orders (market orders only)
- ✅ Check order status

**What We DON'T Access**:
- ❌ Withdraw funds
- ❌ Sell positions (user must explicitly trigger)
- ❌ Change account settings
- ❌ Access personal information beyond name/email

## Connected State (Settings Page)

**When Already Connected**:
- Show connection status: "✓ Alpaca Connected"
- Account type: "Paper Trading" or "Live Trading"
- Buying power: "$10,000 available" (LED-style)
- Last synced: "2 minutes ago"
- Actions:
  - "Refresh Account Data" button
  - "Switch to Live/Paper Trading" button
  - "Disconnect Account" button (destructive, confirmation required)

## Responsive Considerations

**Mobile (< 768px)**:
- Card: Full-width (16px margins)
- Benefits: Stack vertically
- Button: Full-width
- Font sizes: Slightly smaller

**Desktop (> 1024px)**:
- Card: Fixed width 600px, centered
- Benefits: 2-column grid (optional)
- Button: Fixed width (not full-width)

## Accessibility

- All steps keyboard navigable
- Focus indicators visible (sage green outline)
- Permissions list announced to screen readers
- Toggle switch accessible (aria-label, keyboard toggle)
- Error messages announced

## Component Mapping

Maps to Epic 3, Story 3.2: Alpaca OAuth Connection Flow

**Required API Endpoints**:
- `POST /api/alpaca/connect` (initiate OAuth)
- `GET /api/alpaca/callback` (OAuth callback handler)
- `POST /api/alpaca/disconnect` (revoke connection)
- `GET /api/alpaca/account` (fetch account info)

**Next Screens**:
- Success: My Portfolios Dashboard or Execution Preview
- Skip: Portfolio Browser (can connect later from Settings)
