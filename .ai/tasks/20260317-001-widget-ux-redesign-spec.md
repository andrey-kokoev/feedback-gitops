# Task: Redesign Widget UX Toward Apollo-Level Interaction Quality

## Goal

Redesign the feedback widget so it feels like a premium, high-clarity capture-and-track tool with Apollo-level interaction quality.

This is not a task to expand the product into multiple workflows.

This is a task to execute the existing product shape much better.

## Non-Negotiables

These are hard constraints.

- The widget remains one generic capture-and-track product.
- Mode is a frontend wording preference only.
- Mode must not change layout, action set, feed grouping, workflow, backend behavior, or item model.
- Top-level surfaces remain `Compose`, `Activity`, and `Settings`.
- The product remains capture-first.
- The launcher button remains visible regardless of token state.
- Clicking the launcher without an admin token must prompt for the admin token before the panel opens.
- The panel must not open until an admin token is present.
- Activity remains a uniform feed rather than a split-by-type or split-by-mode experience.
- The item card remains part of the product.
- Mobile semantic swipes remain part of the product.
- Desktop must have explicit non-swipe interaction paths.
- Back behavior must be stack-based and eventually exit the widget into the host app.

## Definitions

These terms are used precisely in this task.

- `Mode`: A frontend copy lens only. It changes wording such as placeholders, helper text, empty-state text, and similar copy. It does not change information architecture, interaction model, or item semantics.
- `Comment`: Add a new comment to an existing item. This is not an edit of the original item content.
- `Create linked item`: Create a new item that references an existing source item. The new item is distinct from the original item. It should carry an explicit backlink or source reference to the original item.
- `Acted-on item`: An item that has already received meaningful downstream activity from someone or something else, such as comments or execution-related progress.
- `Viewed`: The user has opened the item card for that item. Opening the item card marks the item viewed.
- `Unread`: Derived state meaning the item has new activity after the user’s last viewed timestamp for that item.
- `Activity`: Any event that GitHub would count as issue activity for the item. Unread and feed freshness should derive from that activity model.
- `Item card`: The secondary item view opened from an Activity row on mobile tap or desktop click.

## Product Thesis

The widget should be a universal capture-and-track tool.

It should not feel like:

- a personal scratchpad
- a branching multi-mode product
- a backend control panel
- a technical workflow surfaced directly to the user

It should feel like:

- a fast capture surface
- a dense, operational activity feed
- a configurable but quiet overlay on top of a host app
- a premium mobile-first interaction model with strong desktop parity

For this task, “Apollo-level” specifically means:

- dense, highly scannable list rows
- semantic swipe actions with clear preview and commit behavior
- strong information hierarchy
- restrained chrome and quiet visuals
- high interaction quality without adding unnecessary workflow complexity

It does not mean copying Apollo literally or introducing unrelated Reddit-style concepts.

## Technical Scope And Runtime Contract

These are execution constraints, not optional suggestions.

- Delivery format is a single self-contained `<script>` tag build.
- Runtime target is a Web Component custom element.
- Client-side-only rendering/hydration is acceptable; SSR is not required.
- Browser target is evergreen browsers only.
- The widget should use Shadow DOM with CSS variables inherited from the host for theming.
- The widget should support host-provided identity when available.
- The widget should expose a programmatic method equivalent to `openItem(id)` for host-driven deep linking.
- The widget should dispatch host-facing events for meaningful actions.
- Event payloads should use `item id + action type`, not full item objects.
- Exiting the widget into the host app means hiding/closing the widget overlay rather than navigating the host page.
- Fixed high z-index is sufficient; the widget does not need to dynamically out-rank arbitrary host modals.

## Data And Persistence Contract

- Use existing backend APIs if they already exist.
- If the needed interface layer does not exist, design the storage/interface layer as part of this task.
- The widget should rely on the admin token model already used by the product rather than introducing anonymous capture.
- If account identity exists in the host, it may inform persistence scope, but panel access still depends on admin token presence.
- If account identity does not exist, fall back to client-side persistence for local preferences only.
- Client-side persistence fallback should use IndexedDB as primary with localStorage fallback.
- Read/viewed state is private and must not be exposed as read receipts to item creators.
- Swipe usage and similar UX telemetry may be collected for product analysis.

