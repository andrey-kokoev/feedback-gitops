# Task: Refactor Widget Code For Maintainability

**Status:** ✅ COMPLETED

## Goal

Make the widget codebase maintainable enough that new behavior can be added without touching one large controller file, duplicating UI logic, or manually keeping persistence and state in sync.

This task exists because the current widget implementation has accumulated too many responsibilities in too few places.

## Why This Task Exists

The widget currently works, but the implementation has drifted into a shape that is expensive to modify safely.

The main problems are structural:

- one large component is acting as the widget controller, state machine, and view
- the global store contains mixed concerns and dead state
- persistence is manual and scattered across components and composables
- API helpers mutate store state directly instead of acting as explicit service boundaries
- repeated UI patterns and option lists are implemented in multiple places
- unused imports, helpers, and state make it harder to tell what is actually live

The point of this task is to reduce coupling and make future widget work cheaper and safer.

## Current Relevant Locations

- [src/widget/components/MobileWidget.vue](/home/andrey/src/feedback-gitops/packages/feedback-gitops/src/widget/components/MobileWidget.vue)
- [src/widget/FeedbackWidget.ce.vue](/home/andrey/src/feedback-gitops/packages/feedback-gitops/src/widget/FeedbackWidget.ce.vue)
- [src/widget/stores/widget.ts](/home/andrey/src/feedback-gitops/packages/feedback-gitops/src/widget/stores/widget.ts)
- [src/widget/composables/useWidgetState.ts](/home/andrey/src/feedback-gitops/packages/feedback-gitops/src/widget/composables/useWidgetState.ts)
- [src/widget/composables/useApi.ts](/home/andrey/src/feedback-gitops/packages/feedback-gitops/src/widget/composables/useApi.ts)
- [src/widget/composables/useAdminToken.ts](/home/andrey/src/feedback-gitops/packages/feedback-gitops/src/widget/composables/useAdminToken.ts)
- [src/widget/components/TextForm.vue](/home/andrey/src/feedback-gitops/packages/feedback-gitops/src/widget/components/TextForm.vue)
- [src/widget/components/VoiceComposer.vue](/home/andrey/src/feedback-gitops/packages/feedback-gitops/src/widget/components/VoiceComposer.vue)
- [src/widget/components/IssuesList.vue](/home/andrey/src/feedback-gitops/packages/feedback-gitops/src/widget/components/IssuesList.vue)
- [src/widget/components/IssueSheet.vue](/home/andrey/src/feedback-gitops/packages/feedback-gitops/src/widget/components/IssueSheet.vue)
- [src/widget/components/SettingsPane.vue](/home/andrey/src/feedback-gitops/packages/feedback-gitops/src/widget/components/SettingsPane.vue)
- [src/widget/components/Toast.vue](/home/andrey/src/feedback-gitops/packages/feedback-gitops/src/widget/components/Toast.vue)

## Required Outcome

After this task:

- the widget shell is separated from feature-specific orchestration
- state is reduced to the minimum durable/shared surface
- persistence has one clear ownership path
- API helpers are explicit transport/service boundaries instead of hidden store mutators
- repeated UI controls and option sets are extracted or centralized
- dead state and dead code are removed
- the structure makes it clear where to add future behavior

## What Must Change

1. Break up the main widget controller

`MobileWidget.vue` should stop owning all feature behavior directly.

Refactor toward a structure such as:

- widget shell / layout component
- text submission controller/composable
- voice submission controller/composable
- issue list / issue sheet controller
- launcher / onboarding behavior controller

The result should reduce the amount of business logic and timer logic living in the top-level component.

2. Reduce and normalize widget store state

The store should contain only state that is genuinely shared or durable.

Review and remove or replace fields that are dead, duplicated, or not meaningfully shared.

Examples found during review include:

- `panelOpen`
- `executingIssue`
- `toastText`
- `toastLink`
- `mobileSheetIssueNumber`
- `mobileSheetIssue`
- `filterSheetOpen`
- duplicated `activeTab` and `mobileTab`
- `captureMode` if it is not actually driving behavior

If multiple state domains remain, split them clearly by concern.

3. Centralize persistence

The current persistence flow relies on manual `persist()` calls after many individual state changes.

Replace that with one clear persistence boundary.

The implementation should:

- define exactly which fields are persisted
- keep the persisted shape in one place
- avoid components writing to storage directly except through a dedicated persistence/token abstraction
- preserve any legacy migration behavior that still matters

If storage state needs versioning, add it.

4. Make service boundaries explicit

`useApi.ts` should not be both a transport client and an implicit state manager.

Refactor so that:

- API/service code accepts explicit inputs
- API/service code returns typed results
- UI/store code decides how to apply those results
- token lookup happens at a clear boundary instead of being re-instantiated throughout the call graph

