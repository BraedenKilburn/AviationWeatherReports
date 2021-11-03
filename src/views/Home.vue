<template>
  <div class="home">
    <main>
      <div class="container-fluid">
        <section class="showcase d-flex justify-content-center align-items-top text-center">
          <video src="videos/clouds.mp4" playsinline muted loop autoplay></video>
          <div class="text index mt-0 mt-lg-3">
            <h2>Aviation Weather Reports</h2>
            <h3>Keep your head out of the clouds</h3>
                <AirportSearch search-type = "home" v-bind:icao = airport />
            <div class=" error mt-5 p-3"></div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script>

import AirportSearch from "../components/airportSearch.vue"
export default {
  name: 'Home',
  components: {
    AirportSearch,
  },
  data() {
    return {
	   airport: '',
    }
  },
  methods: {

  },
}
</script>

<style scoped>

</style>
