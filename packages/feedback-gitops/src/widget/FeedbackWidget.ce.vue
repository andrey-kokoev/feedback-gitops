<template>
  <MobileWidget ref="mobileWidgetRef" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useWidgetStore } from './stores/widget'
import { useWidgetState } from './composables/useWidgetState'
import { useAdminToken } from './composables/useAdminToken'
import MobileWidget from './components/MobileWidget.vue'
import type { WidgetConfig } from './types'

const props = defineProps<{ widgetConfig?: WidgetConfig }>()

const store = useWidgetStore()
const { restore } = useWidgetState()
const { readToken } = useAdminToken()

const mobileWidgetRef = ref<InstanceType<typeof MobileWidget> | null>(null)

defineExpose({
  openItem(id: string | number) {
    if (mobileWidgetRef.value) {
      mobileWidgetRef.value.openItem(id)
    }
  }
})

onMounted(() => {
  if (props.widgetConfig) {
    store.init(props.widgetConfig)
    restore()
    readToken() // seeds store.adminToken from localStorage
  }
})
</script>

<style>
@import './styles/widget.css';
</style>
