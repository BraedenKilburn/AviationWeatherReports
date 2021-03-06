<template>
  <div class="text metar">
    <div class="row metar" id="airportName">
      <h1 class="col p-2 pb-sm-0 mb-sm-0 text-center">{{ airportName }}</h1>
    </div>
    <div class="row metar" id="observedTime">
      <h4 class="col p-2 mb-sm-0 text-center">{{ observedTime }}</h4>
    </div>
    <div class="row metar justify-content-center">
      <h2
        class="col-3 col-lg-1 m-lg-4 mb-sm-0 text-center"
        v-bind:style="{ color: flightCategoryColor }"
        id="flightCategory"
      >
        <span class="metar"> {{ flightCategory }} </span>
      </h2>
    </div>

    <div class="container metar mt-4 mt-lg-0">
      <div class="row d-flex align-items-center location-metar">
        <div class="col-md-4 col-sm-12 mb-3" id="wind">
          <img height="70px" src="/images/wind.svg" alt="Wind" />
          <h3 class="m-0 p-0">Wind:</h3>
          <h3>{{ wind }}</h3>
        </div>

        <div class="col-md-4 col-sm-12 mb-3" id="clouds">
          <img height="70px" src="/images/cloud.svg" alt="Cloud" />
          <h3 class="m-0 pb-2">Clouds (AGL):</h3>
          <h3 v-for="cloud in metar.clouds" :key="cloud.index">
            {{ cloudText(cloud) }}
          </h3>
        </div>

        <div class="col-md-4 col-sm-12 mb-3" id="temperature">
          <img height="70px" src="/images/temperature.svg" alt="Temperature" />
          <h3 class="m-0 p-0">Temperature</h3>
          <h3>{{ temperature }}</h3>
        </div>
      </div>
      <div class="row d-flex align-items-center location-metar">
        <div class="col-md-4 col-sm-12 mb-3" id="visibility">
          <img height="70px" src="/images/visibility.svg" alt="Visibility" />
          <h3 class="m-0 p-0">Visibility:</h3>
          <h3>{{ visibility }}</h3>
        </div>

        <div class="col-md-4 col-sm-12 mb-3" id="barometer">
          <img height="70px" src="/images/barometer.svg" alt="Altimeter" />
          <h3 class="m-0 p-0">Altimeter</h3>
          <h3>{{ barometer }}</h3>
        </div>

        <div class="col-md-4 col-sm-12 mb-3" id="dewpoint">
          <img height="70px" src="/images/dewpoint.svg" alt="Dewpoint" />
          <h3 class="mb-2 p-0">Dewpoint</h3>
          <h3>{{ dewpoint }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MetarReport",
  data() {
    return {
      flightCategoryColor: "green", // Default VFR green
    };
  },
  props: {
    airport: Object,
    metar: Object,
  },
  computed: {
    airportName: function () {
      let airportICAO = this.metar.icao;
      let name = this.metar.station.name;
      return airportICAO + " - " + name;
    },
    observedTime: function () {
      let isoDate = new Date(this.metar.observed);
      let time = isoDate.toLocaleString("en-US", {
        timeZone: this.airport.timezone.tzid,
      });
      let zone = this.airport.timezone.zone;

      // If the time zone name is undefined, use the tzid instead
      if (zone === undefined) zone = this.airport.timezone.tzid;

      return "Observed: " + time + " " + zone;
    },
    flightCategory: function () {
      let flight_category = this.metar.flight_category;
      this.updateFlightCategoryColor(flight_category);
      return flight_category;
    },
    wind: function () {
      if (this.metar.wind !== undefined) {
        let windDirection = this.metar.wind.degrees;
        let windSpeed = this.metar.wind.speed_kts;

        return windDirection + "° at " + windSpeed + "kts";
      } else {
        return "0° at 0kts";
      }
    },
    temperature: function () {
      let tempC = this.metar.temperature.celsius;
      let tempF = this.metar.temperature.fahrenheit;

      return tempF + "°F / " + tempC + "°C";
    },
    visibility: function () {
      return this.metar.visibility.miles + " miles";
    },
    barometer: function () {
      return this.metar.barometer.hg.toFixed(2) + " inHg";
    },
    dewpoint: function () {
      let dewpointC = this.metar.dewpoint.celsius;
      let dewpointF = this.metar.dewpoint.fahrenheit;

      return dewpointF + "°F / " + dewpointC + "°C";
    },
  },
  methods: {
    updateFlightCategoryColor(flight_category) {
      if (flight_category === "VFR") this.flightCategoryColor = "green";
      else if (flight_category === "MVFR") this.flightCategoryColor = "blue";
      else if (flight_category === "IFR") this.flightCategoryColor = "red";
      else if (flight_category === "LIFR") this.flightCategoryColor = "magenta";
    },
    cloudText(cloud) {
      if (cloud.code === "SKC" || cloud.code === "CLR") return cloud.text;
      else
        return cloud.text + " at " + cloud.base_feet_agl.toLocaleString() + "'";
    },
  },
};
</script>

<style scoped>
#flightCategory {
  font-weight: 700;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 25px;
  padding-left: 40px;
  padding-right: 40px;
  width: auto;
}

.container.metar {
  min-width: 100%;
}

.location-metar {
  min-height: 30vh;
}
</style>