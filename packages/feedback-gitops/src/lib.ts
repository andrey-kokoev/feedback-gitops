/**
 * feedback-gitops public library API.
 *
 * Consumer: wire createIssueConsumer into your Worker's queue handler.
 * Widget:   call generateWidgetScript to serve the client-side widget JS.
 */

export { createIssueConsumer } from "./consumer";
export type {
  TextFeedbackInput,
  AudioFeedbackInput,
  FeedbackSubmission,
  ConsumerConfig,
} from "./consumer";

export { generateWidgetScript } from "./widget";

export { default as worker } from "./index";
