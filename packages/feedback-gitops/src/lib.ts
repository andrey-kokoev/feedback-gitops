/**
 * feedback-gitops public library API.
 *
 * Consumer: wire createIssueConsumer into your Worker's queue handler.
 * Widget:   widget.js is served as a static asset via the ASSETS binding.
 */

export { createIssueConsumer } from "./consumer";
export type {
  TextFeedbackInput,
  AudioFeedbackInput,
  FeedbackSubmission,
  ConsumerConfig,
} from "./consumer";

export { default as worker } from "./worker/index";
