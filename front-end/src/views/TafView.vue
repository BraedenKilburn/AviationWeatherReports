<script setup lang="ts">
import { useRootStore } from '@/stores/root';
import { useRoute } from 'vue-router';
import MainPageContent from '@/components/MainPageContent.vue';
import TafReport from '@/components/TafReport.vue';

const route = useRoute();
const name = route.name?.toString() ?? 'taf';

const store = useRootStore();
</script>

<template>
  <main-page-content
    v-if="!store.taf"
    v-bind="$attrs"
    header="TAF Report"
    subheader="Get the latest TAF information"
    :name="name"
  />
  <taf-report
    v-else
    v-bind="$attrs"
  />
</template>

<style scoped lang="scss"></style>
