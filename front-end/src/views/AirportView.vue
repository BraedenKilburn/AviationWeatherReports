<script setup lang="ts">
import { useRootStore } from '@/stores/root';
import { useRoute } from 'vue-router';
import MainPageContent from '@/components/MainPageContent.vue';
import AirportReport from '@/components/AirportReport.vue';

const route = useRoute();
const name = route.name?.toString() ?? 'airport';

const store = useRootStore();
</script>

<template>
  <main-page-content
    v-if="!store.airport"
    v-bind="$attrs"
    header="Airport Information"
    subheader="Get the latest station information"
    :name="name"
  />
  <airport-report
    v-else
    v-bind="$attrs"
  />
</template>

<style scoped lang="scss"></style>
