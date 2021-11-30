<template>
    <div class="text metar">
      <div class="row metar" id="airportName"><h1 class="col p-2 pb-sm-0 mb-sm-0 text-center">{{airportName}}</h1></div>
      <div class="row metar" id="startingTime"><h3 class="col p-2 mb-sm-0 text-center">{{startTime}}</h3></div>
      <div class="row metar" id="endingTime"><h3 class="col p-2 mb-sm-4 text-center">{{endTime}}</h3></div>
      <div id="setup" display:none>{{addNumsToForecast()}}</div>
      <div class="container metar taf mt-4 mt-lg-0" id="tafTable" v-for="forecast in taf.forecast" v-bind:key="forecast.timestamp">
        <div class="row time-period justify-content-center" id="validTimePeriod0">
          <h4 class="col-12 col-lg-9 mb-3 mb-md-0 text-center">{{validFromTime(forecast)}} to {{validToTime(forecast)}} {{airport.timezone.zone}}</h4>
        </div>
        <div class="row d-flex align-items-center location">
          <div class="col-md-4 col-sm-12 mb-3" id="winds0">
            <img height="70px" src="/images/wind.svg" alt="Wind">
            <h3 class="m-0 p-0">Wind:</h3>
            <h3>{{forecast.wind.degrees}}° at {{forecast.wind.speed_kts}}kts</h3>
          </div>
          <div class="col-md-4 col-sm-12 mb-3" id="clouds0">
            <img height="70px" src="/images/cloud.svg" alt="Cloud">
            <h3 class="m-0 pb-2">Clouds (AGL):</h3>
            <h3 v-for="cloud in forecast.clouds" v-bind:key="cloud.index">{{cloudText(cloud)}}</h3>
          </div>
          <div class="col-md-4 col-sm-12 mb-3" id="visibility0">
            <img height="70px" src="/images/visibility.svg" alt="Visibility">
            <h3 class="m-0 p-0">Visibility:</h3>
            <h3>{{visibility(forecast)}}</h3>
          </div>
        </div>
      </div>
    </div>
</template>

<script>

export default {
    name: "TafReport",
    data() {
        return {
            taf: this.$root.$data.tafInfo,
            airport: this.$root.$data.stationInfo,
        };
    },
    computed: {
        airportName: function() {
            let airportICAO = this.taf.icao;
            let name = this.taf.station.name;
            return airportICAO + ' - ' + name;
        },
        startTime: function() {
            let isoFromDate = new Date(this.taf.timestamp.from);
            let startingTime = isoFromDate.toLocaleString("en-US", {
              timeZone: this.airport.timezone.tzid,
            });
            let zone = this.airport.timezone.zone;

            // If the time zone name is undefined, use the tzid instead
            if (zone === undefined) zone = this.airport.timezone.tzid;

            return "From: " + startingTime + " " + zone;
        },
        endTime: function() {
            let isoToDate = new Date(this.taf.timestamp.to);
            let endingTime = isoToDate.toLocaleString("en-US", {
              timeZone: this.airport.timezone.tzid,
            });
            let zone = this.airport.timezone.zone;

            // If the time zone name is undefined, use the tzid instead
            if (zone === undefined) zone = this.airport.timezone.tzid;

            return "From: " + endingTime + " " + zone;
        },
    },
    methods: {
      addNumsToForecast() {
        for (let i = 0; i < this.taf.forecast.length; i++) {
          this.taf.forecast[i].index = i;
          for (let j = 0; j < this.taf.forecast[i].clouds.length; j++) {
            this.taf.forecast[i].clouds[j].cloudIndex = j;
          }
        }
      },
      validFromTime(forecast) {
        let fromTime = forecast.timestamp.from;
        let isoValidFromTime = new Date(fromTime);
        return isoValidFromTime.toLocaleString("en-US", {timeZone: this.airport.timezone.tzid})
      },
      validToTime(forecast) {
        let toTime = forecast.timestamp.to;
        let isoValidToTime = new Date(toTime);
        return isoValidToTime.toLocaleString("en-US", {timeZone: this.airport.timezone.tzid})
      },
      cloudText(cloud) {
        if (cloud.code === "SKC")
          return cloud.text;
        else
          return cloud.text + " at " + cloud.base_feet_agl.toLocaleString() + "'";
      },
      visibility(forecast) {
        if (forecast.visibility.miles === "Greater than 6"){
           return "6+ miles";
        }
        else {
          return forecast.visibility.miles + " miles";
        }
      }
    },
    mounted() {
        // Do this after the page has been loaded
        this.$nextTick(function () {
            // Update class depending on flight category (necessary for styling)
            let flightCategory = this.$root.$data.metarInfo.flight_category.toLowerCase();
            document.querySelector("#flightCategory").classList.add(flightCategory);
        })
    },
};
</script>

<style scoped>

</style>