Minimum item shape should remain generic and implementation-friendly. At minimum, support:

- `id`
- `content`
- `state`
- `createdAt`
- `updatedAt`
- `latestActivityAt`
- `commentCount`
- `pinned`
- `viewedAt` or equivalent viewed-state derivation
- source/linked-item reference metadata where applicable

Text scope for MVP:

- items are text-only
- comments are text-only
- attachments are not part of MVP
- comments are flat, not threaded
- linked-item relationships are generic source/related links, not typed graph relationships

Reasonable hard limits:

- item content: about `5000` characters
- comment content: about `2000` characters

## Core Clarifications

The following direction has already been clarified and should be treated as product intent.

### 1. Mode is low-importance

Mode exists only as a frontend wording preference.

It should:

- live in Settings
- stay mostly invisible during normal use
- change wording only

It should not:

- change backend behavior
- change item model
- create visible item types in Activity
- create separate workflows
- become a major visible state in the main UI
- change layout or interaction patterns

Initial modes are fixed for MVP:

- `Personal todos`
- `Technical issue`
- `Feature/change request`

These initial modes are sufficient for MVP, but the architecture should tolerate adding more predefined modes later.

Default first-use mode:

- `Technical issue`

Changing mode should update wording immediately, but should not alter the user’s draft text.

### 2. Product hierarchy is capture-first

The widget’s main value is capture.

Activity exists for observation and quick actions.

Settings remains a top-level surface because it is an important control surface, not because it is equal to Compose in product value.

Top-level surfaces remain:

- `Compose`
- `Activity`
- `Settings`

Behavioral rules:

- clicking the launcher with a valid admin token opens the widget and restores the last-used top-level surface
- clicking the launcher without an admin token prompts for the token and only opens the widget after a token is set
- after submit, default flow returns the user to Compose
- unresolved items are the default Activity filter
- Activity filters should persist across reloads
- Compose drafts should persist if the widget closes while text exists

### 3. Compose stays minimal

Compose should be:

- single-field
- fast
- one-shot
- optimized for concise requests

Compose should not become:

- a multi-field intake form
- a structured drafting workflow
- a richer editor because Activity is dense

Compose reuse rules:

Use the same core compose surface for:

- new item creation
- comment creation on an existing item
- linked-item creation from an existing item

When used for follow-on actions, compose should open as a sheet-style overlay over Activity context.

Compose interaction rules:

- button submit and Cmd/Ctrl+Enter should both work
- desktop may auto-focus Compose on open
- mobile should not aggressively auto-focus on open
- show a character counter only when nearing the limit

Mode-specific placeholders are required, but final copy can remain TBD pending UX writing review.

### 4. Activity is one uniform feed

Activity should be one uniform feed without visible type distinctions.

It should be:

- state-first
- dense
- operational
- Apollo-like in scanability

Visual priority in each row:

1. latest state/change
2. time
3. original text summary

Items should not visually split into personal vs system-tracked categories.

Operational defaults:

- unresolved and all are the primary Activity filter options for MVP
- unresolved is the default filter
- pinned items should appear in a separate pinned section above the rest of unresolved items
- Activity is browse-first for MVP; no full-text search/filter is required
- relative time should appear in the row
- absolute time may appear on hover/tap
- initial fetch should show skeleton rows rather than a spinner-only loading state
- if fetch fails, show stale cached data if available, otherwise show an error state
- mobile should support pull-to-refresh
- feed updates may use polling rather than realtime subscriptions
- polling every `30s` is acceptable
- page size / fetch batch size should default to `50`
- pagination/infinite loading is preferred over unbounded rendering

### 5. Secondary item card exists and matters

The item card remains part of the product.

It should:

- open on mobile tap
- open on desktop row click
- be action-first
- also show full content
- be the primary place to edit existing items before they have been acted on

