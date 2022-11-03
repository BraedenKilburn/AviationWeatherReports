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
import axios from 'axios'

export default {
  name: 'NavbarSearch',
  data() {
    return {
      icao: '',
      url: '',
    }
  },
  methods: {
    // Set our global airport variable and call the API function
    async update(icao) {
      this.$root.$data.icao = icao

      if (icao.length === 3 || icao.length === 4) {
        try {
          await Promise.all([
            this.getStationInfo(icao),
            this.getMetar(icao),
            this.getTaf(icao),
          ])

          // If we search on the home screen, redirect to the airport information tab
          if (window.location.pathname == '/') this.$router.push('/airport')
        } catch (error) {
          console.error(error)
          this.$root.$data.stationInfo = 'invalid'
        }
      } else {
        console.error('Invalid ICAO')
        this.$root.$data.stationInfo = 'invalid'
      }
    },
    // Get the station info from backend
    async getStationInfo(icao) {
      this.url = `/api/airport/${icao}`
      const response = await axios.get(this.url)
      this.$root.$data.stationInfo = response.data
    },
    // Get the METAR from backend
    async getMetar(icao) {
      this.url = `/api/metar/${icao}`
      const response = await axios.get(this.url)
      this.$root.$data.metarInfo = response.data
    },
    // Get the TAF from backend
    async getTaf(icao) {
      this.url = `/api/taf/${icao}`
      const response = await axios.get(this.url)
      this.$root.$data.tafInfo = response.data
    },
  },
}
</script>
