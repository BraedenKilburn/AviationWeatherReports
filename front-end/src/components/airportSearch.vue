<template>
  <div>
    <form
      @submit.prevent
      class="d-flex justify-content-center mt-4 mr-4 mainForm"
    >
      <input
        v-model="icao"
        type="search"
        name="airportCode"
        id="mainICAO"
        placeholder="Airport ICAO"
        autocorrect="off"
      />
      <button @click="update(icao)" type="submit" class="btn btn-outline-light">
        Search
      </button>
    </form>
    <br />
    <p>{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AirportSearch',
  data() {
    return {
      icao: '',
      url: '',
      message: '',
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
        console.error('Invalid ICAO')
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
