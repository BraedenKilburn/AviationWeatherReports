<template>
    <div>
        <MainSearchForm v-if="header === 'Invalid Airport'" :header="from" />
        <MainSearchForm v-else-if="header === 'METAR not available'" :header="from" />
        <MainSearchForm v-else-if="header === 'TAF not available'" :header="from" />
        
        <div class="error mt-5 p-3">
            <h4>{{ header }}</h4>
            <h5>{{ errorMessge }}</h5>
        </div>
    </div>
</template>

<script>
import MainSearchForm from "../components/MainSearchForm.vue"

export default {
    name: "InvalidRequest",
    components: {
        MainSearchForm,
    },
    props: {
      header: String,
      from: String,
    },
    data() {
        return{

        }
    },
    computed: {
        errorMessge: function() {
            if (this.header === 'Invalid Airport')
                return "Try again using the ICAO standard naming convention";
            else if (this.header === 'METAR not available')
                return "This airport does not report METAR information";
            else if (this.header === 'TAF not available')
                return "This airport does not report TAF forecasts";
            else
                return "Error Encountered!";
        }
    },
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