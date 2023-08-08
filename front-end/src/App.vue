<script setup lang="ts">
import { useRouter } from 'vue-router'
import GlobalNavbar from '@/components/GlobalNavbar.vue'
import GlobalFooter from '@/components/GlobalFooter.vue'
import { onBeforeMount } from 'vue'
import { useRootStore } from './stores/root'

const store = useRootStore()
const links = useRouter().getRoutes()
  .sort((a, b) => (a.meta.order as number) - (b.meta.order as number))

onBeforeMount(() => {
  const theme = localStorage.getItem('theme')

  if (theme) {
    store.theme = theme
    document.body.classList.add(theme)
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    store.setTheme('dark')
  } else {
    store.setTheme('light')
  }
})
</script>

<template>
  <global-navbar :links="links" />
  <router-view class="main" />
  <global-footer />
</template>

<style scoped lang="scss">
.main {
  height: calc(100vh - var(--nav-height) - var(--footer-height));
}
</style>
