<script setup lang="ts">
import { computed } from 'vue'
import Card from 'primevue/card'
import { useAirportData } from '../composables/useAirportData'

const { tafData } = useAirportData()

const formattedIssued = computed(() => {
  if (!tafData.value?.timestamp.issued) return ''
  const date = new Date(tafData.value.timestamp.issued)
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  })
})

const validPeriod = computed(() => {
  if (!tafData.value) return ''
  const from = new Date(tafData.value.timestamp.from)
  const to = new Date(tafData.value.timestamp.to)

  return `${from.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })} - ${to.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })}`
})

function formatPeriodTime(period: any) {
  const from = new Date(period.timestamp.from)
  const to = new Date(period.timestamp.to)

  return `${from.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })} - ${to.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })}`
}

function getWindDirection(degrees: number) {
  if (degrees === 0) return 'Variable'

  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
  const index = Math.round(degrees / 22.5) % 16
  return `${directions[index]} (${degrees}°)`
}
</script>

<template>
  <Card v-if="tafData" class="taf-card">
    <template #header>
      <div class="taf-header">
        <h2>TAF (Terminal Aerodrome Forecast)</h2>
        <div class="header-info">
          <div class="info-row">
            <span class="label">Issued:</span>
            <span class="value">{{ formattedIssued }}</span>
          </div>
          <div class="info-row">
            <span class="label">Valid:</span>
            <span class="value">{{ validPeriod }}</span>
          </div>
        </div>
      </div>
    </template>

    <template #content>
      <div class="taf-info">
        <div class="forecast-periods">
          <div
            v-for="period in tafData.forecast"
            :key="`${period.timestamp.from}-${period.timestamp.to}`"
            class="forecast-period"
          >
            <div class="period-header">
              <div class="period-time">
                <span v-if="period.change" class="change-indicator">
                  {{ period.change.indicator.text }}
                </span>
                <span class="time">{{ formatPeriodTime(period) }}</span>
              </div>
            </div>

            <div class="period-content">
              <div v-if="period.wind" class="period-section">
                <h4>Wind</h4>
                <div class="period-grid">
                  <div class="period-item">
                    <span class="label">Direction:</span>
                    <span class="value">{{ getWindDirection(period.wind.degrees) }}</span>
                  </div>
                  <div class="period-item">
                    <span class="label">Speed:</span>
                    <span class="value">{{ period.wind.speed_kts }} kts ({{ period.wind.speed_mph }} mph)</span>
                  </div>
                </div>
              </div>

              <div v-if="period.visibility" class="period-section">
                <h4>Visibility</h4>
                <div class="period-item">
                  <span class="value">{{ period.visibility.miles_text }}</span>
                </div>
              </div>

              <div v-if="period.clouds?.length" class="period-section">
                <h4>Clouds</h4>
                <div class="clouds-list">
                  <div v-for="cloud in period.clouds" :key="`${cloud.text}-${cloud.base_feet_agl ?? 0}`" class="cloud-item">
                    <span class="cloud-coverage">{{ cloud.text }}</span>
                    <span v-if="cloud.base_feet_agl" class="cloud-altitude">{{ cloud.base_feet_agl.toLocaleString() }} ft AGL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="info-section">
          <h3>Raw TAF</h3>
          <div class="raw-text">{{ tafData.raw_text }}</div>
        </div>
      </div>
    </template>
  </Card>
</template>

<style scoped>
.taf-card {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.taf-header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--p-surface-border);
}

.taf-header h2 {
  margin: 0 0 0.75rem 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.header-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-row {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.info-row .label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--p-text-muted-color);
}

.info-row .value {
  font-size: 0.875rem;
  color: var(--p-text-color);
}

.taf-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.forecast-periods {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.forecast-period {
  border: 1px solid var(--p-surface-border);
  border-radius: 6px;
  overflow: hidden;
}

.period-header {
  background-color: var(--p-primary-color);
  color: var(--p-primary-contrast-color);
  padding: 0.75rem 1rem;
}

.period-time {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.change-indicator {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  background-color: var(--p-surface-900);
  color: var(--p-surface-0);
  border-radius: 4px;
  font-weight: 700;
  font-size: 0.75rem;
  text-transform: uppercase;
}

.period-time .time {
  font-weight: 500;
  font-size: 0.95rem;
}

.period-content {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.period-section h4 {
  margin: 0 0 0.5rem 0;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--p-primary-color);
}

.period-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.5rem;
}

.period-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.period-item .label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--p-text-muted-color);
}

.period-item .value {
  font-size: 0.95rem;
  color: var(--p-text-color);
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

.info-section h3 {
  margin: 0 0 1rem 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--p-primary-color);
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
  .period-grid {
    grid-template-columns: 1fr;
  }
}
</style>
