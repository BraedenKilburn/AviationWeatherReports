<script setup lang="ts">
import { computed } from 'vue'
import Card from 'primevue/card'
import { useAirportData } from '../composables/useAirportData'

const { metarData } = useAirportData()

const flightCategoryColor = computed(() => {
  if (!metarData.value) return ''
  const category = metarData.value.flight_category
  switch (category) {
    case 'VFR':
      return 'var(--p-green-500)'
    case 'MVFR':
      return 'var(--p-blue-500)'
    case 'IFR':
      return 'var(--p-red-500)'
    case 'LIFR':
      return 'var(--p-purple-500)'
    default:
      return 'var(--p-surface-500)'
  }
})

const formattedObserved = computed(() => {
  if (!metarData.value) return ''
  const date = new Date(metarData.value.observed)
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  })
})

const windDirection = computed(() => {
  if (!metarData.value) return ''
  const degrees = metarData.value.wind.degrees

  // Convert degrees to cardinal direction
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
  const index = Math.round(degrees / 22.5) % 16
  return `${directions[index]} (${degrees}°)`
})
</script>

<template>
  <Card v-if="metarData" class="metar-card">
    <template #header>
      <div class="metar-header">
        <h2>METAR</h2>
        <div class="header-info">
          <span class="flight-category" :style="{ backgroundColor: flightCategoryColor }">
            {{ metarData.flight_category }}
          </span>
          <span class="observed-time">{{ formattedObserved }}</span>
        </div>
      </div>
    </template>

    <template #content>
      <div class="metar-info">
        <div class="info-section">
          <h3>Current Conditions</h3>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">Temperature:</span>
              <span class="value">{{ metarData.temperature.celsius }}°C ({{ metarData.temperature.fahrenheit }}°F)</span>
            </div>
            <div class="info-item">
              <span class="label">Dewpoint:</span>
              <span class="value">{{ metarData.dewpoint.celsius }}°C ({{ metarData.dewpoint.fahrenheit }}°F)</span>
            </div>
            <div class="info-item">
              <span class="label">Humidity:</span>
              <span class="value">{{ metarData.humidity.percent }}%</span>
            </div>
          </div>
        </div>

        <div class="info-section">
          <h3>Wind</h3>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">Direction:</span>
              <span class="value">{{ windDirection }}</span>
            </div>
            <div class="info-item">
              <span class="label">Speed:</span>
              <span class="value">{{ metarData.wind.speed_kts }} kts ({{ metarData.wind.speed_mph }} mph)</span>
            </div>
          </div>
        </div>

        <div class="info-section">
          <h3>Visibility & Clouds</h3>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">Visibility:</span>
              <span class="value">{{ metarData.visibility.miles_text }}</span>
            </div>
            <div v-if="metarData.ceiling" class="info-item">
              <span class="label">Ceiling:</span>
              <span class="value">{{ metarData.ceiling.feet.toLocaleString() }} ft ({{ metarData.ceiling.meters.toLocaleString() }} m)</span>
            </div>
          </div>

          <div v-if="metarData.clouds.length > 0" class="clouds-section">
            <span class="label">Cloud Layers:</span>
            <div class="clouds-list">
              <div v-for="cloud in metarData.clouds" :key="`${cloud.text}-${cloud.base_feet_agl ?? 0}`" class="cloud-item">
                <span class="cloud-coverage">{{ cloud.text }}</span>
                <span v-if="cloud.base_feet_agl" class="cloud-altitude">{{ cloud.base_feet_agl.toLocaleString() }} ft AGL</span>
              </div>
            </div>
          </div>
        </div>

        <div class="info-section">
          <h3>Barometer</h3>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">Altimeter:</span>
              <span class="value">{{ metarData.barometer.hg.toFixed(2) }}" Hg</span>
            </div>
            <div class="info-item">
              <span class="label">Pressure:</span>
              <span class="value">{{ metarData.barometer.hpa.toFixed(0) }} hPa</span>
            </div>
          </div>
        </div>

        <div class="info-section">
          <h3>Raw METAR</h3>
          <div class="raw-text">{{ metarData.raw_text }}</div>
        </div>
      </div>
    </template>
  </Card>
</template>

<style scoped>
.metar-card {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.metar-header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--p-surface-border);
}

.metar-header h2 {
  margin: 0 0 0.75rem 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.header-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.flight-category {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 700;
  font-size: 1rem;
  color: white;
  letter-spacing: 0.5px;
}

.observed-time {
  font-size: 0.875rem;
  color: var(--p-text-muted-color);
}

.metar-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-section h3 {
  margin: 0 0 1rem 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--p-primary-color);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 0.75rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.info-item .label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--p-text-muted-color);
}

.info-item .value {
  font-size: 1rem;
  color: var(--p-text-color);
}

.clouds-section {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.clouds-section .label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--p-text-muted-color);
}

.clouds-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.cloud-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background-color: var(--p-surface-900);
  border-radius: 4px;
}

.cloud-coverage {
  font-weight: 600;
  color: var(--p-surface-0);
}

.cloud-altitude {
  color: var(--p-surface-200);
  font-size: 0.875rem;
}

.raw-text {
  padding: 1rem;
  background-color: var(--p-surface-900);
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.875rem;
  color: var(--p-surface-0);
  word-break: break-all;
  white-space: pre-wrap;
}

@media (max-width: 640px) {
  .info-grid {
    grid-template-columns: 1fr;
  }
}
</style>
