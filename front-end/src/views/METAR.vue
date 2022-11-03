<template>
  <main>
    <div class="container-fluid">
      <section
        class="showcase airport d-flex justify-content-center align-items-top text-center"
      >
        <video src="/videos/foggy.mp4" playsinline muted loop autoplay></video>
        <div class="overlay"></div>

        <!-- If there's no METAR report retrieved yet, provide a form -->
        <MainSearchForm
          v-if="this.$root.$data.metarInfo === null"
          header="METAR Report"
        />

        <!-- If there's no stationInfo or metarInfo, alert the user and give them a new form -->
        <InvalidRequest
          v-else-if="this.$root.$data.metarInfo === 'invalid'"
          header="METAR not available"
          from="METAR Report"
        />

        <!-- If there is a METAR report saved already, display it instead -->
        <MetarReport
          v-else
          :airport="this.$root.$data.stationInfo"
          :metar="this.$root.$data.metarInfo"
        />

        <Footer />
      </section>
    </div>
  </main>
</template>

<script>
import MainSearchForm from '../components/MainSearchForm.vue'
import MetarReport from '../components/MetarReport.vue'
import InvalidRequest from '../components/InvalidRequest.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'METAR',
  components: {
    MainSearchForm,
    MetarReport,
    InvalidRequest,
    Footer,
  },
}
</script>

<style scoped>
/* Mobile Styles */

@media only screen and (max-width: 429px) {
  .showcase {
    flex-direction: column;
  }
}
</style>
