<script setup lang="ts">
import { computed } from 'vue'
import Card from 'primevue/card'
import { useAirportData } from '../composables/useAirportData'

const { stationData } = useAirportData()

const formattedElevation = computed(() => {
  if (!stationData.value) return ''
  return `${stationData.value.elevation.feet.toLocaleString()} ft (${stationData.value.elevation.meters.toLocaleString()} m)`
})

const formattedTimezone = computed(() => {
  if (!stationData.value) return ''
  const tz = stationData.value.timezone
  const offset = tz.gmt >= 0 ? `+${tz.gmt}` : tz.gmt
  const zoneName = tz.zone || tz.tzid
  return `${zoneName} (UTC${offset})`
})

const formattedLocalTime = computed(() => {
  if (!stationData.value) return ''
  const { date, time } = stationData.value.timestamp.local
  return `${date} ${time}`
})

const formattedUtcTime = computed(() => {
  if (!stationData.value) return ''
  const { date, time } = stationData.value.timestamp.utc
  return `${date} ${time} UTC`
})
</script>

<template>
  <Card v-if="stationData" class="station-card">
    <template #header>
      <div class="station-header">
        <h2>{{ stationData.name }}</h2>
        <div class="station-codes">
          <span class="code icao">{{ stationData.icao }}</span>
          <span v-if="stationData.iata" class="code iata">{{ stationData.iata }}</span>
        </div>
      </div>
    </template>

    <template #content>
      <div class="station-info">
        <div class="info-section">
          <h3>Location</h3>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">Location:</span>
              <span class="value">{{ stationData.location }}</span>
            </div>
            <div class="info-item">
              <span class="label">City:</span>
              <span class="value">{{ stationData.city }}</span>
            </div>
            <div v-if="stationData.state" class="info-item">
              <span class="label">State:</span>
              <span class="value">{{ stationData.state.name }} ({{ stationData.state.code }})</span>
            </div>
            <div class="info-item">
              <span class="label">Country:</span>
              <span class="value">{{ stationData.country.name }} ({{ stationData.country.code }})</span>
            </div>
          </div>
        </div>

        <div class="info-section">
          <h3>Coordinates</h3>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">Latitude:</span>
              <span class="value">{{ stationData.latitude.degrees }} ({{ stationData.latitude.decimal }}°)</span>
            </div>
            <div class="info-item">
              <span class="label">Longitude:</span>
              <span class="value">{{ stationData.longitude.degrees }} ({{ stationData.longitude.decimal }}°)</span>
            </div>
            <div class="info-item">
              <span class="label">Elevation:</span>
              <span class="value">{{ formattedElevation }}</span>
            </div>
          </div>
        </div>

        <div class="info-section">
          <h3>Details</h3>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">Type:</span>
              <span class="value">{{ stationData.type }}</span>
            </div>
            <div class="info-item">
              <span class="label">Timezone:</span>
              <span class="value">{{ formattedTimezone }}</span>
            </div>
            <div class="info-item">
              <span class="label">Local Time:</span>
              <span class="value">{{ formattedLocalTime }}</span>
            </div>
            <div class="info-item">
              <span class="label">UTC Time:</span>
              <span class="value">{{ formattedUtcTime }}</span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<style scoped>
.station-card {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.station-header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--p-surface-border);
}

.station-header h2 {
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.station-codes {
  display: flex;
  gap: 0.5rem;
}

.code {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-weight: 600;
  font-size: 0.875rem;
}

.code.icao {
  background-color: var(--p-primary-color);
  color: var(--p-primary-contrast-color);
}

.code.iata {
  background-color: var(--p-surface-600);
  color: var(--p-surface-0);
}

.station-info {
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

@media (max-width: 640px) {
  .info-grid {
    grid-template-columns: 1fr;
  }
}
</style>
