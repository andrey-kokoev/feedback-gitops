<template>
  <div v-if="store.toastText" id="cfw-toast" class="active">
    {{ store.toastText }}
    <a v-if="store.toastLink" :href="store.toastLink" target="_blank" rel="noopener noreferrer">Open issue</a>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, onUnmounted } from 'vue'
import { useWidgetStore } from '../stores/widget'

const store = useWidgetStore()
let toastTimer: ReturnType<typeof setTimeout> | null = null

watch(() => store.toastText, (val) => {
  if (toastTimer) { clearTimeout(toastTimer); toastTimer = null }
  if (val) {
    toastTimer = setTimeout(() => {
      store.toastText = ''
      store.toastLink = ''
      toastTimer = null
    }, 4000)
  }
})

onUnmounted(() => {
  if (toastTimer) clearTimeout(toastTimer)
})
</script>
