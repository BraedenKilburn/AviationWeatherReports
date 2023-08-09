<script setup lang="ts">
import { computed, ref } from 'vue'
import { fetchAllInfo } from '@/api';
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength, alphaNum } from '@vuelidate/validators'
import { useRootStore } from '@/stores/root'
import { LoadingIndicator } from '@/components/svg';
import { AxiosError } from 'axios';
import { useRouter } from 'vue-router';

const props = defineProps<{
  name: string;
}>()

const search = ref('')
const rules = {
  search: {
    required,
    minLength: minLength(4),
    maxLength: maxLength(4),
    alphaNum,
  }
}

const v$ = useVuelidate(rules, { search })

const router = useRouter();
const loading = ref(false)
const errorMessage = ref('')
const store = useRootStore();

const submit = async () => {
  loading.value = true

  try {
    const [airport, metar, taf] = await fetchAllInfo(search.value);

    if (!airport) throw new AxiosError(`Airport not found for ${search.value.toUpperCase()}`);

    store.icao = search.value.toUpperCase();
    store.airport = airport;
    store.metar = metar;
    store.taf = taf;

    if (!store.airport && props.name === 'airport') {
      errorMessage.value = `Airport not found for ${store.icao}, please try again.`
    } else if (!store.metar && props.name === 'metar') {
      errorMessage.value = `METAR not found for ${store.icao}, please try again.`
    } else if (!store.taf && props.name === 'taf') {
      errorMessage.value = `TAF not found for ${store.icao}, please try again.`;
    } else {
      router.push({ name: props.name.toLowerCase() })
    }
  } catch (error) {
    console.error(error);
    errorMessage.value = (error as AxiosError).message
      ?? 'Something went wrong, please try again later.';
  } finally {
    loading.value = false
  }
}

const noData = computed(() => {
  if (!store.icao) return false;
  if (!store.airport && props.name === 'airport') return true;
  if (!store.metar && props.name === 'metar') return true;
  if (!store.taf && props.name === 'taf') return true;

  return false;
})
</script>

<template>
  <div class="search">
    <form @submit.prevent="submit">
      <input
        v-model="v$.search.$model"
        autocapitalize="characters"
        type="text"
        placeholder="Airport ICAO"
        required
      >
      <button
        type="submit"
        :disabled="loading || v$.search.$invalid"
      >
        <template v-if="!loading">
          Search
        </template>
        <template v-else>
          <loading-indicator size="15px" />
        </template>
      </button>
    </form>
    <div
      v-if="v$.search.$errors.length"
      :class="{ error: v$.search.$errors.length }"
    >
      <div
        v-for="error of v$.search.$errors"
        :key="error.$uid"
        class="input-errors"
      >
        <div class="error-msg">
          {{ error.$message }}
        </div>
      </div>
    </div>
    <div
      v-if="errorMessage"
      class="error"
    >
      {{ errorMessage }}
    </div>
    <div
      v-if="noData"
      class="error"
    >
      No data found for {{ store.icao }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.search {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  form {
    --border-radius: 10px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    input {
      width: 100%;
      padding: 10px;
      border: 1px solid var(--color-border);
      border-radius: var(--border-radius) 0 0 var(--border-radius);
      color: var(--color-text);
      background-color: var(--color-background-mute);
      font-size: 1rem;

      &:focus {
        outline-color: var(--color-border-hover);
      }
    }

    button {
      padding: 10px;
      border: 1px solid var(--color-border);
      border-radius: 0 var(--border-radius) var(--border-radius) 0;
      font-size: 1rem;
      color: var(--color-text);
      background-color: var(--color-background-mute);
      cursor: pointer;
    }
  }

  .error {
    margin-top: 10px;
    color: var(--color-error);
    font-size: 1rem;
    font-weight: bold;
  }
}

@media (min-width: 426px) {
  .search {
    form {
      max-width: 500px;

      input,
      button {
        font-size: 1.25rem;
        padding: 15px;
      }
    }
  }
}
</style>