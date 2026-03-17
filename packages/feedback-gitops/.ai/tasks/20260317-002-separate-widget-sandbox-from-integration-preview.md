# Task: Separate Widget UX Sandbox From Backend Integration Preview

## Goal

Fix the current structurally confused widget preview model.

The widget should have:

1. a true UX sandbox for interaction and visual validation
2. a separate integration harness for real backend/auth validation

These are different jobs and should no longer be conflated.

## Why This Task Exists

The current so-called widget preview is not actually a preview in the UX/design sense.

It is a live integration harness that depends on:

- a running backend
- real endpoint behavior
- admin token access

That makes basic UX validation nonsensical.

A developer trying to answer:

- does the widget load?
- do gestures feel right?
- does the feed density work?
- does the item card feel correct?
- does the back stack behave well?

is first forced to solve:

- worker availability
- token validity
- backend auth configuration
- API correctness

That is the wrong dependency order.

The product is interaction-heavy enough that it needs a fast, deterministic, backend-independent UX loop.

## Problem Statement

The codebase currently mixes three concerns into one dev surface:

- widget UI preview
- backend integration
- auth enforcement

This causes the current preview to behave like a thin end-to-end client rather than a real widget sandbox.

As a result:

- UX work is blocked by backend concerns
- interaction testing is slower than it should be
- preview semantics are misleading
- design iteration is structurally discouraged

## Required Outcome

After this task:

- the widget can be run in a true local sandbox with no backend and no admin token
- the widget can still be run against the real local backend in a separate integration mode
- the core widget UI can render from mock data and mock actions
- backend coupling is isolated behind explicit adapter/service boundaries
- developers can validate UX without needing live auth or worker behavior
- integration testing remains available, but is no longer mislabeled as the only “preview”

## Non-Negotiables

- The sandbox must not require a running worker.
- The sandbox must not require an admin token.
- The integration harness must remain available.
- The widget UI must be able to run against both a real adapter and a mock adapter.
- Core widget components must not be tightly bound to `x-admin-token`, worker route construction, or raw backend fetch behavior.

## What Must Change

1. Create two explicit dev surfaces

Create two separate runnable entry points:

- `widget sandbox`
- `widget integration`

The sandbox is for:

- UX review
- interaction testing
- visual polish
- state-specific debugging

The integration surface is for:

- real backend testing
- auth validation
- payload validation
- end-to-end behavior

Do not keep one overloaded “preview” that tries to do both jobs.

2. Introduce an explicit adapter boundary

Create a widget-facing adapter/service interface that owns:

- issue loading
- create item
- comment on item
- create linked item
- execute item actions
- mark viewed persistence
- auth/token access
- host event dispatch

The UI should depend on this interface rather than directly coupling components to backend fetch/token logic.

At minimum, support:

- `real adapter`
- `mock adapter`

3. Create a mock adapter for sandbox use

The mock adapter should:

- require no auth
- use deterministic in-memory or fixture-backed data
- simulate item actions
- simulate read/unread state
- support fake latency when useful
- support forced error states when useful

The mock adapter should be able to demonstrate the widget’s major flows without a worker.

4. Define canonical sandbox scenarios

The sandbox should expose stable fixture states such as:

- empty feed
- unresolved feed
- pinned items
- unread items
- acted-on item with comments
- item with 5+ comments and collapsed history
- linked item with source reference
- item in edit mode
- loading state
- action failure state

These states should be easy to switch between.

That can be done via:

- query params
- a simple scenario picker
- separate preview routes
- or another deterministic mechanism

5. Keep auth pluggable

Auth should not be hard-coded into the widget UI flow.

Create an auth/access boundary so:

- sandbox can behave as always-authorized
- integration can continue to require token-backed access

The widget’s UX should not directly depend on `promptToken()` semantics everywhere.

6. Keep host integration pluggable

Host-bridge behavior such as event dispatch or `openItem()` support should remain available in integration mode, but sandbox mode should not require a real host application.

The sandbox should provide a minimal fake host context where needed.

7. Rename and document the surfaces clearly

Stop calling the integration harness “preview” unless a true sandbox also exists.

Use names that reflect intent, for example:

- `sandbox`
- `integration`

Documentation and scripts should make it obvious which surface is for UX work and which is for real backend validation.

## Suggested Structure

A reasonable structure would be:

- `src/widget/core/`
  - shared types
  - interaction contracts
  - adapter interfaces

- `src/widget/adapters/real/`
  - real API adapter
  - real auth/token adapter
  - real persistence adapter
  - real host bridge

- `src/widget/adapters/mock/`
  - mock issue data
  - mock action handlers
  - mock persistence
  - mock host bridge

- `widget/sandbox.html`
- `widget/integration.html`

The exact folder layout may vary, but the separation of responsibilities should be explicit.

## Implementation Principles

- Presentational widget components should render from data and callbacks, not from backend assumptions.
- Mock-mode behavior should be deterministic enough for debugging and visual review.
- Integration-mode behavior should stay close to real production/local backend conditions.
- Do not duplicate the whole widget implementation for sandbox vs integration; share the core UI.
- Use adapter swapping rather than branching the product into two widget versions.

## Acceptance Criteria

- a developer can run a widget sandbox with no backend and no admin token
- a developer can separately run a widget integration harness against the real local worker
- the widget UI renders and behaves in sandbox mode using mock data/actions
- the major flows can be exercised in sandbox mode:
  - open widget
  - compose item
  - comment
  - create linked item
  - swipe actions
  - item card
  - edit mode
  - unread state
- the current backend-driven dev path remains available as a separate integration path
- the code structure makes backend/auth coupling explicit instead of burying it across UI components
- scripts/docs clearly distinguish sandbox from integration

## Deliverable

A widget development model with a real UX sandbox and a separate backend integration harness, so interaction design and end-to-end integration are both supported without being structurally conflated.
