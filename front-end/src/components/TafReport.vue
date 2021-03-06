<template>
  <div class="text metar">
    <div class="row metar" id="airportName">
      <h1 class="col p-2 pb-sm-0 mb-sm-0 text-center">{{ airportName }}</h1>
    </div>
    <div class="row metar" id="startingTime">
      <h3 class="col p-2 mb-sm-0 text-center">{{ startTime }}</h3>
    </div>
    <div class="row metar" id="endingTime">
      <h3 class="col p-2 mb-sm-4 text-center">{{ endTime }}</h3>
    </div>
    <div
      class="container metar taf mt-4 mt-lg-0"
      v-for="forecast in this.taf.forecast"
      v-bind:key="forecast.index"
    >
      <div class="row time-period justify-content-center" id="validTimePeriod0">
        <h4 class="col-12 col-lg-9 mb-3 mb-md-0 text-center">
          {{ validFromTime(forecast.timestamp.from) }} to
          {{ validToTime(forecast.timestamp.to) }}
          {{ airport.timezone.zone }}
        </h4>
      </div>
      <div class="row d-flex align-items-center location">
        <div class="col-md-4 col-sm-12 mb-3" id="winds0">
          <img height="70px" src="/images/wind.svg" alt="Wind" />
          <h3 class="m-0 p-0">Wind:</h3>
          <h3 v-if="forecast.wind">
            {{ forecast.wind.degrees }}° at {{ forecast.wind.speed_kts }}kts
          </h3>
          <h3 v-else>Not available</h3>
        </div>
        <div class="col-md-4 col-sm-12 mb-3" id="clouds0">
          <img height="70px" src="/images/cloud.svg" alt="Cloud" />
          <h3 class="m-0 pb-2">Clouds (AGL):</h3>
          <h3 v-for="cloud in forecast.clouds" v-bind:key="cloud.index">
            {{ cloudText(cloud) }}
          </h3>
        </div>
        <div class="col-md-4 col-sm-12 mb-3" id="visibility0">
          <img height="70px" src="/images/visibility.svg" alt="Visibility" />
          <h3 class="m-0 p-0">Visibility:</h3>
          <h3>{{ visibility(forecast) }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TafReport",
  props: {
    airport: Object,
    taf: Object,
  },
  computed: {
    airportName: function () {
      let airportICAO = this.taf.icao;
      let name = this.taf.station.name;
      return airportICAO + " - " + name;
    },
    startTime: function () {
      let isoFromDate = new Date(this.taf.timestamp.from);
      let startingTime = isoFromDate.toLocaleString("en-US", {
        timeZone: this.airport.timezone.tzid,
      });
      let zone = this.airport.timezone.zone;

      // If the time zone name is undefined, use the tzid instead
      if (zone === undefined) zone = this.airport.timezone.tzid;

      return "From: " + startingTime + " " + zone;
    },
    endTime: function () {
      let isoToDate = new Date(this.taf.timestamp.to);
      let endingTime = isoToDate.toLocaleString("en-US", {
        timeZone: this.airport.timezone.tzid,
      });
      let zone = this.airport.timezone.zone;

      // If the time zone name is undefined, use the tzid instead
      if (zone === undefined) zone = this.airport.timezone.tzid;

      return "From: " + endingTime + " " + zone;
    },
  },
  methods: {
    validFromTime(fromTime) {
      let isoValidFromTime = new Date(fromTime);
      return isoValidFromTime.toLocaleString("en-US", {
        timeZone: this.airport.timezone.tzid,
      });
    },
    validToTime(toTime) {
      let isoValidToTime = new Date(toTime);
      return isoValidToTime.toLocaleString("en-US", {
        timeZone: this.airport.timezone.tzid,
      });
    },
    cloudText(cloud) {
      if (cloud.code === "SKC") return cloud.text;
      else
        return cloud.text + " at " + cloud.base_feet_agl.toLocaleString() + "'";
    },
    visibility(forecast) {
      if (forecast.visibility.miles === "Greater than 6") {
        return "6+ miles";
      } else {
        return forecast.visibility.miles_float + " miles";
      }
    },
  },
};
</script>

<style scoped>
</style>
