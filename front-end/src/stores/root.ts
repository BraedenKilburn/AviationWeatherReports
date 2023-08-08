import { defineStore } from 'pinia'
import { ref } from 'vue'

type Themes = 'dark' | 'light'

export const useRootStore = defineStore('root', () => {
  const theme = ref('dark')
  const setTheme = (newTheme: Themes) => {
    theme.value = newTheme
    localStorage.setItem('theme', newTheme)
    document.body.classList.replace(theme.value === 'dark' ? 'light' : 'dark', theme.value)
  }

  const icao = ref('');
  const airport = ref(null);
  const metar = ref(null);
  const taf = ref(null);

  return {
    icao,
    airport,
    metar,
    taf,
    theme,
    setTheme,
  }
})
