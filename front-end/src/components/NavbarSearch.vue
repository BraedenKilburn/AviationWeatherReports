<template>
  <form @submit.prevent="update(icao)" class="form-inline navbarForm">
    <input
      v-model="icao"
      class="form-control mr-sm-2"
      name="airportCode"
      autocorrect="off"
      id="navbarICAO"
      type="search"
      placeholder="Airport ICAO"
      aria-label="Search"
    />
  </form>
</template>

<script>
const axios = require("axios");

export default {
  name: "NavbarSearch",
  data() {
    return {
      icao: "",
      url: "",
    };
  },
  methods: {
    // Set our global airport variable and call the API function
    async update(icao) {
      this.$root.$data.icao = icao;

      if (icao.length === 3 || icao.length === 4) {
        try {
          try {
            this.$root.$data.stationInfo = (
              await axios.get("/airport/" + icao)
            ).data;

            try {
              this.$root.$data.metarInfo = (
                await axios.get("/metar/" + icao)
              ).data;

              try {
                this.$root.$data.tafInfo = (
                  await axios.get("/taf/" + icao)
                ).data;
              } catch (error) {
                this.$root.$data.tafInfo = "invalid";
              }
            } catch (error) {
              this.$root.$data.metarInfo = "invalid";
              this.$root.$data.tafInfo = "invalid";
            }

            // If we search on the home screen, redirect to the airport information tab
            if (window.location.pathname == "/") this.$router.push("/airport");
          } catch (error) {
            this.$root.$data.stationInfo = "invalid";
            this.$root.$data.metarInfo = "invalid";
            this.$root.$data.tafInfo = "invalid";
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        this.$root.$data.stationInfo = "invalid";
      }
    },
  },
};
</script>
