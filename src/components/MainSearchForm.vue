<template>
    <div class="text index mt-0 mt-lg-3">
        <h2>{{ header }}</h2>
        <h3>Aviation Weather Reports</h3>

        <AirportSearch />

        <div class="error mt-5 p-3"></div>
    </div>
</template>

<script>
import AirportSearch from "../components/airportSearch.vue"

export default {
  name: 'MainSearchForm',
  components: {
    AirportSearch,
  },
  props: {
      header: String,
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