<script setup lang="ts">
import { useRootStore } from '@/stores/root';
import { useRoute } from 'vue-router';
import MainPageContent from '@/components/MainPageContent.vue';

const route = useRoute();
const name = route.name?.toString() ?? 'TAF';

const store = useRootStore();
</script>

<template>
  <main-page-content
    v-if="!store.taf"
    header="TAF Report"
    subheader="Get the latest TAF information"
    :name="name"
  />
  <div
    v-else
    class="airport-info"
  >
    <h1>Airport View for {{ store.icao }}</h1>
  </div>
</template>

<style scoped lang="scss"></style>
