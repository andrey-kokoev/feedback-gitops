interface TextFeedbackInput {
    type: "text";
    title: string;
    description: string;
}
interface AudioFeedbackInput {
    type: "audio";
    audioKey: string;
    mimeType?: string;
    durationMs?: number;
}
interface FeedbackSubmission {
    input: TextFeedbackInput | AudioFeedbackInput;
    url?: string;
    userAgent?: string;
    labels?: string[];
    mergePolicy?: 'auto_unblocked' | 'manual';
}
interface ConsumerConfig {
    github: {
        pat: string;
        owner: string;
        repo: string;
        labels: string[];
        baseBranch?: string;
    };
    audio: {
        bucket: R2Bucket;
        ai?: Ai;
    };
}
declare function createIssueConsumer<T>(config: ConsumerConfig): (batch: MessageBatch<T>) => Promise<void>;

/**
 * Generates the widget.js script content that gets injected into client pages.
 */
declare function generateWidgetScript(endpoint: string, defaultRepo: string, defaultLabels: string[]): string;

export { type AudioFeedbackInput, type ConsumerConfig, type FeedbackSubmission, type TextFeedbackInput, createIssueConsumer, generateWidgetScript };
