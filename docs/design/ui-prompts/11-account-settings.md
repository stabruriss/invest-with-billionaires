# Screen 11: Account Settings

## AI UI Generation Prompt

```markdown
Create a clean settings page with tactile hardware design and organized preferences management.

DESIGN SYSTEM:
- Primary: #9BBC0F (sage green)
- Accent: #FFB30F (warm amber)
- Background: #F7F3E9 (cream paper texture)
- Typography: Berkeley Mono (all text)
- Conservative pixel art with hand-drawn authenticity

LAYOUT:
- Sidebar navigation (left, desktop) or tabs (mobile)
- Main content area (right/center) for selected section
- Clear visual hierarchy, generous spacing
- ONE primary action per section

SIDEBAR NAVIGATION (Desktop):
- Title: "SETTINGS" (Berkeley Mono, 24px, bold, top)
- Sections (vertical list):
  1. Profile (pixel-art person icon, 16x16)
  2. Brokerage Connection (pixel-art link icon, 16x16)
  3. Notifications (pixel-art bell icon, 16x16)
  4. Subscription (pixel-art card icon, 16x16)
  5. Security (pixel-art lock icon, 16x16)
  6. Help & Support (pixel-art question icon, 16x16)

- Selected state: Sage green background, left border (4px)
- Hover: Slight background darken
- Berkeley Mono, 16px

MOBILE NAVIGATION:
- Horizontal tabs (scrollable)
- Selected tab: Sage green underline (4px)
- Tap to switch sections

---

## SECTION 1: PROFILE

**Content Area:**
- Headline: "Profile" (Berkeley Mono, 28px, bold)
- Small pixel-art user icon (32x32, top-right of headline)

**Editable Fields:**
1. **Display Name**
   - Label: "Display Name" (14px, 600 weight)
   - Input: Current name, editable
   - Below: "Shown in your account, not public" (muted, 12px)

2. **Email Address**
   - Label: "Email Address"
   - Input: Current email, editable
   - Below: "Used for login and notifications"
   - Button: "Verify Email" (if not verified, amber)

3. **Account Created**
   - Label: "Member Since"
   - Text: "October 1, 2024" (read-only, muted)

**Actions:**
- ONE button: "Save Changes" (sage green, enabled if changes made)
- Secondary link: "Delete Account" (destructive, small, bottom)

**Delete Account Flow:**
- Click link → Confirmation modal
- Modal: "Delete your account? This can't be undone."
- Warning: "All portfolios and data will be permanently deleted."
- Input: "Type DELETE to confirm" (prevents accidental deletion)
- Button: "Delete My Account" (destructive red)

---

## SECTION 2: BROKERAGE CONNECTION

**Content Area:**
- Headline: "Brokerage Connection" (Berkeley Mono, 28px, bold)
- Small pixel-art Alpaca logo (32x32, top-right)

**Connection Status:**

**If Connected:**
- Status badge: "✓ Connected" (sage green, prominent)
- Account type: "Paper Trading Account" or "Live Trading Account"
- Buying power: "$10,000.00" (LED-style, large)
- Last synced: "2 minutes ago" (small, muted)
- Connection date: "Connected on Oct 1, 2024"

**Actions (If Connected):**
- "Refresh Account Data" button (secondary, outlined)
- "Switch to [Live/Paper] Trading" button (secondary, outlined)
- "Disconnect Alpaca" button (destructive link, small, bottom)

**Switch Trading Mode:**
- Click → Confirmation modal
- "Switch to Live Trading? Real money will be used." (warning)
- Requires re-authentication with Alpaca
- Button: "Switch to Live Trading" (amber)

**Disconnect Flow:**
- Click link → Confirmation modal
- "Disconnect Alpaca? You won't be able to execute portfolios."
- Button: "Disconnect" (destructive)

**If Not Connected:**
- Status: "Not Connected" (muted)
- Message: "Connect your Alpaca account to execute portfolios"
- CTA button: "Connect Alpaca Account" (sage green, large)
- Links to Connect Alpaca OAuth flow

---

## SECTION 3: NOTIFICATIONS

**Content Area:**
- Headline: "Notifications" (Berkeley Mono, 28px, bold)
- Small pixel-art bell icon (32x32, top-right)

**Notification Preferences (Toggles):**

Each preference:
- Toggle switch (sage green when enabled)
- Label (bold, 16px)
- Description (muted, 14px)

**Email Notifications:**
- "Order Confirmations" (toggle)
  - "Get notified when portfolio execution completes"
- "Performance Milestones" (toggle)
  - "Alerts when portfolio reaches value milestones"
- "Market News" (toggle)
  - "AI analysis triggers for major news affecting holdings"
- "Weekly Summary" (toggle)
  - "Weekly portfolio performance recap"

**In-App Notifications:**
- "Order Updates" (toggle)
  - "Real-time updates during portfolio execution"
- "AI Analysis Ready" (toggle)
  - "Alert when requested AI analysis completes"

**Push Notifications (Mobile):**
- "Enable Push Notifications" (toggle)
  - "Requires browser/device permission"
  - If disabled by browser: "Enable in browser settings" message

**Actions:**
- ONE button: "Save Preferences" (sage green, enabled if changes made)

---

## SECTION 4: SUBSCRIPTION

**Content Area:**
- Headline: "Subscription" (Berkeley Mono, 28px, bold)
- Small pixel-art credit card icon (32x32, top-right)

**Current Plan:**
- Plan name: "Free Trial" or "Standard" or "Pro" (large, bold)
- Pixel-art badge (16x16) next to plan name
- Price: "$15/month" (LED-style, if paid plan)
- Status: "Active" (sage green) or "Trial ends in 14 days" (amber)

**Plan Features (Bullet List):**
- "20 AI analyses per day"
- "Unlimited portfolios"
- "Paper & live trading"
- "Email support"

**Billing Info (If Subscribed):**
- Payment method: "Visa ending in 4242"
- Next billing date: "November 1, 2024"
- Billing history: "View Invoices" (link)

**Actions:**
- "Upgrade Plan" button (if on free/standard, sage green)
- "Manage Billing" button (if subscribed, secondary)
- "Cancel Subscription" link (if subscribed, destructive, small, bottom)

**Upgrade Modal:**
- Compare plans side-by-side
- Standard vs. Pro features
- CTA: "Upgrade to Pro" (sage green)

**Cancel Flow:**
- Click link → Confirmation modal
- "Cancel subscription? You'll lose access to premium features."
- Retention offer: "Stay for 20% off next 3 months?" (optional)
- Button: "Cancel Subscription" (destructive)

---

## SECTION 5: SECURITY

**Content Area:**
- Headline: "Security" (Berkeley Mono, 28px, bold)
- Small pixel-art lock icon (32x32, top-right)

**Change Password:**
- Label: "Change Password"
- Fields:
  1. Current password (input, password type)
  2. New password (input, show/hide toggle)
  3. Confirm new password (input)
- Button: "Update Password" (sage green)

**Two-Factor Authentication (Future):**
- Label: "Two-Factor Authentication (2FA)"
- Status: "Not Enabled" (muted) or "✓ Enabled" (sage green)
- Button: "Enable 2FA" or "Disable 2FA"
- Description: "Add extra security to your account"

**Active Sessions:**
- Label: "Active Sessions"
- List of devices/browsers:
  - "MacBook Pro (Safari) - San Francisco, CA"
  - "Current session" (current device, sage green)
  - "Signed in 2 hours ago"
- Action: "Sign Out" button per session (except current)
- "Sign Out All Devices" button (secondary, bottom)

**Data Privacy:**
- Label: "Data & Privacy"
- Links:
  - "Download My Data" (export all user data as JSON/CSV)
  - "Privacy Policy"
  - "Terms of Service"

---

## SECTION 6: HELP & SUPPORT

**Content Area:**
- Headline: "Help & Support" (Berkeley Mono, 28px, bold)
- Small pixel-art question icon (32x32, top-right)

**Help Resources:**
- "📚 Documentation" (link to knowledge base)
- "💬 Contact Support" (link to support form or email)
- "🐛 Report a Bug" (link to GitHub issues or support)
- "💡 Feature Requests" (link to feedback form)

**FAQs (Collapsible):**
- "How do I connect my Alpaca account?"
- "What's the difference between paper and live trading?"
- "How current is the 13F data?"
- "Can I cancel my subscription anytime?"
- Each FAQ: Click to expand answer (smooth accordion)

**App Info:**
- App version: "v1.0.2"
- Last updated: "October 15, 2024"
- Legal: "Terms" | "Privacy" | "Disclaimers" (links)

---

## GENERAL STYLING (All Sections):

**Form Inputs:**
- Berkeley Mono font
- Height: 48px
- Border: 1px warm gray, focus: amber glow
- Labels always visible (above input)

**Buttons:**
- Primary: Sage green (#9BBC0F), full-width or fixed-width
- Secondary: Outlined, neutral border
- Destructive: Muted red (#C13B3B) for dangerous actions

**Toggle Switches:**
- Track: Gray (off), sage green (on)
- Handle: Chunky, pixel-corner rounding
- Smooth slide animation (200ms)

**Dividers:**
- Subtle dithered horizontal line (1px)
- Separates major sections within content area

**Success/Error Messages:**
- Inline feedback below fields
- Toast notification for save success (top-right)
- "Saved!" with pixel-art checkmark (8x8)

---

## ATMOSPHERE:
- Organized, clear, empowering
- No overwhelming options (progressive disclosure)
- Honest security messaging (no fear-mongering)
- Retro game settings menu aesthetic
- Each section feels focused and actionable

## INTERACTIONS:
- Sidebar navigation: smooth content transitions
- Form changes: Enable save button
- Toggle switches: Smooth slide animation
- Confirmation modals: Scale + fade-in
- Success toast: Slide in from top-right

## REFERENCE VIBE:
Retro game settings menu meets modern account management with wabi-sabi clarity
```

