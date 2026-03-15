# Task: Debug Audio Request Pipeline For `t391-patterns-app`

## Decision

For this repo, the correct debugging surface is not:

- "did an issue appear in GitHub?"

The correct debugging surface is:

- "which transformation stage produced or failed to produce its expected artifact?"

For the voice path, the intended stages are:

1. intake request accepted
2. audio blob stored
3. queue message consumed
4. audio transcribed
5. normalized request content derived
6. GitHub issue created

These stages are distinct even if some are currently implemented inside the same queue consumer.

## Why This Task Exists

The `t391` instance is now deployed as:

- `feedback-gitops-t391-patterns-app`

and the text path is operational.

What is not yet confirmed operational is the audio path:

- widget/audio request is accepted by `POST /api/issue`
- but an audio-derived GitHub issue has not yet been confirmed

The repo currently has enough live infrastructure to debug this properly:

- deployed worker
- queue
- audio R2 bucket
- Workers AI binding
- GitHub target repo

The next work should not add more architecture.

It should isolate the first failing audio stage.

## Goal

Make the audio request path operational for the `t391-patterns-app` instance, or identify the precise failing stage with explicit evidence.

## Required Outcome

After this task, one of these must be true:

1. audio requests reliably produce GitHub issues in `global-maxima/t391-patterns-app`

or

2. the repo contains explicit stage-level logging and findings that identify the first failing stage in the audio pipeline

This task is not complete if the only statement is:

- "audio submit returned success"

That only proves intake, not the pipeline.

## What Needs To Be Done

1. Trace one controlled audio request end-to-end

Use one known audio sample and one request only.

Do not keep generating blind production issues while debugging.

Track these exact artifacts:

- audio object key in R2
- queue event observed
- transcription text or transcription failure
- derived title/description
- GitHub issue creation result

2. Add explicit stage logs in the queue consumer

The audio path should emit logs at these boundaries:

- audio object fetch start / success
- whisper transcription start / success
- derived title result
- GitHub issue creation start / success

If a stage fails, the logs should make the failing stage obvious without inference.

3. Verify whether the failure is in transcription or issue creation

Text issue creation already works for `t391`.

Therefore, if audio fails, the likely surface is one of:

- R2 object retrieval
- Workers AI whisper invocation
- transcript normalization
- payload shape mismatch after normalization

Do not treat GitHub as the first suspect unless logs show the issue creation stage is reached.

4. Keep debugging at the transformation boundary

Avoid adding new public endpoints or new conceptual layers during this task.

This is a debugging and operational-completion task, not an architecture expansion task.

5. Fix the first failing stage only

Once the first failing stage is identified:

- patch that stage
- rerun one controlled audio request
- verify the next artifact appears

Repeat until the audio-derived issue appears in GitHub.

## Non-goals

- Do not redesign the whole queue architecture
- Do not split the worker into separate internal services in this task
- Do not add transcript review UX
- Do not introduce a full job-status product surface unless required to isolate the failure
- Do not keep the repeated smoke-test text issues as a debugging strategy

## Acceptance Criteria

- a single audio request against `feedback-gitops-t391-patterns-app` is traced end-to-end
- the first failing stage, if any, is explicitly identified from logs/artifacts
- if patched successfully, a new GitHub issue appears in `global-maxima/t391-patterns-app` from audio input
- queue-consumer logs are explicit enough that future agents do not need to debug by guesswork

## Guidance For The Agent

Use this debugging order:

1. intake accepted
2. audio stored
3. queue consumer ran
4. whisper produced text
5. title/description were derived
6. GitHub issue was created

Do not skip ahead to GitHub if an earlier artifact is missing.

The debugging principle is:

- find the first missing artifact
- fix the boundary that should have produced it

not:

- inspect the last visible symptom and guess backward

## Deliverable

A repo state and operational note where the `t391` audio path is either:

- confirmed working end-to-end

or

- reduced to one precise failing stage with explicit evidence and instrumentation.
