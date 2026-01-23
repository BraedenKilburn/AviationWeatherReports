<script setup lang="ts">
import { computed } from 'vue'
import AirportForm from './components/AirportForm.vue'
import StationData from './components/StationData.vue'
import MetarData from './components/MetarData.vue'
import TafData from './components/TafData.vue'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import ProgressSpinner from 'primevue/progressspinner'
import Message from 'primevue/message'
import { useAirportData } from './composables/useAirportData'

const { metarData, stationData, tafData, loading, error } = useAirportData()

const defaultTab = computed(() => {
  if (stationData.value) return 'station'
  if (metarData.value) return 'metar'
  if (tafData.value) return 'taf'
  return 'station'
})
</script>

<template>
  <main>
    <div class="container">
      <h1>Aviation Weather Report</h1>
      <AirportForm />

      <!-- Loading state -->
      <div v-if="loading" class="loading-container">
        <ProgressSpinner />
        <p>Fetching airport data...</p>
      </div>

      <!-- Error state when all fetches failed -->
      <Message v-else-if="error" severity="error" :closable="false" class="error-message">{{
        error
      }}</Message>

      <!-- Tabs shown when any data exists -->
      <Tabs v-else-if="stationData || metarData || tafData" :value="defaultTab" class="data-tabs">
        <TabList>
          <Tab v-if="stationData" value="station">Station</Tab>
          <Tab v-if="metarData" value="metar">METAR</Tab>
          <Tab v-if="tafData" value="taf">TAF</Tab>
        </TabList>
        <TabPanels>
          <TabPanel v-if="stationData" value="station">
            <StationData />
          </TabPanel>
          <TabPanel v-if="metarData" value="metar">
            <MetarData />
          </TabPanel>
          <TabPanel v-if="tafData" value="taf">
            <TafData />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem 1rem;
  min-height: 100vh;
}

.container {
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

h1 {
  text-align: center;
  margin: 0;
}

.data-tabs {
  width: 100%;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  gap: 1rem;
}

.loading-container p {
  margin: 0;
  color: var(--p-text-muted-color);
  font-size: 0.95rem;
}

.error-message {
  align-self: center;
}
</style>
