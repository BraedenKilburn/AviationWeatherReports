<template>
    <main>
        <div class="container-fluid">
            <section class="showcase airport d-flex justify-content-center align-items-top text-center">
                <video src="/videos/foggyMountains.mp4" playsinline muted loop autoplay></video>
                <div class="overlay taf"></div>
                <!-- If there's no TAF Forecast retrieved yet, provide a form -->
                <MainSearchForm v-if="this.$root.$data.tafInfo === null" header="TAF Forecast" />

                <!-- If there's no stationInfo, metarInfo, or tafInfo, we alert the user and give them a new form -->
                <InvalidRequest v-else-if="this.$root.$data.tafInfo === 'invalid'" header="TAF not available" from="TAF Forecast" />

                <!-- If there is a TAF forecast saved already, display it instead -->
                <TafReport v-else :airport="this.$root.$data.stationInfo" :taf="this.$root.$data.tafInfo" />
                
                <Footer />
            </section>
        </div>
    </main>
</template>

<script>
import MainSearchForm from "../components/MainSearchForm.vue"
import TafReport from "../components/TafReport.vue"
import InvalidRequest from "../components/InvalidRequest.vue"
import Footer from "../components/Footer.vue"

export default {
  name: 'TAF',
  components: {
    MainSearchForm,
    TafReport,
    InvalidRequest,
    Footer,
  },
  data() {
    return {
    }
  },
}
</script>

<style scoped>
.overlay.taf {
    background: rgba(0, 0, 0, 0.6);
}
</style>
