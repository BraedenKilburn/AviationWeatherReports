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
                        <!-- If there's no Airport Information retrieved yet, provide a form -->
                        <MainSearchForm v-if="this.$root.$data.stationInfo === null" header="Airport Information" />
                        <!-- If there is Airport Information saved already, display it instead -->
                        <h2 v-else> {{ this.$root.$data.stationInfo }} </h2>
                    </div>
                </div>
            </section>
        </div>
    </main>
</template>


<script>
import MainSearchForm from "../components/MainSearchForm.vue"

export default {
  name: 'Airport',
  components: {
    MainSearchForm,
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
