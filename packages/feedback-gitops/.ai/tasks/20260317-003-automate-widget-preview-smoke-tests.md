# Task: Automate Widget Preview Smoke Tests

## Goal

Add coherent automated verification for the widget preview surfaces so sandbox and integration behavior can be validated without relying on manual browser checks.

The repo now has two explicit widget dev surfaces:

1. `Widget Sandbox`
2. `Widget Integration Harness`

This task exists to make those surfaces testable in a repeatable way.

## Why This Task Exists

The preview model is now structurally much better, but the remaining risk is runtime behavior:

- does the widget actually mount?
- do sandbox scenario controls actually change the widget state?
- does the integration harness open and load under valid conditions?
- do entrypoint regressions fail visibly?

Those are interaction/runtime concerns, not compile-time concerns.

Right now the repo can pass typecheck and build while still shipping a broken preview entrypoint.

That is not good enough for a widget with this much interaction logic.

## Problem Statement

The widget preview workflow currently depends on:

- manual browser inspection
- remembering which page to open
- noticing when the page only renders host copy and not the widget
- manually exercising scenario switches and launcher behavior

This makes regressions too easy to miss.

The repo needs a small but disciplined automated test layer that verifies the preview entrypoints themselves.

## Required Outcome

After this task:

- sandbox mounting is verified automatically
- sandbox scenario switching is verified automatically
- integration harness mounting is verified automatically in a backend-independent mocked mode
- a narrow real integration smoke path can be run separately when needed
- preview regressions fail in CI or local test runs before publishing

## Non-Negotiables

- Do not make all preview tests depend on the real local worker.
- Sandbox tests must remain deterministic.
- Integration entrypoint wiring must be testable without real backend availability.
- Real integration coverage, if added, must be separate from the default fast test path.
- Tests should target the actual browser surfaces, not internal Vue implementation details.

## What Must Change

1. Add browser-level smoke coverage

Introduce Playwright-based smoke tests for the widget preview entrypoints.

At minimum, cover:

- `widget/sandbox.html`
- `widget/integration.html`

These tests should validate runtime behavior from the browser’s perspective.

2. Add sandbox smoke tests

Create deterministic sandbox checks such as:

- page loads successfully
- `feedback-gitops-widget` is mounted
- launcher button is visible
- scenario controls are present
- clicking scenario controls changes the page state

At minimum, verify representative scenarios such as:

- `default`
- `empty`
- `comments`
- `error`
- `loading`

The point is not exhaustive UI testing.
The point is to catch broken preview wiring quickly.

3. Add mocked integration smoke tests

Create integration-harness tests that do not require the real worker.

Use request interception / route mocking so the browser can validate:

- integration page mounts
- launcher renders
- token-gated open flow works when token is seeded or mocked
- issue loading works against mocked responses

This verifies entrypoint and runtime wiring without coupling fast tests to backend availability.

4. Keep real integration checks separate

If a real integration smoke test is added, keep it separate from the default path.

For example:

- default tests: sandbox + mocked integration
- optional tests: real integration against local worker

Real integration should be a narrow happy-path verification, not the only coverage.

5. Use stable browser-facing selectors

Where needed, add or preserve stable selectors/ids for testing, such as:

- launcher button
- sandbox scenario controls
- widget root/custom element
- loading/error markers
- list rows / empty states

Do not build the tests around fragile implementation details.

6. Add a clear test-running workflow

Document how to run:

- fast preview smoke tests
- optional real integration smoke tests

The commands should be obvious enough that a developer can run them before publishing.

## Suggested Structure

A reasonable structure would be:

- `tests/widget-sandbox.spec.ts`
- `tests/widget-integration-mocked.spec.ts`
- `tests/widget-integration-real.spec.ts` (optional / non-default)
- Playwright config with explicit `webServer` setup for the widget dev surface

The exact structure may vary, but the split between deterministic fast tests and real integration checks should be explicit.

## Implementation Principles

- Test the browser surfaces, not Vue internals.
- Prefer route mocking for fast integration-entrypoint verification.
- Keep sandbox tests deterministic and fast.
- Avoid snapshot-heavy tests as the primary safety mechanism.
- Use assertions that explain why the preview is broken, not just that a screenshot changed.
- Make failures easy to map back to `sandbox` vs `integration`.

## Acceptance Criteria

- a developer can run automated smoke tests for widget preview surfaces locally
- sandbox smoke tests verify widget mount and scenario switching
- integration smoke tests verify harness mount without depending on the real backend
- preview regressions fail automatically when bootstrap wiring breaks
- the default automated path does not require a real worker or real admin token
- optional real integration verification, if present, is clearly separated from the default path
- docs/scripts make it clear which automated checks are fast/default versus real integration

## Deliverable

A lightweight but reliable automated browser test layer for the widget preview surfaces, so publishing does not depend on blind manual inspection of sandbox and integration entrypoints.