## Screen Purpose

**User Goal**: Manage account preferences, brokerage connection, notifications, subscription, and security settings.

**Key User Actions**:
1. Edit profile information
2. Connect/disconnect/manage Alpaca account
3. Configure notification preferences
4. Manage subscription and billing
5. Update security settings (password, 2FA)
6. Access help resources

## Design Rationale

**Why this design works**:
- **Sidebar navigation**: Organized sections, clear mental model
- **One section at a time**: Focused editing, not overwhelming
- **Toggles for preferences**: Quick on/off without forms
- **Clear status indicators**: Connection status, subscription status visible
- **Destructive actions**: Separated, require confirmation
- **Retro settings menu**: Familiar pattern from gaming

## Sidebar Navigation Benefits

**Desktop**:
- Persistent visibility (always see all sections)
- Quick switching between sections
- Clear current location (highlighted)

**Mobile**:
- Horizontal tabs (space-efficient)
- Swipeable content (optional)
- Back button to exit settings

## Form Validation

**Client-Side Validation**:
- Email format check
- Password strength (min 8 characters)
- Password match validation
- Inline error messages

**Server-Side Validation**:
- Email uniqueness check
- Current password verification (for changes)
- Session validation (for security actions)

## Security Best Practices

**Password Changes**:
- Require current password
- Enforce minimum complexity
- Invalidate other sessions (optional)
- Send confirmation email

