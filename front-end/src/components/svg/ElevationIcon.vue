<script setup lang="ts">
defineProps<{
  size?: string
}>()
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :height="size"
    :width="size"
    viewBox="0 -960 960 960"
  ><path d="m82-120 258-360h202l298-348v708H82Zm62-257-48-35 163-228h201l185-215 45 39-202 236H289L144-377Zm55 197h581v-486L569-420H370L199-180Zm581 0Z" /></svg>
</template>
