<template>
    <main>
        <div class="container-fluid">
            <section class="showcase airport d-flex justify-content-center align-items-top text-center">
                <video src="/videos/foggy.mp4" playsinline muted loop autoplay></video>
                <div class="overlay"></div>
                <div class="text metar">
                    <div class="row metar" id="airportName">
                        <!-- Airport Name -->
                    </div>
                    <div class="row metar" id="observedTime">
                        <!-- METAR Observed Time -->
                    </div>
                    <div class="row metar justify-content-center" id="flightCategory">
                        <!-- Flight Category (VFR, MVFR, IFR, LIFR) -->
                    </div>
                    <div class="container metar mt-4 mt-lg-0">
                        <!-- If there's no METAR report retrieved yet, provide a form -->
                        <MainSearchForm v-if="this.$root.$data.metarInfo === null" header="METAR Report" />
                        <!-- If there is a METAR report saved already, display it instead -->
                        <h2 v-else> {{ this.$root.$data.metarInfo }} </h2>
                    </div>
                </div>
            </section>
        </div>
    </main>

</template>

<script>
import MainSearchForm from "../components/MainSearchForm.vue"

export default {
  name: 'METAR',
  components: {
    MainSearchForm,
  },
  data() {
    return {
    }
  },
  methods: {
      // Check if metarInfo != null
      // If null, serve AirportSearch component
      // Else, display airport info from metarInfo object
  },
}
</script>

<style scoped>

</style>
