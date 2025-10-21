# Screen 7: Sign Up / Login

## AI UI Generation Prompt

```markdown
Create a minimalist authentication screen with sophisticated Gameboy aesthetics and frictionless sign-up flow.

DESIGN SYSTEM:
- Primary: #9BBC0F (sage green)
- Accent: #FFB30F (warm amber)
- Background: #F7F3E9 (cream paper texture)
- Typography: Berkeley Mono (all text)
- Conservative pixel art with hand-drawn authenticity

LAYOUT:
- Centered card (max-width 440px)
- Generous white space around card
- Simple tab toggle: [Sign Up] [Login]
- ONE primary action (submit button)
- Minimal distractions

AUTH CARD DESIGN:
- Soft rounded rectangle with hand-drawn border
- Light background (slightly darker cream: #F0ECE3)
- Padding: 32-40px
- Small pixel-art logo at top (32x32)
- Tab toggle for Sign Up / Login modes

SIGN UP MODE:
- Headline: "Start Investing with Billionaires" (Berkeley Mono, 24px, bold)
- Fields (minimal):
  1. Email address (required)
  2. Password (required, with show/hide toggle)
  3. Confirm password (required)
- Small checkbox: "I agree to Terms & Privacy Policy" (linked)
- ONE large button: "Create Account" (sage green, full-width)
- Divider: "Already have an account?" → [Login] link

LOGIN MODE:
- Headline: "Welcome Back" (Berkeley Mono, 24px, bold)
- Fields:
  1. Email address
  2. Password (with show/hide toggle)
- Small checkbox: "Remember me" (optional)
- "Forgot password?" link (right-aligned, small)
- ONE large button: "Login" (sage green, full-width)
- Divider: "New here?" → [Sign Up] link

INPUT FIELD STYLING:
- Berkeley Mono font in inputs
- Label above field (14px, 600 weight, always visible)
- Border: 1px warm gray, focus state: amber glow
- Height: 48px (comfortable tap target)
- Placeholder: 50% opacity
- Error state: Red border, shake animation, message below

PASSWORD REQUIREMENTS:
- Small text below password field (collapsed until focus)
- Simple requirements: "Minimum 8 characters"
- No aggressive strength meter (keep it simple)

SHOW/HIDE PASSWORD:
- Small pixel-art eye icon (16x16) in input right side
- Toggle between visible/hidden text
- Accessible via keyboard (Tab + Enter)

ERROR HANDLING:
- Inline validation (on blur or submit)
- Clear error messages:
  - "Email already exists" → Suggest login
  - "Invalid email format"
  - "Passwords don't match"
  - "Password too short (min 8 characters)"
- Shake animation on submit failure
- Focus returns to first error field

SUCCESS STATE:
- After sign up: Brief confirmation message
- Redirect to Portfolio Browser or onboarding flow
- After login: Redirect to last viewed page or Dashboard

DISCLAIMERS (Footer):
- Small text: "⚠ Not investment advice | Paper trading available"
- Legal links: Terms | Privacy | Disclaimers
- Berkeley Mono, 12px, muted color

SOCIAL AUTH (Optional Future):
- "Or continue with" divider
- Buttons: [Google] [Apple] (outlined, with small logos)
- Same height as other buttons (48px)
- Not recommended for MVP (adds complexity)

ATMOSPHERE:
- Fast and frictionless (3 fields max)
- No aggressive upsell or marketing during auth
- Calm, confident, secure feeling
- Honest about product (not investment advice disclaimer)
- Nostalgic warmth reduces registration anxiety

INTERACTIONS:
- Tab toggle: smooth underline slide animation
- Input focus: amber border glow (150ms)
- Button hover: gentle lift + glow
- Submit: "Creating account..." loading state
- Error: shake animation (400ms)

REFERENCE VIBE:
Retro game save file creation meets modern auth UX with wabi-sabi simplicity
```

## Screen Purpose

**User Goal**: Create account or log in quickly without friction.

**Key User Actions**:
1. Choose Sign Up or Login mode
2. Enter credentials (email + password)
3. Submit form
4. Get authenticated and redirected

## Design Rationale

**Why this design works**:
- **Minimal fields**: Only email + password (no unnecessary data collection)
- **Tab toggle**: One screen for both sign up and login (less navigation)
- **Clear CTAs**: Large, obvious submit buttons
- **Inline validation**: Errors shown immediately, helpful not punishing
- **No distractions**: Focused on single task (auth)

## Form Validation Strategy

**Client-Side Validation** (immediate feedback):
- Email format: Standard regex check
- Password length: Min 8 characters
- Password match: Confirm field matches password
- Display errors on blur or submit attempt

**Server-Side Validation** (security):
- Email uniqueness check
- Password strength validation
- Rate limiting (prevent brute force)
- Return clear error messages

## Password Requirements

**Minimum Complexity** (MVP):
- Length: 8+ characters
- No other requirements initially (keep signup friction low)

**Future Enhancement**:
- 12+ characters recommended
- Mix of letters, numbers, symbols
- Strength meter (optional)

## Error Messages

**User-Friendly Language**:
- ❌ "Authentication failed"
- ✅ "Incorrect email or password"

- ❌ "User already exists"
- ✅ "Email already registered. [Login instead?]"

- ❌ "Invalid input"
- ✅ "Please enter a valid email address"

## Forgot Password Flow

**Link Click** → Modal or New Screen:
- "Reset Password" headline
- Email input field
- Submit button: "Send Reset Link"
- Success: "Check your email for reset instructions"
- Link expires in 1 hour

**Email Contents**:
- "Reset your Invest with Billionaires password"
- Pixel-art key icon (16x16)
- Link button: "Reset Password"
- Expires: 1 hour
- If not requested: "Ignore this email"

## Onboarding After Sign Up

**First-Time User Flow**:
1. Sign up successful → Welcome modal
2. "Welcome! Ready to copy your first portfolio?"
3. Optional: Quick tutorial (skip-able)
4. Redirect to Portfolio Browser

**Returning User**:
- Login → Redirect to last page or Dashboard
- "Welcome back!" notification (brief toast)

## Responsive Considerations

**Mobile (< 768px)**:
- Auth card: Full-width (with 16px margins)
- Inputs: Full-width
- Button: Full-width
- Font sizes: Slightly smaller (22px headline)

**Desktop (> 1024px)**:
- Auth card: Fixed width 440px, centered
- Generous white space around card

## Accessibility

- All inputs have visible labels (not placeholder-only)
- Error messages announced to screen readers
- Form keyboard navigable (Tab, Enter to submit)
- Focus indicators clear (amber outline)
- Password show/hide accessible via keyboard

## Security Considerations

**Best Practices**:
- HTTPS only (encrypt transmission)
- Password hashed with bcrypt (server-side)
- Rate limiting on login attempts (5 attempts → 15 min lockout)
- Email verification (optional for MVP, recommended for production)
- Session tokens with expiration
- No password hints or security questions (outdated)

## Component Mapping

Maps to Epic 1, Story 1.2: Firebase Authentication Integration

**Required API Endpoints**:
- `POST /api/auth/signup` (create account)
- `POST /api/auth/login` (authenticate)
- `POST /api/auth/forgot-password` (reset flow)
- `POST /api/auth/reset-password` (complete reset)

**Next Screens**:
- After signup: Portfolio Browser or Onboarding tutorial
- After login: Last viewed page or My Portfolios Dashboard
