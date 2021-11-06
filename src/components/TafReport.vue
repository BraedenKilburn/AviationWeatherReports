<template>
    <div class="text metar">
                    <div class="row metar" id="airportName"><h1 class="col p-2 pb-sm-0 mb-sm-0 text-center">{{airportName}}</h1></div>
                    <div class="row metar" id="startingTime"><h3 class="col p-2 mb-sm-0 text-center">From: 11/5/2021, 2:00:00 PM EDT</h3></div>
                    <div class="row metar" id="endingTime"><h3 class="col p-2 mb-sm-4 text-center">To: 11/6/2021, 2:00:00 PM EDT</h3></div>
                    <div class="container metar taf mt-4 mt-lg-0" id="tafTable"><div class="row time-period justify-content-center" id="validTimePeriod0"><h4 class="col-12 col-lg-9 mb-3 mb-md-0 text-center">11/5/2021, 2:00:00 PM to 11/5/2021, 7:00:00 PM EDT</h4></div><div class="row d-flex align-items-center location"><div class="col-md-4 col-sm-12 mb-3" id="winds0"><img height="70px" src="/images/assets/wind.svg" alt="Wind"><h3 class="m-0 p-0">Wind:</h3><h3>20° at 12kts</h3></div><div class="col-md-4 col-sm-12 mb-3" id="clouds0"><img height="70px" src="/images/assets/cloud.svg" alt="Cloud"><h3 class="m-0 pb-2">Clouds (AGL):</h3><h3>Clear skies</h3></div><div class="col-md-4 col-sm-12 mb-3" id="visibility0"><img height="70px" src="/images/assets/visibility.svg" alt="Visibility"><h3 class="m-0 p-0">Visibility:</h3><h3>6+ miles</h3></div></div><div class="row time-period justify-content-center" id="validTimePeriod1"><h4 class="col-12 col-lg-9 mb-3 mb-md-0 text-center">11/5/2021, 7:00:00 PM to 11/6/2021, 2:00:00 PM EDT</h4></div><div class="row d-flex align-items-center location"><div class="col-md-4 col-sm-12 mb-3" id="winds1"><img height="70px" src="/images/assets/wind.svg" alt="Wind"><h3 class="m-0 p-0">Wind:</h3><h3>20° at 5kts</h3></div><div class="col-md-4 col-sm-12 mb-3" id="clouds1"><img height="70px" src="/images/assets/cloud.svg" alt="Cloud"><h3 class="m-0 pb-2">Clouds (AGL):</h3><h3>Clear skies</h3></div><div class="col-md-4 col-sm-12 mb-3" id="visibility1"><img height="70px" src="/images/assets/visibility.svg" alt="Visibility"><h3 class="m-0 p-0">Visibility:</h3><h3>6+ miles</h3></div></div></div>
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
    },
    methods: {
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
#flightCategory {
    font-weight: 700;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 25px;
    padding-left: 40px;
    padding-right: 40px;
    width: auto;
}

.vfr {
    color: green;
}

.mvfr {
    color: blue;
}

.ifr {
    color: red;
}

.lifr {
    color: magenta;
}

.container.metar {
  min-width: 100%;
}

.location-metar {
    min-height: 30vh;
}
</style>
