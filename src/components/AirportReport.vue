<template>
    <div class="text">
        <!-- Airport Name Heading -->
        <div class="row text-center" id="airportName">
          <h1 class="col p-3 mb-sm-0">{{airportName}}</h1>
        </div>
        <div class="container">
          <div class="row d-flex align-items-center location">
            <div class="col-sm-6 text-center mb-3" id="airportLocation">
              <img height="60px" src="/images/pin_drop.svg" alt="Pin Drop">
              <div class="col mt-2">
                <div class="row">
                  <h2>{{airportLocation}}</h2>
                </div>
                <div class="row">
                  <h2>{{airportCountry}}</h2>
                </div>
              </div>
            </div>
            <div class="col-sm-6 text-center mb-3" id="airportCoordinates">
              <img height="60px" src="/images/compass.svg" alt="Compass">
              <div class="col mt-2">
                <h3>{{airportLatitude}}</h3>
                <h3>{{airportLongitude}}</h3>
              </div>
            </div>
          </div>
          <div class="row d-flex align-items-center location">
            <div class="col-sm-6 text-center mb-3" id="airportElevation">
              <img height="90px" src="/images/mountain.svg" alt="Elevation">
              <div class="col mt-2">
                <div class="row">
                  <h3>Elevation (ft): </h3>
                </div>
                <div class="row">
                  <h3>{{airportElevation}}</h3>
                </div>
              </div>
            </div>
            <div class="col-sm-6 text-center mb-3" id="airportStatus">
              <img height="60px" src="/images/operational.svg" alt="Operational">
              <div class="col mt-2">
                <div class="row">
                  <h3>Status: </h3>
                </div>
                <div class="row">
                  <h3>{{airportStatus}}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "MetarReport",
    data() {
        return {
            metar: this.$root.$data.metarInfo,
            airport: this.$root.$data.stationInfo,
        };
    },
    components: {
      //  Clouds,
    },
    computed: {
        airportName: function() {
            let airportICAO = this.metar.icao;
            let name = this.metar.station.name;
            return airportICAO + ' - ' + name;
        },
        airportLocation: function() {
          let airportState = "";
          if (this.airport.hasOwnProperty("state")) {
            airportState = this.airport.state.code;
          }
          let airportCity = this.airport.city;

          if (airportCity === undefined && this.airport.hasOwnProperty("state")) {
            return this.airport.state.name + ",";
          }
          else {
            return airportCity + ", " + airportState;
          }
        },
        airportCountry: function() {
          return this.airport.country.name;
        },
        airportLatitude: function() {
          return this.airport.latitude.degrees
        },
        airportLongitude: function() {
          return this.airport.longitude.degrees
        },
        airportElevation: function() {
          return this.airport.elevation.feet;
        }
        airportStatus: function() {
          return this.airport.status;
        }
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
