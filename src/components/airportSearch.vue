<template>
<form v-on:submit.prevent class="d-flex justify-content-center mt-4 mr-4 mainForm" action="">
    <input v-on="update(icao, searchType)" v-model="icao" type="search" name="airportCode" id="mainICAO" :placeholder=this.$root.$data.currAirport autocorrect="off">
    <button type="submit" class="btn btn-outline-light">Search</button>
    <p>I mustache you a question {{this.$root.$data.response}}</p>
</form>
</template>

<script>
</script>


<script>
export default {
  name: 'AirportSearch',
  props: {
    icao: 'value',
    searchType: String,
    },
  methods: {
    async getData(icao,searchType) {
    const key = "/?x-api-key=6d49d388dad844158755caf13c";
    const url = "https://api.checkwx.com";
    try {
      var fullURL = url + "/" + searchType + "/" + icao + key;

      const res = await axios.get(fullURL);
      const json = res.data;

      // Throw error for an empty object
      if (json.results === 0) throw "Invalid Airport";
      return json.data[0];
    } catch (e) {
      console.log("Error:", e);
    }
    },
    update(airport, searchType) {
      if (airport != "") {
      this.$root.$data.currAirport = airport;
      }
      if (searchType != "home") {
        this.getData(this.$root.$data.currAirport, searchType);
      }
    },

  }
}
</script>
