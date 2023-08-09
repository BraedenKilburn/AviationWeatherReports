<script setup lang="ts">
import { fetchAllInfo } from '@/api';
import { SearchIcon } from '@/components/svg';
import { useRootStore } from '@/stores/root';
import { computed, nextTick, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const searchQuery = ref('');
const searchOpen = ref(false);

const toggleSearch = () => {
  searchQuery.value = '';
  searchOpen.value = !searchOpen.value

  if (searchOpen.value) {
    nextTick(() => {
      const input = document.querySelector('.search input') as HTMLInputElement;
      input?.focus();
    });
  }
};

const route = useRoute();
const router = useRouter();
const search = async () => {
  if (!searchQuery.value || searchQuery.value.length !== 4) return;

  try {
    const [airport, metar, taf] = await fetchAllInfo(searchQuery.value);

    const store = useRootStore();
    store.icao = searchQuery.value.toUpperCase();
    store.airport = airport;
    store.metar = metar;
    store.taf = taf;

    if (route.name === 'home') router.push({ name: 'airport' });
  } catch (error) {
    console.error(error);
  }
}

const hide = computed(() => !searchOpen.value);
const badInput = computed(() => (searchQuery.value.length !== 4 && searchQuery.value.length !== 0));
</script>

<template>
  <div class="search-block">
    <search-icon
      class="search-icon"
      :class="{ hide: searchOpen }"
      size="24"
      @click="toggleSearch"
    />
    <form
      class="search"
      :class="{ hide }"
      @focusout="toggleSearch"
      @submit.prevent="search"
    >
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Airport ICAO"
        :class="{ 'bad-input': badInput }"
      >
    </form>
  </div>
</template>

<style scoped lang="scss">
$desktop-min-width: 769px;

.search-block {
  display: flex;
  align-items: center;

  .search-icon {
    display: none;

    @media (min-width: $desktop-min-width) {
      display: block;
      cursor: pointer;
    }
  }

  .search {
    --border-radius: 10px;
    max-width: 300px;
    transition: max-width 0.5s ease-in-out;

    input {
      width: 100%;
      padding: 10px;
      border: 1px solid var(--color-border);
      border-radius: var(--border-radius);
      color: var(--color-text);
      background-color: var(--color-background-mute);
      font-size: 1rem;

      &:focus {
        outline-color: var(--color-border-hover);
      }

      &.bad-input {
        outline-color: var(--color-error);
      }
    }
  }

  .hide {
    max-width: 0;
    opacity: 0;
  }
}
</style>