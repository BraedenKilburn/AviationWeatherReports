<script setup lang="ts">
import { useRootStore } from '@/stores/root';
import { useRoute } from 'vue-router';
import MainPageContent from '@/components/MainPageContent.vue';

const route = useRoute();
const name = route.name?.toString() ?? 'Airport';

const store = useRootStore();
</script>

<template>
  <main-page-content
    v-if="!store.airport"
    header="Airport Information"
    subheader="Get the latest station information"
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