Editing rules:

- editing should not be a default swipe action
- editing should be available only before an item has been acted on
- editing should be backend-enforced, not just hidden in the UI

Desktop row behavior:

- the row itself shows visible status only by default
- actions are hidden behind a dots menu and item-card open behavior
- the dots menu sits on the right edge of the row
- keyboard row navigation should be supported on desktop
- desktop keyboard shortcuts should be fixed rather than user-configurable

### 6. Mobile swipe grammar is a core interaction pattern

Semantic swipes are part of the core interaction model.

They should be:

- immediate
- semantic
- previewed during gesture
- configurable in Settings

Swipes should map to a fixed built-in action library rather than arbitrary user-defined actions.

## Requirement Levels

Interpretation rules for this task:

- `Must`: hard requirement
- `Should`: preferred default or recommended implementation unless there is a strong reason otherwise
- `May`: optional enhancement

If this task uses concrete defaults such as visual placement or ordering, treat them as `should` unless they are repeated in `Non-Negotiables`, `Definitions`, or `Acceptance Criteria`.

## Required Outcome

After this task:

- the widget interaction model reflects the clarified product intent above
- Compose, Activity, Settings, and the item card each have a clear role
- mobile swipe actions are coherent, configurable, and Apollo-like
- desktop has explicit non-swipe interaction paths
- the widget preserves a stack-based back model that exits to the host app cleanly
- Activity supports persisted unread state derived from item activity
- the redesign remains one generic product rather than splitting by mode

## What Must Change

1. Redesign top-level information architecture

Keep the three top-level surfaces:

- `Compose`
- `Activity`
- `Settings`

Rules:

- clicking the launcher with a valid admin token opens the widget and restores the last-used top-level surface
- clicking the launcher without an admin token prompts for the token and only opens the widget after a token is set
- top-level state is persistent
- transient overlays do not replace top-level state

2. Implement a stack-based back/close model

The widget overlays a host app and must preserve a coherent escape path.

Back behavior must be stack-based:

- first closes the topmost widget layer
- then closes the next widget layer
- finally exits the widget into the host app

Transient layers include:

- item card
- comment sheet
- linked-item sheet
- action picker
- future secondary sheets

At the top-level surface with no open inner layer, back exits the widget.

Browser back behavior should pop one widget layer rather than immediately leaving the widget.

3. Redesign Compose as a single-field premium capture surface

Compose must:

- use one primary freeform input
- optimize for concise requests
- feel fast and low-friction
- vary primarily through mode-driven placeholder/copy

Mode indication should remain subtle.

The primary visible mode cue in normal use should be placeholder/copy rather than overt labeling.

Do not expand Compose into a structured multi-field editor.

4. Reuse Compose for follow-on workflows

The same compose surface must power:

- new item creation
- commenting on existing items
- creating linked items from existing items

Comment / linked-item compose behavior should:

- open in a sheet-style overlay
- preserve Activity context underneath
- use a partial-height sheet rather than a full-screen takeover
- trap focus correctly for keyboard users
- for comments, show only minimal source context above the composer
- use a muted one-line quote rather than a summary card or full source preview
- render source context as plain text only

For acted-on items, the follow-on action should be named `Comment`, not `Update`.

5. Redesign Activity as a dense state-first feed

Activity should be optimized for:

- latest state/change visibility
- fast scanning
- quick actions
- compact information density

Each row should be a dense operational unit rather than a large card.

Row hierarchy should emphasize:

- latest state/change
- comment count when non-zero
- unread indicator
- time
- original text summary

The original text summary should remain visible even when comments exist.

Pinned items should float above other unresolved items in a dedicated section.

Activity should support:

- keyboard navigation
- row enter/open on keyboard
- fixed desktop keyboard shortcuts for core row actions

6. Add reliable unread tracking

Unread state should not be ephemeral.

Implement persisted per-item viewed state so unread can be derived reliably across reloads and devices.

Unread should be based on any new item activity since last view, not only comments.

Persistence owner:

