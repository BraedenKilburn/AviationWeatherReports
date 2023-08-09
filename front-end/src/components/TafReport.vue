<script setup lang="ts">
import { useRootStore } from '@/stores/root';
import { computed } from 'vue';
import {
  CloudIcon,
  WindIcon,
  VisibilityIcon,
} from '@/components/svg';

const store = useRootStore();
const airport = computed(() => store.airport as API.AirportResponse);

const taf = computed(() => store.taf as API.TafResponse);
const forecasts = computed(() => taf.value.forecast);

const airportName = computed(() => `${taf.value.station.name} (${taf.value.icao})`);

const startTime = computed(() => {
  const date = new Date(`${taf.value.timestamp.from}Z`);
  if (!airport.value.timezone) return date.toLocaleString();

  const options: Intl.DateTimeFormatOptions = {
    timeZone: airport.value.timezone.tzid,
    dateStyle: 'long',
    timeStyle: 'long',
  };

  return date.toLocaleString('en-US', options);
});

const endTime = computed(() => {
  const date = new Date(`${taf.value.timestamp.to}Z`);
  if (!airport.value.timezone) return date.toLocaleString();

  const options: Intl.DateTimeFormatOptions = {
    timeZone: airport.value.timezone.tzid,
    dateStyle: 'long',
    timeStyle: 'long',
  };

  return date.toLocaleString('en-US', options);
});

const validFromTime = (fromTime: string): string => {
  let isoValidFromTime = new Date(`${fromTime}Z`)
  if (!airport.value.timezone) return isoValidFromTime.toLocaleString()
  
  return isoValidFromTime.toLocaleString('en-US', {
    timeZone: airport.value.timezone.tzid,
  })
}

const validToTime = (toTime: string): string => {
  let isoValidToTime = new Date(`${toTime}Z`)
  if (!airport.value.timezone) return isoValidToTime.toLocaleString()
  
  return isoValidToTime.toLocaleString('en-US', {
    timeZone: airport.value.timezone.tzid,
  })
}

const winds = (wind?: API.Wind): string => {
  if (!wind) return 'No wind data available';

  const direction = wind.degrees;
  const speed = wind.speed_kts;

  return `${direction}° at ${speed} knots`;
}

const clouds = (clouds?: API.CloudLevel[]): string[] => {
  if (!clouds) return ['No cloud data available'];

  return clouds.map(cloud => {
    const { code, base_feet_agl } = cloud;
    return `${code} at ${base_feet_agl?.toLocaleString()}'`;
  });
}

const visibility = (visibility?: API.Visibility): string => {
  if (!visibility) return 'No visibility data available';

  const distance = visibility.miles;
  if (distance === 'Greater than 6') return distance;
  return `${distance} SM`;
}

const iconSize = computed(() => 'max(2.5rem, 5vw)');
</script>

<template>
  <div class="taf-info">
    <div class="heading-info">
      <h1 class="name">
        {{ airportName }}
      </h1>
      <h2><strong>From:</strong> {{ startTime }}</h2>
      <h2><strong>To:</strong> {{ endTime }}</h2>
    </div>
    <div class="taf-reports">
      <div
        v-for="(forecast, idx) in taf.forecast"
        :key="idx"
        class="report"
      >
        <div class="time-valid">
          <div>{{ validFromTime(forecast.timestamp.from) }}</div>
          <div class="spacer">
            to
          </div>
          <div>{{ validToTime(forecast.timestamp.to) }}</div>
        </div>
        <div class="row">
          <div class="column">
            <wind-icon :size="iconSize" />
            <div class="info-title">
              Wind:
            </div>
            <div>{{ winds(forecast.wind) }}</div>
          </div>
          <div class="column">
            <cloud-icon :size="iconSize" />
            <div class="info-title">
              Clouds:
            </div>
            <div
              v-for="(cloud, idx) in clouds(forecast.clouds)"
              :key="idx"
            >
              {{ cloud }}
            </div>
          </div>
          <div class="column">
            <visibility-icon :size="iconSize" />
            <div class="info-title">
              Visibility:
            </div>
            <div>{{ visibility(forecast.visibility) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$gap: 1vh;
$desktop-min-width: 769px;

.taf-info {
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
    }
  }

  .taf-reports {
    display: flex;
    flex-direction: column;
    margin-top: 20px;

    .report {
      padding: 20px 0;
      border-bottom: 1px solid var(--color-border);

      &:first-child {
        border-top: 1px solid var(--color-border);
      }

      &:last-child {
        border-bottom: none;
      }

      .time-valid {
        display: flex;
        flex-direction: column;

        @media screen and (min-width: $desktop-min-width) {
          flex-direction: row;
          justify-content: center;
          align-items: center;
        }

        div {
          font-size: 1.5rem;
          font-weight: bold;

          &.spacer {
            margin: 0 0.5rem;
          }
        }
      }

      .row {
        display: flex;
        flex-direction: column;
        gap: $gap;
        margin-top: 10px;
        font-size: 1.25rem;

        @media screen and (min-width: $desktop-min-width) {
          flex-direction: row;
        }

        .column {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: $gap;
          flex: 1;

          .info-title {
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>