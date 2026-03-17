import { useWidgetStore } from '../stores/widget'
import { useWidgetState } from './useWidgetState'

export function usePanelSwipe() {
  const store = useWidgetStore()
  const { persist } = useWidgetState()
  let startY = 0

  function onPanelTouchStart(e: TouchEvent) {
    startY = e.touches[0].clientY
  }

  function onPanelTouchEnd(e: TouchEvent) {
    const dy = e.changedTouches[0].clientY - startY
    if (dy > 40) {
      if (store.panelSnap === 'top') { store.panelSnap = 'middle'; persist() }
      else if (store.panelSnap === 'middle') { store.panelSnap = 'bottom'; persist() }
    } else if (dy < -40) {
      if (store.panelSnap === 'bottom') { store.panelSnap = 'middle'; persist() }
      else if (store.panelSnap === 'middle') { store.panelSnap = 'top'; persist() }
    }
  }

  return { onPanelTouchStart, onPanelTouchEnd }
}
