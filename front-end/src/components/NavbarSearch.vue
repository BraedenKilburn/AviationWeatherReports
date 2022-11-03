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
        await Promise.all([
          this.getStationInfo(icao),
          this.getMetar(icao),
          this.getTaf(icao),
        ])

        // If we search on the home screen, redirect to the airport information tab
        if (window.location.pathname == '/') this.$router.push('/airport')
      } else {
        this.$root.$data.stationInfo = 'invalid'
        this.$root.$data.metarInfo = 'invalid'
        this.$root.$data.tafInfo = 'invalid'
      }
    },
    // Get the station info from backend
    async getStationInfo(icao) {
      this.url = `/api/airport/${icao}`
      const { data } = await axios.get(this.url).catch(() => {
        return {
          data: 'invalid',
        }
      })
      this.$root.$data.stationInfo = data
    },
    // Get the METAR from backend
    async getMetar(icao) {
      this.url = `/api/metar/${icao}`
      const { data } = await axios.get(this.url).catch(() => {
        return {
          data: 'invalid',
        }
      })
      this.$root.$data.metarInfo = data
    },
    // Get the TAF from backend
    async getTaf(icao) {
      this.url = `/api/taf/${icao}`
      const { data } = await axios.get(this.url).catch(() => {
        return {
          data: 'invalid',
        }
      })
      this.$root.$data.tafInfo = data
    },
  },
}
</script>
