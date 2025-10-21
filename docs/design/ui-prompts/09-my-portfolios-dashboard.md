# Screen 9: My Portfolios Dashboard

## AI UI Generation Prompt

```markdown
Create a minimalist portfolio management dashboard with sophisticated Gameboy aesthetics and clear portfolio overview.

DESIGN SYSTEM:
- Primary: #9BBC0F (sage green)
- Accent: #FFB30F (warm amber)
- Background: #F7F3E9 (cream paper texture)
- Typography: Berkeley Mono (all text), IBM Plex Mono (numbers - LED style)
- Conservative pixel art with hand-drawn authenticity

LAYOUT:
- Header: "My Portfolios" title + ONE primary action (Create New)
- Grid of saved portfolio cards (2-3 columns desktop, 1 column mobile)
- Empty state (if no portfolios)
- Generous spacing between cards

HEADER SECTION:
- Title: "MY PORTFOLIOS" (Berkeley Mono, 32px, bold)
- ONE button: "Create New Portfolio" (sage green, top-right)
- Small pixel-art folder icon (16x16) next to title

PORTFOLIO CARD DESIGN:
- Soft rounded rectangle, hand-drawn border
- Light background (#F0ECE3)
- Padding: 20-24px
- Hover: Gentle lift (4px) + shadow deepen

Each card contains:
1. **Portfolio Name** (user-defined)
   - Berkeley Mono, 18-20px, bold
   - Editable (click to rename, inline edit)

2. **Source Investor** (small pixel-art portrait + name)
   - "Based on Warren Buffett Q3 2024"
   - 16x16 pixel-art portrait
   - Muted text, smaller font (14px)

3. **Key Metrics** (LED-style numbers):
   - Holdings count: "18 positions" (IBM Plex Mono)
   - Last modified: "2 days ago" (Berkeley Mono, muted)
   - If executed: Current value "$10,234.56" (LED glow, sage green)
   - If executed: Total return "+2.35%" (color-coded: green=gains, red=losses)

4. **Status Badge** (if executed):
   - Small pill badge: "ACTIVE" (sage green background, cream text)
   - Or: "PAPER TRADING" (amber background)
   - Pixel-art icon (8x8): checkmark or test tube

5. **Actions** (icon buttons, bottom of card):
   - Edit (pixel-art pencil icon, 16x16) → Portfolio Editor
   - Execute (pixel-art rocket icon, 16x16) → Execution Preview
   - Performance (pixel-art chart icon, 16x16) → Performance Dashboard
   - More (pixel-art ⋮ menu, 16x16) → Dropdown: Duplicate, Delete

CARD STATES:
- **Draft** (not executed): Muted colors, "Ready to execute" text
- **Active** (executed): Full colors, live metrics displayed
- **Paper Trading**: Amber accent, test tube icon
- **Hover**: Lift + shadow, action icons more prominent

ACTIONS MENU (Dropdown from ⋮):
- Duplicate Portfolio (create copy for variation)
- Rename Portfolio (inline edit or modal)
- Delete Portfolio (confirmation modal, destructive)

EMPTY STATE (No Portfolios Yet):
- Large pixel-art empty folder icon (48x48)
- Headline: "No portfolios yet"
- Subtext: "Copy an institutional portfolio to get started"
- CTA button: "Browse Investors" (sage green)
- Friendly, inviting tone

SORTING/FILTERING (Optional, below header):
- Simple pills: [All] [Active] [Drafts] [Paper Trading]
- Selected state: sage green background
- Sort dropdown: "Last Modified" | "Name" | "Performance"

SUMMARY METRICS (Top of page, optional):
- Total portfolios: "5 portfolios"
- Active portfolios: "3 active" (sage green)
- Total value (if executed): "$47,123.89" (LED-style, large)
- Aggregate return: "+5.67%" (color-coded)

ATMOSPHERE:
- Organized, calm, empowering
- Retro file management aesthetic (like game save files)
- Each portfolio feels like a unique "save slot"
- Clear actions, no confusion about next steps
- Nostalgic warmth invites exploration

INTERACTIONS:
- Card hover: gentle lift, actions fade in
- Edit name: inline editing (double-click or icon click)
- Delete: confirmation modal ("Are you sure? This can't be undone")
- Duplicate: instant copy with "[Name] Copy" label
- Smooth transitions between views

REFERENCE VIBE:
Retro game save file manager meets modern portfolio dashboard with wabi-sabi organization
```

## Screen Purpose

**User Goal**: View all saved portfolios, access editing/execution/performance, manage portfolio list.

**Key User Actions**:
1. View all saved portfolios at a glance
2. Click card to view performance or edit
3. Execute portfolio (if not yet executed)
4. Create new portfolio (browse investors)
5. Manage portfolios (rename, duplicate, delete)

## Design Rationale

