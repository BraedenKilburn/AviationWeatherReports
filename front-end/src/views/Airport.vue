<template>
    <main>
        <div class="container-fluid">
            <section class="showcase airport d-flex justify-content-center align-items-top text-center">
                <video src="/videos/valley.mp4" playsinline muted loop autoplay></video>
                <div class="overlay"></div>

                <!-- If there's no airport information retrieved yet, provide a form -->
                <MainSearchForm v-if="this.$root.$data.stationInfo === null" header="Airport Information" />

                <!-- If there's no stationInfo, alert the user and give them a new form -->
                <InvalidRequest v-else-if="this.$root.$data.stationInfo === undefined" header="Invalid Airport" from="Airport Information" />

                <!-- If there is a station report saved already, display it instead -->
                <AirportReport v-else/>

                <Footer />
            </section>
        </div>
    </main>
</template>


<script>
import MainSearchForm from "../components/MainSearchForm.vue"
import InvalidRequest from "../components/InvalidRequest.vue"
import Footer from "../components/Footer.vue"
import AirportReport from "../components/AirportReport.vue"

export default {
  name: 'Airport',
  components: {
    MainSearchForm,
    InvalidRequest,
    AirportReport,
    Footer,
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

.text.metar {
    position: relative;
    z-index: 10;
    padding-top: 6vh;
}

.showcase.airport {
    padding: 0%;
}

/* Mobile Styles */

@media only screen and (max-width: 429px) {
  .showcase {
    flex-direction: column;
  }
  footer {
      margin-top: 20px;
  }
}
</style>
