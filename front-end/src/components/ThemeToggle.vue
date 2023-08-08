<script setup lang="ts">
import { computed } from 'vue'
import ThemeIcon from './svg/ThemeIcon.vue'
import { useRootStore } from '@/stores/root'

const store = useRootStore()
const lightMode = computed(() => store.theme === 'light')
const toggleTheme = () => {
  store.setTheme(lightMode.value ? 'dark' : 'light')
}
</script>

<template>
  <theme-icon
    class="icon"
    size="24"
    :light-mode="lightMode"
    @click="toggleTheme"
  />
</template>

<style scoped lang="scss">
.icon {
  fill: var(--color-text);
  transition: all 0.3s ease-in;

  &:hover {
    cursor: pointer;
    fill: var(--color-text-hover);
  }
}
</style>