- read/viewed state must be tied to the user identity used by the widget experience, not just transient in-memory UI state
- if the product has account-level identity, use per-account persistence
- unread should derive from the same issue-activity model GitHub uses for issue activity
- if it does not, document the fallback persistence scope explicitly

Rules:

- opening the item card marks the item viewed
- unread marker should be subtle
- use a small dot near the latest-state line
- comment count should sit on the same line as state/unread
- manual `Mark viewed` should mark an item viewed without opening the card

`Mark viewed` should be a built-in action in the action library, but not part of the default mobile mapping.

7. Keep one uniform Activity feed

Do not visually distinguish item types in the feed.

The feed must not explicitly telegraph:

- personal vs system-tracked items
- mode
- backend/system classifications

Mode remains a wording preference, not an Activity grouping system.

8. Define desktop interaction clearly

Desktop should not depend on swipe.

Desktop rules:

- clicking a row opens the item card
- row itself shows visible status only by default
- extra actions live behind a dots menu at the right edge of the row
- desktop dots menu should include the same semantic actions available conceptually from swipe
- desktop dots menu should include `Mark viewed`
- desktop dots menu should include `Edit` only for items that have not yet been acted on
- `Mark viewed` should appear below the four main actions in that menu
- keyboard shortcuts should provide non-swipe access to the same core action set

9. Define mobile swipe grammar and configurability

Use a fixed built-in action library:

- `Done / Archive`
- `Pin / Unpin`
- `Comment`
- `Create linked item`
- `Mark viewed`

Default mapping:

- short swipe left -> `Done / Archive`
- short swipe right -> `Pin / Unpin`
- long swipe left -> `Create linked item`
- long swipe right -> `Comment`

Additional rules:

- `Mark viewed` stays available in the built-in library
- users may customize mappings globally in Settings
- mappings are global, not mode-specific
- duplicate action mappings are allowed
- a slot may represent an inverse pair like `Pin / Unpin` as one assignable action
- some gesture slots may be left unassigned
- row swipe should preview the mapped action before commit
- an incomplete swipe should preview then snap back
- swipe is touch-first and does not need mouse-drag parity on desktop
- use distance thresholds rather than velocity-based commit behavior
- use sensible fixed gesture defaults, around `80px` for short and `160px` for long
- stop propagation as needed so host horizontal gestures do not interfere
- respect `prefers-reduced-motion`
- support haptic feedback on devices that support it

10. Keep the item card action-first

The item card must:

- prioritize actions over reading
- show full content
- be the primary place for editing existing items before they have been acted on
- use generic action labels rather than mode-shaped action labels

Edit behavior:

- edit should live as a secondary action behind a menu
- edit should not be a primary swipe action
- edit is not offered for acted-on items

Item-card layout rules:

- show state first, then compact metadata
- show comments newest-first
- auto-scroll smoothly to the newest comment when opening the card
- emphasize the newest comment visually
- after 5 or more total comments, older comments beyond the newest one should collapse into a summary
- expanding older comments may reveal all remaining comments at once
- once comments exist, original item content can collapse
- when collapsed, original content should not retain a compact preview above comments
- item card should include an explicit `Source` section for linked-item source references

The primary CTA for acted-on items in the card should be `Comment`.

11. Define action semantics and failure handling

Action semantics:

- `Archive` is the removal mechanism; permanent delete is not part of MVP
- archive should be reversible
- linked-item creation should create a distinct new item with a source reference to the originating item
- linked-item relationships are bidirectional at the UX level

Undo behavior:

- show a brief undo affordance after swipe actions
- undo applies only to the most recent action
- `5s` is an acceptable default undo window

Failure handling:

- optimistic UI updates are allowed and preferred for row actions
- if a swipe action fails, show error feedback rather than failing silently
- inline/banner style feedback is preferred over modal dialogs
- use finite retry attempts rather than endless retries
- if host code calls `openItem` with an invalid id, open Activity and show an error
- if an action target becomes stale or invalid, fail visibly and refresh item/feed state

