<template>
  <div class="text metar">
    <div class="container metar mt-4 mt-lg-0">
      <div class="text index mt-0 mt-lg-3">
        <h2>{{ header }}</h2>
        <h3>Aviation Weather Reports</h3>
        <AirportSearch />
      </div>
    </div>
  </div>
</template>

<script>
import AirportSearch from './AirportSearch.vue'

export default {
  name: 'MainSearchForm',
  components: {
    AirportSearch,
  },
  props: {
    header: String,
  },
  data() {
    return {}
  },
  methods: {},
}
</script>
