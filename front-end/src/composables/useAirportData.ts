import { ref, computed } from 'vue'
import type { StationData } from '../types/station'
import type { MetarData } from '../types/metar'
import type { TafData } from '../types/taf'

const API_URL = import.meta.env.VITE_API_URL

const loading = ref(false)
const error = ref<string | null>(null)
const stationData = ref<StationData | null>(null)
const metarData = ref<MetarData | null>(null)
const tafData = ref<TafData | null>(null)

let abortController: AbortController | null = null

export function useAirportData() {
  const currentIcao = computed(() => stationData.value?.icao || null)

  async function fetchStationData(icaoCode: string, signal?: AbortSignal) {
    try {
      const response = await fetch(`${API_URL}/airport/${icaoCode}`, { signal })

      if (!response.ok) {
        throw new Error(`Failed to fetch station data: ${response.statusText}`)
      }

      const data = await response.json()
      return data
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') throw err
      console.error(`Error fetching station data for ${icaoCode}:`, err)
      throw err
    }
  }

  async function fetchMetarData(icaoCode: string, signal?: AbortSignal) {
    try {
      const response = await fetch(`${API_URL}/metar/${icaoCode}`, { signal })

      if (!response.ok) {
        throw new Error(`Failed to fetch METAR data: ${response.statusText}`)
      }

      const data = await response.json()
      return data
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') throw err
      console.error(`Error fetching METAR data for ${icaoCode}:`, err)
      throw err
    }
  }

  async function fetchTafData(icaoCode: string, signal?: AbortSignal) {
    try {
      const response = await fetch(`${API_URL}/taf/${icaoCode}`, { signal })

      if (!response.ok) {
        throw new Error(`Failed to fetch TAF data: ${response.statusText}`)
      }

      const data = await response.json()
      return data
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') throw err
      console.error(`Error fetching TAF data for ${icaoCode}:`, err)
      throw err
    }
  }

  function clearData() {
    error.value = null
    stationData.value = null
    metarData.value = null
    tafData.value = null
  }

  async function fetchAllData(icaoCode: string) {
    // If the ICAO code is the same as the current ICAO code, return
    if (currentIcao.value === icaoCode) return

    // Cancel any pending requests
    if (abortController) {
      abortController.abort()
    }
    abortController = new AbortController()
    const { signal } = abortController

    loading.value = true
    clearData()

    try {
      // Use Promise.allSettled to handle individual failures gracefully
      // This ensures all requests complete even if some fail
      const [stationResult, metarResult, tafResult] = await Promise.allSettled([
        fetchStationData(icaoCode, signal),
        fetchMetarData(icaoCode, signal),
        fetchTafData(icaoCode, signal),
      ])

      // Set data for successful fetches
      if (stationResult.status === 'fulfilled') {
        stationData.value = stationResult.value
      }
      if (metarResult.status === 'fulfilled') {
        metarData.value = metarResult.value
      }
      if (tafResult.status === 'fulfilled') {
        tafData.value = tafResult.value
      }

      // If all fetches failed (and not due to abort), set an error message
      const wasAborted = signal.aborted
      const allFailed =
        stationResult.status === 'rejected' &&
        metarResult.status === 'rejected' &&
        tafResult.status === 'rejected'

      if (allFailed && !wasAborted) {
        error.value = `No data found for "${icaoCode}". Please verify the airport code is valid.`
      }
    } finally {
      loading.value = false
      abortController = null
    }
  }

  return {
    stationData,
    metarData,
    tafData,
    currentIcao,
    loading,
    error,

    fetchStationData,
    fetchMetarData,
    fetchTafData,
    fetchAllData,
    clearData,
  }
}
