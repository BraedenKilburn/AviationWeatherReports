<template>
    <footer class="d-flex flex-wrap justify-content-center align-items-center pt-md-0">
        <a href="https://github.com/BraedenKilburn/Airport-Weather-Website" target="_blank"
          rel="noopener noreferrer"
          class="col-md-6 d-flex align-items-center mb-sm-3 mb-md-0 text-decoration-none">
          <i class="fab fa-github"></i>
          <p class="pl-5 mb-0">Created by Braeden Kilburn</p>
        </a>
        <ul class="nav col-md-6 justify-content-end">
          <li class="nav-item"><router-link to="/" class="nav-link px-2">Home</router-link>
          </li>
          <li class="nav-item"><router-link to="./airport" class="nav-link px-2">Airports</router-link>
          </li>
          <li class="nav-item"><router-link to="./metar" class="nav-link px-2">METAR</router-link></li>
          <li class="nav-item"><router-link to="./taf" class="nav-link px-2">TAF</router-link></li>
        </ul>
    </footer>
</template>