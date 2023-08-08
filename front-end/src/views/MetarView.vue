<script setup lang="ts">
import { useRootStore } from '@/stores/root'
import { useRoute } from 'vue-router'
import MainPageContent from '@/components/MainPageContent.vue'

const route = useRoute()
const name = route.name?.toString() ?? 'METAR'

const store = useRootStore()
</script>

<template>
  <main-page-content
    v-if="!store.metar"
    header="METAR Report"
    subheader="Get the latest METAR information"
    :name="name"
  />
  <div
    v-else
    class="airport-info"
  >
    <h1>METAR View for {{ store.icao }}</h1>
  </div>
</template>

<style scoped lang="scss"></style>
