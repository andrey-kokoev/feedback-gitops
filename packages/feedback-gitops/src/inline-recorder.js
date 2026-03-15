export function generateInlineAudioRecorderSource() {
    return `
  function createInlineAudioRecorder() {
    let mediaRecorder = null;
    let stream = null;
    let chunks = [];
    let mimeType = '';

    function pickMimeType() {
      const candidates = [
        'audio/webm;codecs=opus',
        'audio/webm',
        'audio/mp4',
        '',
      ];
      for (const candidate of candidates) {
        if (!candidate) return '';
        if (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported(candidate)) {
          return candidate;
        }
      }
      return '';
    }

    async function ensureStream() {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Microphone recording is not supported in this browser.');
      }
      if (!stream || !stream.active) {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      }
      return stream;
    }

    async function ensureRecorder() {
      if (mediaRecorder && mediaRecorder.state !== 'inactive') return mediaRecorder;

      const nextStream = await ensureStream();
      mimeType = pickMimeType();
      mediaRecorder = mimeType
        ? new MediaRecorder(nextStream, { mimeType })
        : new MediaRecorder(nextStream);

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      return mediaRecorder;
    }

    async function flush() {
      if (!mediaRecorder || mediaRecorder.state === 'inactive') return;

      await new Promise((resolve) => {
        let settled = false;
        const finish = () => {
          if (settled) return;
          settled = true;
          resolve(undefined);
        };
        const handleData = () => finish();
        mediaRecorder.addEventListener('dataavailable', handleData, { once: true });
        try {
          mediaRecorder.requestData();
          window.setTimeout(finish, 250);
        } catch {
          finish();
        }
      });
    }

    async function start() {
      const recorder = await ensureRecorder();
      if (recorder.state === 'paused') {
        recorder.resume();
        return;
      }
      if (recorder.state === 'inactive') {
        recorder.start(1000);
      }
    }

    async function pause() {
      if (!mediaRecorder || mediaRecorder.state !== 'recording') return;
      await flush();
      mediaRecorder.pause();
    }

    async function exportRecording() {
      await flush();
      if (!chunks.length) return null;
      return new Blob(chunks, { type: mimeType || 'audio/webm' });
    }

    async function reset() {
      if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
      }
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      mediaRecorder = null;
      stream = null;
      chunks = [];
      mimeType = '';
    }

    function hasContent() {
      return chunks.length > 0;
    }

    return {
      start,
      pause,
      reset,
      exportRecording,
      hasContent,
    };
  }
`;
}
