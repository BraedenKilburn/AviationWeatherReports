import { defineStore } from 'pinia'
import { ref } from 'vue'

type Themes = 'dark' | 'light'
type Airport = API.AirportResponse;
type Metar = API.MetarResponse;
type Taf = API.TafResponse;

export const useRootStore = defineStore('root', () => {
  const theme = ref('dark')
  const setTheme = (newTheme: Themes) => {
    theme.value = newTheme
    localStorage.setItem('theme', newTheme)
    document.body.classList.replace(theme.value === 'dark' ? 'light' : 'dark', theme.value)
  }

  const icao = ref('');
  const airport = ref<Airport | null>(null);
  const metar = ref<Metar | null>(null);
  const taf = ref<Taf | null>(null);

  return {
    icao,
    airport,
    metar,
    taf,
    theme,
    setTheme,
  }
})
