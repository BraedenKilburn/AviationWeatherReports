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
    name: "AirportReport",
    computed: {
        airportName: function() {
          let airport = this.$root.$data.stationInfo;
          let airportICAO = airport.icao;
          let name = airport.name;
          return airportICAO + ' - ' + name;
        },
        airportLocation: function() {
          let airport = this.$root.$data.stationInfo;
          let airportState = "";
          if (airport.state != null) {
            airportState = airport.state.code;
          }
          let airportCity = airport.city;

          if (airportCity === undefined && airport.state != null) {
            return airport.state.name + ",";
          }
          else {
            return airportCity + ", " + airportState;
          }
        },
        airportCountry: function() {
          let airport = this.$root.$data.stationInfo;
          return airport.country.name;
        },
        airportLatitude: function() {
          let airport = this.$root.$data.stationInfo;
          return airport.latitude.degrees
        },
        airportLongitude: function() {
          let airport = this.$root.$data.stationInfo;
          return airport.longitude.degrees
        },
        airportElevation: function() {
          let airport = this.$root.$data.stationInfo;
          return airport.elevation.feet.toLocaleString();
        },
        airportStatus: function() {
          let airport = this.$root.$data.stationInfo;
          return airport.status;
        },
    },
};
</script>