12. Make Settings a real control surface

Settings remains a top-level surface and should include, in order:

1. `Mode`
2. `Swipe Actions`
3. `Gesture Reference`
4. remaining preferences

Mode:

- first control in Settings
- changes wording only

Swipe Actions:

- first-class configuration section
- users map gesture slots from the fixed built-in action library
- include reset-to-defaults affordance

Gesture Reference:

- visibly shows current gesture mappings
- makes hidden gestures legible
- includes tap behavior if useful

Other settings / constraints:

- theme should inherit from the host rather than introducing a separate widget theme mode
- safe-area insets must be respected on mobile
- dark/light behavior should follow host/theme context rather than a separate manual widget toggle

## Current Intended Interaction Model

### Top-Level

- `Compose`
- `Activity`
- `Settings`

### Item Entry Points

- mobile row tap -> open item card
- desktop row click -> open item card
- desktop dots menu -> quick actions
- mobile swipes -> semantic quick actions

### Item Card

- action-first
- full content visible
- primary editing surface for existing items before they have been acted on
- acted-on item primary CTA: `Comment`

### Compose Reuse

- new item
- comment on item
- create linked item

### Swipe Library

Built-in library:

- `Done / Archive`
- `Pin / Unpin`
- `Comment`
- `Create linked item`
- `Mark viewed`

Default mappings:

- short left -> `Done / Archive`
- short right -> `Pin / Unpin`
- long left -> `Create linked item`
- long right -> `Comment`

### Unread

- persisted per-item last-viewed state
- derived from any new activity since last view
- opening item card marks viewed
- subtle dot near state line

## Accessibility And UX Compliance

- target WCAG 2.1 AA
- provide non-swipe alternatives for swipe actions
- trap focus in sheets and overlays
- support keyboard navigation for desktop Activity usage
- respect reduced-motion preferences
- do not rely on sound feedback

## Acceptance Criteria

- widget remains one generic capture-and-track product
- mode is quiet and only changes wording
- mode does not change layout, action set, feed grouping, workflow, backend behavior, or item model
- top-level surfaces remain `Compose`, `Activity`, `Settings`
- launcher button remains visible regardless of token state
- clicking the launcher without a token prompts for token entry first
- panel does not open until an admin token is present
- widget restores last-used top-level surface after successful open
- after submit, default flow returns to Compose
- unresolved remains the default Activity filter
- Activity filter persists across reloads
- Compose draft persists when the widget is closed with unsent text
- Activity is one uniform feed without visible type distinctions
- Activity rows prioritize latest state/change over text content
- desktop row click opens item card
- desktop row actions are hidden behind a dots menu
- desktop has keyboard navigation and non-swipe alternatives for row actions
- mobile swipe mappings support short/long left/right semantics
- mobile swipe preview is visible during gesture and snaps back if not committed
- built-in action library contains `Done / Archive`, `Pin / Unpin`, `Comment`, `Create linked item`, `Mark viewed`
- default swipe mapping matches the clarified mapping above
- `Mark viewed` is available but not default-mapped on mobile
- per-item viewed state is persisted and unread is derived from GitHub-style issue activity
- opening item card marks item viewed
- item card is action-first and primary editing surface for existing items before they have been acted on
- acted-on items use `Comment` as the primary follow-on CTA
- `Edit` is not offered for acted-on items
- Compose is reused for new items, comments, and linked items via sheet overlays
- `Create linked item` creates a distinct new item with a source reference to the originating item
- linked items expose explicit source/reference context in the item card
- archive is reversible
- swipe actions support a brief undo window
- Settings contains Mode first, Swipe Actions second, Gesture Reference third
- the widget is delivered as a self-contained script-built Web Component
- back behavior is stack-based and eventually exits the widget into the host app
- accessibility target is WCAG 2.1 AA

## Deliverable

A concrete widget UX redesign that preserves the current product shape, dramatically improves interaction quality, and brings the overlay closer to Apollo-level scanability, gesture semantics, and operational polish without turning mode into a primary organizing concept.
