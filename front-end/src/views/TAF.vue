<template>
    <main>
        <div class="container-fluid">
            <section class="showcase airport d-flex justify-content-center align-items-top text-center">
                <video src="/videos/foggyMountains.mp4" playsinline muted loop autoplay></video>
                <div class="overlay taf"></div>
                <div class="text metar">
                    <div class="row metar" id="airportName">
                        <!-- Airport Header -->
                    </div>
                    <div class="row metar" id="startingTime">
                        <!-- From Header -->
                    </div>
                    <div class="row metar" id="endingTime">
                        <!-- To Header -->
                    </div>
                    <div class="container metar taf mt-4 mt-lg-0" id="tafTable">
                        <!-- If there's no TAF Forecast retrieved yet, provide a form -->
                        <MainSearchForm v-if="this.$root.$data.tafInfo === null" header="TAF Forecast" />
                        <!-- If there is a TAF forecast saved already, display it instead -->
                        <TafReport v-else :airport="this.$root.$data.stationInfo" :taf="this.$root.$data.tafInfo" />
                    </div>
                </div>
                <Footer />
            </section>
        </div>
    </main>

</template>

<script>
import MainSearchForm from "../components/MainSearchForm.vue"
import TafReport from "../components/TafReport.vue"
import Footer from "../components/Footer.vue"

export default {
  name: 'TAF',
  components: {
    MainSearchForm,
    TafReport,
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
