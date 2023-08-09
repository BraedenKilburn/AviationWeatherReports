<script setup lang="ts">
import AirportSearch from '@/components/AirportSearch.vue';
defineProps<{
  header: string;
  subheader: string;
  name: string;
}>();
</script>

<template>
  <main>
    <h1>{{ header }}</h1>
    <h2>{{ subheader }}</h2>
    <airport-search
      class="airport-search"
      :name="name"
    />
  </main>
</template>

<style scoped lang="scss">
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 10px;
  text-align: center;

  h1 {
    font-size: 1.75rem;
    font-weight: bold;
  }

  h2 {
    font-size: 1.25rem;
  }

  .airport-search {
    margin-top: 20px;
  }
}

@media (min-width: 426px) {
  main {
    h1 {
      font-size: 2rem;
    }

    h2 {
      font-size: 1.5rem;
    }
  }
}

@media (min-width: 769px) {
  main {
    h1 {
      font-size: 3rem;
    }

    h2 {
      font-size: 2rem;
    }
  }
}

@media (min-width: 1025px) {
  main {
    h1 {
      font-size: 4rem;
    }

    h2 {
      font-size: 2.5rem;
    }
  }
}
</style>