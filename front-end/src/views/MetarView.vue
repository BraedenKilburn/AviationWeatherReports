<script setup lang="ts">
import { useRootStore } from '@/stores/root'
import { useRoute } from 'vue-router'
import MainPageContent from '@/components/MainPageContent.vue'
import MetarReport from '@/components/MetarReport.vue';

const route = useRoute()
const name = route.name?.toString() ?? 'metar'

const store = useRootStore()
</script>

<template>
  <main-page-content
    v-if="!store.metar"
    v-bind="$attrs"
    header="METAR Report"
    subheader="Get the latest METAR information"
    :name="name"
  />
  <metar-report
    v-else
    v-bind="$attrs"
  />
</template>

<style scoped lang="scss"></style>
