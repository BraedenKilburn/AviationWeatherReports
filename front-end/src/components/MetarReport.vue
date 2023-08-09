<script setup lang="ts">
import { useRootStore } from '@/stores/root';
import { computed } from 'vue';
import {
  WindIcon,
  CloudIcon,
  ThermostatIcon,
  VisibilityIcon,
  PressureIcon,
  DewpointIcon,
} from '@/components/svg';

const store = useRootStore();

const airport = computed(() => store.airport as API.AirportResponse);
const metar = computed(() => store.metar as API.MetarResponse);

const airportName = computed(() => `${metar.value.station.name} (${metar.value.icao})`);

const observedTime = computed(() => {
  const date = new Date(`${metar.value.observed}Z`);
  if (!airport.value.timezone) return date.toLocaleString();

  const options: Intl.DateTimeFormatOptions = {
    timeZone: airport.value.timezone.tzid,
    dateStyle: 'long',
    timeStyle: 'long',
  };

  return date.toLocaleString('en-US', options);
});

const flightCategory = computed(() => metar.value.flight_category);

const wind = computed(() => {
  const windData = metar.value.wind;
  const calmWind = metar.value.raw_text.includes('00000KT');

  if (calmWind) return 'Calm';
  if (!windData) return 'No wind data available';

  const direction = windData.degrees;
  const speed = windData.speed_kts;

  return `${direction}° at ${speed} knots`;
});

const gusting = computed(() => {
  const wind = metar.value.wind;
  if (!wind) return '';

  const gusting = wind.gust_kts;
  return gusting ? `Gusting at ${gusting} knots` : '';
});

const clouds = computed(() => {
  const clouds = metar.value.clouds;
  if (!clouds) return 'No cloud data available';

  return clouds.map((cloud) => {
    if (cloud.code === 'SKC' || cloud.code === 'CLR') return cloud.text
    return `${cloud.text} at ${cloud.base_feet_agl?.toLocaleString()}'`
  });
});

const temperature = computed(() => {
  const temperature = metar.value.temperature;
  if (!temperature) return 'No temperature data available';

  const celsius = temperature.celsius;
  const fahrenheit = temperature.fahrenheit;

  return `${celsius}°C (${fahrenheit}°F)`;
});

const visibility = computed(() => {
  const visibility = metar.value.visibility;
  if (!visibility) return 'No visibility data available';

  const miles = visibility.miles;

  return `${miles} miles`;
});

const barometer = computed(() => {
  const barometer = metar.value.barometer;
  if (!barometer) return 'No barometer data available';

  const hg = barometer.hg;
  const hpa = barometer.hpa;

  return `${hg} inHg (${hpa} hPa)`;
});

const dewpoint = computed(() => {
  const dewpoint = metar.value.dewpoint;
  if (!dewpoint) return 'No dewpoint data available';

  const celsius = dewpoint.celsius;
  const fahrenheit = dewpoint.fahrenheit;

  return `${celsius}°C (${fahrenheit}°F)`;
});

const categoryColor = computed(() => {
  switch (flightCategory.value) {
    case 'VFR':
      return 'green';
    case 'MVFR':
      return 'blue';
    case 'IFR':
      return 'red';
    case 'LIFR':
      return 'purple';
    default:
      return 'black';
  }
});

const iconSize = computed(() => 'max(2.5rem, 5vw)');
</script>

<template>
  <div class="metar-info">
    <div class="heading-info">
      <h1 class="name">
        {{ airportName }}
      </h1>
      <h2>{{ observedTime }}</h2>
      <h2
        class="flight-category"
        :style="{ color: categoryColor }"
      >
        {{ flightCategory }}
      </h2>
    </div>
    <div class="grid-container">
      <div class="column">
        <wind-icon :size="iconSize" />
        <div class="info-title">
          Wind:
        </div>
        <div>{{ wind }}</div>
        <div>{{ gusting }}</div>
      </div>
      <div class="column">
        <cloud-icon :size="iconSize" />
        <div class="info-title">
          Clouds:
        </div>
        <h3
          v-for="(cloud, idx) in clouds"
          :key="idx"
        >
          {{ cloud }}
        </h3>
      </div>
      <div class="column">
        <thermostat-icon :size="iconSize" />
        <div class="info-title">
          Temperature:
        </div>
        <div>{{ temperature }}</div>
      </div>
      <div class="column">
        <visibility-icon :size="iconSize" />
        <div class="info-title">
          Visibility:
        </div>
        <div>{{ visibility }}</div>
      </div>
      <div class="column">
        <pressure-icon :size="iconSize" />
        <div class="info-title">
          Altimeter
        </div>
        <div>{{ barometer }}</div>
      </div>
      <div class="column">
        <dewpoint-icon :size="iconSize" />
        <div class="info-title">
          Dewpoint:
        </div>
        <div>{{ dewpoint }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$gap: 1vh;
$desktop-min-width: 769px;

.metar-info {
  overflow: auto;
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: $gap;
  margin-bottom: 20px;

  @media screen and (min-width: $desktop-min-width) {
    margin-bottom: 0;
  }

  .heading-info {
    display: flex;
    flex-direction: column;
    gap: $gap;

    h1.name {
      text-align: center;
      font-size: 1.75rem;
      font-weight: bold;

      @media (min-width: $desktop-min-width) {
        font-size: 2.25rem;
      }
    }

    h2 {
      font-size: 1.25rem;

      @media (min-width: $desktop-min-width) {
        font-size: 1.5rem;
      }

      &.flight-category {
        width: fit-content;
        padding: 0 20px;
        margin: 10px auto;
        background-color: var(--flight-category-background);
        border-radius: 25px;
        font-weight: bold;
      }
    }
  }

  .grid-container {
    height: inherit;
    display: grid;
    grid-template-columns: 1fr; // 1 column per row for mobile
    gap: 1rem;
    align-items: center;

    @media (min-width: $desktop-min-width) { // Tablet breakpoint
      grid-template-columns: repeat(2, 1fr); // 2 columns per row
    }

    @media (min-width: 1025px) { // Desktop breakpoint
      grid-template-columns: repeat(3, 1fr); // 3 columns per row
    }

    .column {
      font-size: 1.5rem;

      div.info-title {
        font-weight: bold;
      }
    }
  }
}
</style>