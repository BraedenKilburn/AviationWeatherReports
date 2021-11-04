<template>
    <main>
        <div class="container-fluid">
            <section class="showcase airport d-flex justify-content-center align-items-top text-center">
                <video src="/videos/valley.mp4" playsinline muted loop autoplay></video>
                <div class="overlay"></div>
                <div class="text">
                    <!-- Airport Name Heading -->
                    <div class="row text-center" id="airportName"></div>
                    <div class="container">
                        <div class="text index">
                            <h2>Airport Information</h2>
                            <h3>Aviation Weather Reports</h3>

                            <AirportSearch />

                            <div class="error mt-5 p-3"></div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </main>
</template>


<script>
import AirportSearch from "../components/airportSearch.vue"

export default {
  name: 'Airport',
  components: {
    AirportSearch,
  },
  data() {
    return {
    }
  },
  methods: {
  },
}
</script>

<style scoped>

.showcase.airport {
    padding: 0%;
}

</style>
