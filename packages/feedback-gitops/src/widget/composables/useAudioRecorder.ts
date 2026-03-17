import { ref } from 'vue'

export function useAudioRecorder() {
  let mediaRecorder: MediaRecorder | null = null
  let stream: MediaStream | null = null
  let chunks: Blob[] = []
  let mimeType = ''

  const hasContent = ref(false)

  function pickMimeType(): string {
    const candidates = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', '']
    for (const c of candidates) {
      if (!c) return ''
      if (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported(c)) return c
    }
    return ''
  }

  async function ensureStream(): Promise<MediaStream> {
    if (!navigator.mediaDevices?.getUserMedia) {
      throw new Error('Microphone recording is not supported in this browser.')
    }
    if (!stream || !stream.active) {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    }
    return stream
  }

  async function ensureRecorder(): Promise<MediaRecorder> {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') return mediaRecorder
    const s = await ensureStream()
    mimeType = pickMimeType()
    mediaRecorder = mimeType ? new MediaRecorder(s, { mimeType }) : new MediaRecorder(s)
    mediaRecorder.ondataavailable = (e) => {
      if (e.data?.size > 0) {
        chunks.push(e.data)
        hasContent.value = true
      }
    }
    return mediaRecorder
  }

  async function flush(): Promise<void> {
    if (!mediaRecorder || mediaRecorder.state === 'inactive') return
    await new Promise<void>((resolve) => {
      let settled = false
      const finish = () => { if (!settled) { settled = true; resolve() } }
      mediaRecorder!.addEventListener('dataavailable', finish, { once: true })
      try { mediaRecorder!.requestData(); window.setTimeout(finish, 250) } catch { finish() }
    })
  }

  async function start(): Promise<void> {
    const r = await ensureRecorder()
    if (r.state === 'paused') { r.resume(); return }
    if (r.state === 'inactive') r.start(1000)
  }

  async function pause(): Promise<void> {
    if (!mediaRecorder || mediaRecorder.state !== 'recording') return
    await flush()
    mediaRecorder.pause()
  }

  async function exportRecording(): Promise<Blob | null> {
    await flush()
    if (!chunks.length) return null
    return new Blob(chunks, { type: mimeType || 'audio/webm' })
  }

  async function reset(): Promise<void> {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') mediaRecorder.stop()
    stream?.getTracks().forEach(t => t.stop())
    mediaRecorder = null
    stream = null
    chunks = []
    mimeType = ''
    hasContent.value = false
  }

  function getMimeType(): string { return mimeType }

  return { start, pause, exportRecording, reset, hasContent, getMimeType }
}
