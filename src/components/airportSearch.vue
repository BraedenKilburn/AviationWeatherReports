<template>
<form v-on:submit.prevent class="d-flex justify-content-center mt-4 mr-4 mainForm" action="">
    <input v-model="icao" type="search" name="airportCode" id="mainICAO" placeholder="Airport ICAO" autocorrect="off">
    <button v-on:click="update(icao)" type="submit" class="btn btn-outline-light">Search</button>
</form>
</template>

<script>
const axios = require("axios");

export default {
  name: 'AirportSearch',
  data() {
    return {
      icao: "",
      url: "",
    }
  },
  methods: {
    // Set our global airport variable and call the API function
    async update(airport) {
      this.$root.$data.currAirport = airport;

      // TODO: This is a lot of API calls, can I cache the responses so I don't unnecessarily
      // make a request for the same airport within the valid time (when nothing would have changed)?
      // METAR and TAF requests could be requested and cached for at least 15 minutes
      // Station requests could be cached for at least 24 hours

      // Grab and save station info
      let searchType = "station";
      this.buildURL(this.$root.$data.currAirport, searchType);
      await this.fetch(searchType);

      // Grab and save METAR info
      searchType = "metar";
      this.buildURL(this.$root.$data.currAirport, searchType);
      await this.fetch(searchType);

      // Grab and save TAF info
      searchType = "taf";
      this.buildURL(this.$root.$data.currAirport, searchType);
      await this.fetch(searchType);
    },

    // Function to set URL for API call
    buildURL(icao, searchType) {
      const key = "/?x-api-key=6d49d388dad844158755caf13c";
      const url = "https://api.checkwx.com";

      if (searchType === "station") {
        this.url = url + "/" + searchType + "/" + icao + key;
      }
      else {
        this.url = url + "/" + searchType + "/" + icao + "/decoded" + key;
      }
    },

    // Fetches and stores API data in data
    async fetch(searchType) {
      // Fetch
      const res = await axios.get(this.url);
      const json = res.data;

      // Store Station info
      if (searchType === "station")
        this.$root.$data.stationInfo = json.data[0];
      // Store METAR info
      else if (searchType === "metar")
        this.$root.$data.metarInfo = json.data[0];
      // Store TAF info
      else if (searchType === "taf")
        this.$root.$data.tafInfo = json.data[0];
    },
  },
}
</script>
