<template>
<div>
<form @submit.prevent class="d-flex justify-content-center mt-4 mr-4 mainForm" action="">
    <input v-model="icao" type="search" name="airportCode" id="mainICAO" placeholder="Airport ICAO" autocorrect="off">
    <button @click="update(icao)" type="submit" class="btn btn-outline-light">Search</button>
</form>
<br/>
<p>{{message}}</p>
</div>
</template>

<script>
const axios = require("axios");

export default {
  name: 'AirportSearch',
  data() {
    return {
      icao: "",
      url: "",
      message: "",
    }
  },
  methods: {
    // Set our global airport variable and call the API function
    async update(icao) {
      this.$root.$data.stationInfo = (await axios.get("/airport/" + icao)).data;
      this.$root.$data.metarInfo = (await axios.get("/metar/" + icao)).data;
      this.$root.$data.tafInfo = (await axios.get("/taf/" + icao)).data;

      // If we search on the home screen, redirect to the airport information tab
      if (window.location.pathname == '/')
        this.$router.push("/airport");
    },

    // Fetches and stores API data in data (old method)
    // async fetch(searchType) {
    //   // Fetch
    //   const res = await axios.get(this.url);
    //   const json = res.data;

    //   // Store Station info
    //   if (searchType === "station")
    //     this.$root.$data.stationInfo = json.data[0];
    //   // Store METAR info
    //   else if (searchType === "metar")
    //     this.$root.$data.metarInfo = json.data[0];
    //   // Store TAF info
    //   else if (searchType === "taf") {
    //     this.$root.$data.tafInfo = json.data[0];
    //     if (res.data.data.length === 0) {
    //       this.$root.$data.tafInfo = "invalid";
    //     }
    //     else {
    //       if (window.location.pathname == '/') {
    //         this.$router.push("/airport")
    //       }
    //     }
    //   }
    // },
  },
}
</script>
