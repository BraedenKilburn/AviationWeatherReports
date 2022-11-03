<template>
  <div class="home">
    <main>
      <div class="container-fluid">
        <section
          class="showcase d-flex justify-content-center align-items-top text-center"
        >
          <video
            src="videos/clouds.mp4"
            playsinline
            muted
            loop
            autoplay
          ></video>
          <div class="text index mt-0 mt-lg-3">
            <h2>Aviation Weather Reports</h2>
            <h3>Keep your head out of the clouds</h3>

            <AirportSearch />
            <div
              class="error mt-5 p-3"
              v-if="this.$root.$data.stationInfo === 'invalid'"
            >
              <div>
                <h4>Invalid Airport</h4>
                <h5>
                  {{ this.$root.$data.icao }} is unrecognized. Try again using
                  the ICAO standard naming convention
                </h5>
              </div>
            </div>
          </div>

          <Footer />
        </section>
      </div>
    </main>
  </div>
</template>

<script>
import AirportSearch from '@/components/AirportSearch.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'Home',
  components: {
    AirportSearch,
    Footer,
  },
  methods: {},
}
</script>

<style scoped>
.error {
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 25px;
  position: relative;
}

h4 {
  text-decoration: underline;
}
</style>
