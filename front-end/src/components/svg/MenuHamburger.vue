<script setup lang="ts">
defineProps<{
  size?: string
  isOpen?: boolean
}>()
</script>

<template>
  <svg
    class="menu-toggle"
    xmlns="http://www.w3.org/2000/svg"
    :height="size"
    viewBox="0 -960 960 960"
    :width="size"
  >
    <path
      v-if="isOpen"
      d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"
    />
    <path
      v-else
      d="M120-240v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z"
    />
  </svg>
</template>

<style scoped lang="scss">
.menu-toggle {
  fill: var(--color-text);

  &:hover {
    cursor: pointer;
    fill: var(--color-text-hover);
  }
}
</style>
