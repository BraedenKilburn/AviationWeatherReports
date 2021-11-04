<template>
  <div id="app">
    <div class="container-fluid px-0">
      <!-- Navbar -->
      <header class="main-header">
        <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-custom">
          <div class="container-fluid">
            <router-link to="/" class="navbar-brand">&#9925; Aviation Weather Reports</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-md-between" id="navbarNavAltMarkup">
                <div class="navbar-nav mr-auto">
                    <router-link to="/" class="nav-link">Home</router-link>
                    <router-link to="./airport" class="nav-link">Airports</router-link>
                    <router-link to="./metar" class="nav-link">METAR</router-link>
                    <router-link to="./taf" class="nav-link">TAF</router-link>
                </div>
                <div class="form-inline navbarForm">
                    <input class="form-control mr-sm-2" name="airportCode" autocorrect="off" id="navbarICAO" type="search"
                        placeholder="Airport ICAO" aria-label="Search">
                </div>
            </div>
          </div>
        </nav>
      </header>

      <router-view />
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,200;0,400;0,500;0,600;0,700;0,800;1,300&display=swap');
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}

body {
  background-color: black;
  color: white;
}

.row {
    width: 100%;
    margin: 0 !important;
}

.col {
    width: 100%;
}

input {
    margin-right: 10px;
    border-radius: 25px;
    text-align: center;
}

.navbar #navbarICAO {
    border-radius: 25px;
    text-align: center;
    font-size: 12px;
}

#navbarICAO:focus {
    outline: none;
}

.showcase {
    position: absolute;
    right: 0;
    width: 100%;
    min-height: 100vh;
    background: #111;
    z-index: 2;
}

.showcase video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.8;
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
}

.text {
    position: relative;
    z-index: 10;
    padding-top: 6vh;
}

.text.index {
    padding-top: 75px;
}

.text.index h2 {
    font-size: 4em;
    font-weight: 700;
    line-height: 1em;
    text-transform: uppercase;
}

.text.index h3 {
    font-size: 3em;
    font-weight: 300;
    line-height: 1em;
    text-transform: uppercase;
}

.btn {
    border-radius: 25px;
}

[type="search"]::-webkit-search-cancel-button, [type="search"]::-webkit-search-decoration {
    -webkit-appearance: none;
    appearance: none;
}

footer {
    width: 100%;
    padding-left: var(--bs-gutter-x, .75rem);
    padding-right: var(--bs-gutter-x, .75rem);
    position: absolute;
    bottom: 0;
    z-index: 1;
}

footer p {
    padding-left: 10px;
}

footer > a, li.nav-item > a {
  color: #6c757d;
  -webkit-transition: color 0.3s; /* For Safari 3.0 to 6.0 */
  transition: color 0.3s; /* For modern browsers */
}

footer > a:hover, li.nav-item > a:hover,
footer > a:focus, li.nav-item > a:focus{
  color: white;
}

.fa-github {
  color: white;
  margin: 0px 5px;
}

/* Mobile Styles */

@media only screen and (max-width: 429px) {
  .navbar {
        position: relative;
        --bs-bg-opacity: 1;
        background-color: rgba(var(--bs-dark-rgb), var(--bs-bg-opacity))!important;
    }
    .navbar-brand {
        margin-right: 0;
    }
    footer {
        position: relative;
        justify-content: center !important;
    }
    .text.metar {
        padding: 10px 10px 0px 10px;
    }
    .text.index h2, h3 {
        padding: 10px 0;
    }
    .text.index h2 {
        font-size: 3em;
    }
    .text.index h3 {
        font-size: 2em;
    }
    .taf h4 {
        font-size: 1.3em;
    }
    .taf h4:last-of-type {
        font-size: 1.25em;
    }
}

/* Tablet Styles */

@media only screen and (min-width: 430px) and (max-width: 960px) {
  .navbar {
        position: relative;
        --bs-bg-opacity: 1;
        background-color: rgba(var(--bs-dark-rgb), var(--bs-bg-opacity))!important;
    }
    .text.index {
        padding-top: 100px;
    }
    .text.index h2, h3 {
        padding: 10px 0;
    }
    .text.metar {
        padding-top: 0;
    }
    .showcase {
        padding: 0px;
        min-height: 94vh;
    }
}

/* Larger Tables or Smaller Laptops */

@media only screen and (min-width: 961px) and (max-width: 1260px) {
  .text {
        padding-top: 4vh;
    }
    .text.index {
        padding-top: 200px;
    }
    .text.index h2, h3 {
        padding: 10px 0;
    }
    .showcase {
        padding: 40px;
    }
    .location {
        min-height: 26vh;
    }
}
</style>
