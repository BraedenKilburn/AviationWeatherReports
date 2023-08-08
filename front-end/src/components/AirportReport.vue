<script setup lang="ts">
import { useRootStore } from '@/stores/root';
import {
  PinIcon,
  CompassIcon,
  ElevationIcon,
  OperationalIcon,
} from '@/components/svg';
import { computed } from 'vue';

const store = useRootStore();

// This AirportReport component is only displayed when there is a valid airport
// in the store, thus we can safely assume that the store.airport is not null.
const airport = computed(() => store.airport as API.AirportResponse);

const airportName = computed(() => `${airport.value.name} (${airport.value.icao})`);
const airportLocation = computed(() => {
  const stateCode = airport.value.state?.code ?? '';
  const cityName = airport.value.city ?? (airport.value.state?.name + ',') ?? '';
  return `${cityName}, ${stateCode}`;
});
const airportCountry = computed(() => airport.value.country?.name);
const airportLatitude = computed(() => airport.value.latitude.degrees);
const airportLongitude = computed(() => airport.value.longitude.degrees);
const airportElevation = computed(() => airport.value.elevation?.feet?.toLocaleString());
const airportStatus = computed(() => airport.value.status);

const iconSize = computed(() => 'max(2.5rem, 5vw)');
</script>

<template>
  <div class="airport-info">
    <h1 class="name">
      {{ airportName }}
    </h1>
    <div class="row">
      <div class="stacked">
        <pin-icon :size="iconSize" />
        <p>{{ airportLocation }}</p>
        <p>{{ airportCountry }}</p>
      </div>
      <div class="stacked">
        <compass-icon :size="iconSize" />
        <p>{{ airportLatitude }}</p>
        <p>{{ airportLongitude }}</p>
      </div>
    </div>
    <div class="row">
      <div class="stacked">
        <elevation-icon :size="iconSize" />
        <p>Elevation (ft):</p>
        <p>{{ airportElevation }}</p>
      </div>
      <div class="stacked">
        <operational-icon :size="iconSize" />
        <p>Status:</p>
        <p>{{ airportStatus }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$gap: 5vh;
$desktop-min-width: 769px;

.airport-info {
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 3vh 0;
  gap: $gap;

  .row {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    gap: $gap;

    @media (min-width: $desktop-min-width) {
      gap: 0;
      flex-direction: row;
    }

    .stacked {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;

      p:first-child {
        font-weight: bold;
      }
    }
  }

  h1,
  p {
    text-align: center;
    margin: 0;
    padding: 5px;
  }

  .name {
    font-size: 1.75rem;
    font-weight: bold;

    @media (min-width: $desktop-min-width) {
      font-size: 2.25rem;
    }
  }

  p {
    font-size: 1.5rem;

    @media (min-width: $desktop-min-width) {
      font-size: 2rem;
    }
  }
}
</style>