**Session Management**:
- List active devices/browsers
- Allow sign out per session
- "Sign Out All" for security
- Show last active timestamp

**Two-Factor Authentication** (Future):
- TOTP authenticator app support
- Backup codes generated
- Enable/disable flow with confirmation
- Require 2FA for sensitive actions

## Subscription Management

**Plan Tiers**:
- **Free Trial**: 14 days, 3 analyses/day, limited
- **Standard**: $15/month, 20 analyses/day, full features
- **Pro**: $25/month, 50 analyses/day, priority support

**Upgrade Flow**:
- Click "Upgrade" → Modal with plan comparison
- Select plan → Payment method entry (Stripe)
- Confirmation → Immediate upgrade
- Email receipt sent

**Cancel Flow**:
- Click "Cancel" → Confirmation modal
- Optional: Retention offer (discount)
- Confirm cancellation → End of billing period access
- Confirmation email sent

## Notification Preferences

**Email Notifications**:
- Order confirmations (high priority, default ON)
- Performance milestones (default ON)
- Market news (default OFF, can be noisy)
- Weekly summary (default ON)

**In-App Notifications**:
- Real-time order updates (default ON)
- AI analysis ready (default ON)

**Push Notifications** (Mobile):
- Requires browser permission
- If denied: Guide user to enable in settings

## Responsive Considerations

**Mobile (< 768px)**:
- Sidebar → Horizontal tabs
- Forms: Full-width inputs
- Buttons: Full-width
- Toggles: Larger tap targets (min 44px)

**Desktop (> 1024px)**:
- Sidebar: Fixed 240px width
- Content: Max-width 800px
- Two-column layout for some sections (optional)

## Accessibility

- Sidebar keyboard navigable (Arrow keys, Tab)
- Form inputs labeled (not placeholder-only)
- Toggle switches accessible (aria-label, keyboard toggle)
- Confirmation modals keyboard accessible (ESC to cancel)
- Focus indicators visible (sage green outline)

## Component Mapping

Maps to Epic 1, Story 1.3: User Profile & Account Management
Maps to Epic 3, Story 3.2: Alpaca OAuth Connection Flow

**Required API Endpoints**:
- `GET /api/user/profile` (fetch profile)
- `PATCH /api/user/profile` (update profile)
- `POST /api/user/change-password` (change password)
- `GET /api/user/sessions` (list active sessions)
- `DELETE /api/user/sessions/:id` (sign out session)
- `GET /api/user/notifications` (fetch preferences)
- `PATCH /api/user/notifications` (update preferences)
- `GET /api/user/subscription` (fetch subscription status)
- `POST /api/user/subscription/upgrade` (upgrade plan)
- `POST /api/user/subscription/cancel` (cancel subscription)

**Next Screens**:
- Connect Alpaca → OAuth flow (external)
- Upgrade Plan → Payment modal (Stripe)
- Help → Knowledge base (external or in-app)