**Why this design works**:
- **Card grid**: Scannable overview of all portfolios
- **Save file aesthetic**: Retro gaming metaphor familiar and comforting
- **Clear status**: Draft vs. Active vs. Paper Trading immediately visible
- **Multiple actions**: Edit, Execute, Performance accessible per card
- **Empty state**: Invites action when no portfolios exist
- **One CTA**: "Create New Portfolio" primary action

## Card Information Hierarchy

**Priority 1: Portfolio Name**
- User-defined, prominent, memorable

**Priority 2: Status & Metrics**
- Active portfolios show current value + return (most important data)
- Draft portfolios show "Ready to execute"

**Priority 3: Source Context**
- Which institutional investor this is based on
- Pixel-art portrait provides visual anchor

**Priority 4: Actions**
- Icon buttons for common tasks
- More menu for secondary actions

## Empty State Strategy

**First-Time User**:
- Large friendly icon (48x48 pixel-art folder)
- Encouraging message: "Copy your first portfolio!"
- Clear CTA: "Browse Investors"
- No intimidation or pressure

**Returning User (All Deleted)**:
- Similar empty state
- "Create a new portfolio or browse investors"

## Actions & Interactions

**Edit Portfolio**:
- Click pencil icon → Portfolio Editor
- Preserves current allocations for editing

**Execute Portfolio**:
- Click rocket icon → Execution Preview
- Only available if not already executed
- Disabled if Alpaca not connected (with tooltip)

**View Performance**:
- Click chart icon → Performance Dashboard
- Only available if portfolio executed
- Disabled for draft portfolios

**Duplicate Portfolio**:
- Creates instant copy with "[Name] Copy" label
- Opens Portfolio Editor for new copy
- Useful for A/B testing allocation strategies

**Delete Portfolio**:
- Confirmation modal: "Delete '[Portfolio Name]'? This can't be undone."
- Two buttons: "Cancel" | "Delete" (destructive)
- If active portfolio with real money: Extra warning

## Status Badges

**Active** (executed with real money):
- Sage green (#9BBC0F) pill badge
- Pixel-art checkmark (8x8)
- Indicates live portfolio

**Paper Trading** (executed with simulated money):
- Amber (#FFB30F) pill badge
- Pixel-art test tube (8x8)
- Indicates practice mode

**Draft** (not executed):
- No badge (or subtle gray "Draft" text)
- Muted visual treatment

## Sorting & Filtering

**Sort Options**:
- Last Modified (default): Recently edited first
- Name: Alphabetical
- Performance: Best performing first (if executed)

**Filter Options**:
- All (default)
- Active: Only executed portfolios
- Drafts: Only unexecuted portfolios
- Paper Trading: Only paper trading portfolios

**UI Treatment**:
- Simple pill buttons (not complex dropdown)
- Selected state: Sage green background
- Smooth transitions when filtering

## Summary Metrics (Optional)

**At-a-Glance Stats** (top of page):
- Total portfolios count
- Active portfolios count
- Aggregate value (if executed)
- Aggregate return (weighted average)

**Visual Treatment**:
- Horizontal row of metric cards
- LED-style numbers for values
- Pixel-art icons (16x16) per metric

## Responsive Considerations

**Mobile (< 768px)**:
- Single column card layout
- Larger tap targets for actions
- Edit name: Modal instead of inline
- More menu: Full-screen drawer

**Tablet (768px - 1024px)**:
- 2-column card grid
- Maintain generous spacing

**Desktop (> 1024px)**:
- 3-column card grid
- Max-width 1400px centered
- Hover states prominent

## Accessibility

- Card keyboard navigable (Tab, Enter to open)
- Action buttons have aria-labels ("Edit portfolio: My Buffett Strategy")
- Delete confirmation modal keyboard accessible (ESC to cancel)
- Status badges have accessible labels
- Focus indicators visible (sage green outline)

## Empty vs. Populated States

**0 Portfolios**:
- Empty state with CTA
- No summary metrics shown

**1-3 Portfolios**:
- Show all cards
- Summary metrics optional

**4+ Portfolios**:
- Show all cards (scrollable)
- Summary metrics helpful
- Consider pagination (12 per page) if many portfolios

## Component Mapping

Maps to Epic 2, Story 2.10: My Portfolios Dashboard

**Required Data**:
- User's saved portfolios (all)
- Portfolio metadata (name, source investor, last modified)
- Execution status (draft vs. active)
- Performance metrics (if executed)

**API Endpoints**:
- `GET /api/user-portfolios` (fetch all user portfolios)
- `PATCH /api/user-portfolios/:id` (rename)
- `POST /api/user-portfolios/:id/duplicate` (duplicate)
- `DELETE /api/user-portfolios/:id` (delete with confirmation)

**Next Screens**:
- Create New → Portfolio Browser
- Edit → Portfolio Editor
- Execute → Execution Preview
- Performance → Performance Dashboard
