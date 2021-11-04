<template>
    <main>
        <div class="container-fluid">
            <section class="showcase airport d-flex justify-content-center align-items-top text-center">
                <video src="/videos/foggy.mp4" playsinline muted loop autoplay></video>
                <div class="overlay"></div>
                
                <!-- If there's no METAR report retrieved yet, provide a form -->
                <MainSearchForm v-if="this.$root.$data.metarInfo === null" header="METAR Report" />

                <!-- If there is a METAR report saved already, display it instead -->
                <MetarReport v-else />
            </section>
        </div>
    </main>

</template>

<script>
import MainSearchForm from "../components/MainSearchForm.vue"
import MetarReport from "../components/MetarReport.vue"

export default {
  name: 'METAR',
  components: {
    MainSearchForm,
    MetarReport,
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

</style>