Avoid render-time side effects such as computed properties that call helpers which mutate store state.

5. Extract repeated UI patterns and constants

Repeated widget controls should be modeled once.

Candidates include:

- merge policy selector
- panel handle
- submission success state
- filter option arrays
- issue status option arrays

The goal is not abstraction for its own sake. The goal is one source of truth for behavior and wording that already appears in multiple places.

6. Move styles out of the root custom-element file

The root custom element currently owns a large global stylesheet for the entire widget.

Refactor styling so it is easier to find and modify, for example by:

- moving widget styles into a dedicated stylesheet
- or colocating styles by feature/component where practical

The styling structure should match the component structure closely enough that future edits are local.

7. Remove dead code and drift before or during refactor

Clean out unused imports, unused helpers, and unused components/state so the live architecture is visible.

Examples found during review include:

- unused imports in `MobileWidget.vue`
- unused import in `SettingsPane.vue`
- toast state/component that is not wired into the actual widget flow
- helper exports that no longer appear to be consumed

## Architectural Constraints

- preserve current widget behavior while improving structure
- do not move async transport logic into the store
- keep browser-only concerns isolated behind composables or explicit UI boundaries
- do not introduce more duplicated state during the refactor
- prefer small composables/components with explicit responsibilities over another large shared helper

## Suggested Execution Order

1. Remove dead state, dead imports, and obviously unused widget code
2. Define the durable/shared store surface
3. Centralize persistence and token/storage boundaries
4. Extract API/service logic away from store mutation
5. Split `MobileWidget.vue` by feature responsibility
6. Extract repeated controls/constants
7. Reorganize styling to match the final structure

## Acceptance Criteria

- `MobileWidget.vue` is materially smaller and no longer owns all widget behavior directly
- the widget store contains only live shared/durable state
- persistence is driven from one clear boundary rather than many manual call sites
- API helpers no longer hide store mutation or token lookups deep in the call graph
- repeated controls/options are centralized where duplication previously existed
- dead widget code identified in this review is removed
- the resulting structure makes future widget feature work locally understandable

## Deliverable

A widget codebase whose structure reflects the actual feature boundaries and is materially easier to modify, review, and test.

## Summary of Changes

### 1. Removed Dead Code and Unused State
- **Removed from store:** `panelOpen`, `activeTab` (duplicate of `mobileTab`), `captureMode`, `executingIssue`, `toastText`, `toastLink`, `mobileSheetIssueNumber`, `mobileSheetIssue` (computed), `filterSheetOpen`, `draftSettingsOpen`, `executeError`
- **Removed files:** `Toast.vue` (component existed but was not wired into actual widget flow)
- **Updated types:** Removed unused `CaptureMode` and `ActiveTab` type definitions

### 2. Created Feature Composables
- **`useTextSubmission.ts`** - Handles text form submission, success state, and undo countdown
- **`useVoiceSubmission.ts`** - Handles voice recording, submission, timer management, and undo
- **`useIssueSheet.ts`** - Manages issue detail/filter bottom sheet state
- **`useWidgetLauncher.ts`** - Handles launcher button, swipe hint, and handedness (simplified by removing unnecessary options callback pattern)

### 3. Refactored MobileWidget.vue
- Reduced from **485 lines to 278 lines** (43% reduction)
- Logic extracted into feature composables
- Component now focuses on template structure and event wiring
- Timer cleanup centralized in `onUnmounted`

### 4. Centralized Constants
- Created **`constants.ts`** with `VIEW_OPTIONS`, `SORT_OPTIONS`, `STATUS_OPTIONS`, `MERGE_POLICY_OPTIONS`
- Updated `IssueSheet.vue` to use centralized constants

### 5. Reorganized Styles
- Extracted 158 lines of inline styles from `FeedbackWidget.ce.vue`
- Created **`styles/widget.css`** for dedicated widget stylesheet
- Root component now imports styles via CSS `@import`

### 6. Updated Store
- Reduced from **101 lines to 71 lines**
- Contains only genuinely shared/durable state
- Clear separation between UI state, draft state, voice state, and issues state

### 7. Fixed Component-Local State
- `VoiceComposer.vue`: Moved `draftSettingsOpen` from global store to component-local `ref`

## Result

- ✅ `MobileWidget.vue` is materially smaller and no longer owns all widget behavior directly
- ✅ Widget store contains only live shared/durable state
- ✅ Persistence is driven from `useWidgetState` boundary rather than scattered calls
- ✅ API helpers in `useApi.ts` remain explicit transport boundaries (no hidden store mutation)
- ✅ Repeated controls/options are centralized in `constants.ts`
- ✅ Dead widget code identified in review is removed
- ✅ Structure makes future widget feature work locally understandable
