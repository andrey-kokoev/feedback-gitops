import { ref, computed, onMounted } from 'vue'
import { useWidgetStore } from '../stores/widget'
import { useWidgetState } from './useWidgetState'

const SWIPE_THRESHOLD = 40

export function useWidgetLauncher() {
  const store = useWidgetStore()
  const { persist } = useWidgetState()

  const isOpen = ref(false)
  const swipeHintVisible = ref(false)
  let swipeStartX = 0

  const swipeHintStyle = computed(() => {
    if (store.handedness === 'left') {
      return { left: '10px', right: '' }
    }
    return { right: '10px', left: '' }
  })

  function onTouchStart(e: TouchEvent) {
    swipeStartX = e.touches[0].clientX
  }

  function onTouchEnd(e: TouchEvent) {
    const dx = e.changedTouches[0].clientX - swipeStartX
    if (Math.abs(dx) >= SWIPE_THRESHOLD) {
      store.handedness = dx < 0 ? 'left' : 'right'
      persist()
      e.preventDefault()
    }
  }

  function open() {
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
  }

  function applyHandedness(side: 'left' | 'right') {
    store.handedness = side
    persist()
  }

  // Show swipe hint once per storage key
  onMounted(() => {
    try {
      const hintKey = store.config.storageKey + ':swipe-hint-shown'
      if (!localStorage.getItem(hintKey)) {
        localStorage.setItem(hintKey, '1')
        setTimeout(() => {
          swipeHintVisible.value = true
          setTimeout(() => {
            swipeHintVisible.value = false
          }, 2500)
        }, 900)
      }
    } catch { /* ignore */ }
  })

  return {
    isOpen,
    swipeHintVisible,
    swipeHintStyle,
    onTouchStart,
    onTouchEnd,
    open,
    close,
    applyHandedness,
  }
}
