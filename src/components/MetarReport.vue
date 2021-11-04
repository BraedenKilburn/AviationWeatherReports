<template>
    <div class="text metar">
        <div class="row metar" id="airportName">
            <h1 class="col p-2 pb-sm-0 mb-sm-0 text-center"> {{ airportName }} </h1>
        </div>
        <div class="row metar" id="observedTime">
            <h4 class="col p-2 mb-sm-0 text-center"> {{ observedTime }} </h4>
        </div>
        <div class="row metar justify-content-center">
            <h2 class="col-3 col-lg-1 m-lg-4 mb-sm-0 text-center" id="flightCategory">
                <span class="metar"> {{ flightCategory }} </span>
            </h2>
        </div>

        <div class="container metar mt-4 mt-lg-0">
            <div class="row d-flex align-items-center location-metar">
                <div class="col-md-4 col-sm-12 mb-3" id="wind">
                <img height="70px" src="/images/wind.svg" alt="Wind">
                <h3 class="m-0 p-0"> {{ wind }} </h3>
                </div>

                <Clouds />

                <div class="col-md-4 col-sm-12 mb-3" id="temperature">
                <!-- Temperature -->
                </div>
            </div>
            <div class="row d-flex align-items-center location-metar">
                <div class="col-md-4 col-sm-12 mb-3" id="visibility">
                <!-- Visibility -->
                </div>

                <div class="col-md-4 col-sm-12 mb-3" id="barometer">
                <!-- Barometer/Altimeter -->
                </div>

                <div class="col-md-4 col-sm-12 mb-3" id="dewpoint">
                <!-- Dewpoint -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Clouds from "../components/CloudReport.vue"

export default {
    name: "MetarReport",
    data() {
        return {
            airport: this.$root.$data.stationInfo,
            metar: this.$root.$data.metarInfo,
        };
    },
    components: {
        Clouds,
    },
    computed: {
        airportName: function() {
            let airportICAO = this.metar.icao;
            let name = this.metar.station.name;
            return airportICAO + ' - ' + name;
        },
        observedTime: function() {
            let isoDate = new Date(this.metar.observed);
            let time = isoDate.toLocaleString("en-US", {timeZone: this.airport.timezone.tzid});
            let zone = this.airport.timezone.zone;

            // If the time zone name is undefined, use the tzid instead
            if (zone === undefined) 
                zone = this.airport.timezone.tzid;

            return 'Observed: ' + time + ' ' + zone;
        },
        flightCategory: function() {
            return this.metar.flight_category;
        },
        wind: function() {
            if (this.metar.wind !== undefined)
            {
                let windDirection = this.metar.wind.degrees;
                let windSpeed = this.metar.wind.speed_kts;

                return "Wind: " +  windDirection + "° at " + windSpeed + "kts";
            }
            else
            {
                return "Wind: 0° at 0kts";
            }
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
    padding-left: 19px;
    padding-right: 19px;
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
</style>