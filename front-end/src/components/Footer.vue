<template>
    <footer class="d-flex flex-wrap justify-content-center align-items-center pt-md-0">
        <a href="https://github.com/BraedenKilburn/vue-weather" target="_blank"
          rel="noopener noreferrer"
          class="col-md-6 d-flex align-items-center mb-sm-3 mb-md-0 text-decoration-none">
          <i class="fab fa-github text-muted"></i>
          <p class="pl-5 mb-0 text-muted">Created by Braeden Kilburn</p>
        </a>
        <ul class="nav col-md-6 justify-content-end">
          <li class="nav-item"><router-link to="/" class="nav-link px-2 text-muted">Home</router-link>
          </li>
          <li class="nav-item"><router-link to="./airport" class="nav-link px-2 text-muted">Airports</router-link>
          </li>
          <li class="nav-item"><router-link to="./metar" class="nav-link px-2 text-muted">METAR</router-link></li>
          <li class="nav-item"><router-link to="./taf" class="nav-link px-2 text-muted">TAF</router-link></li>
        </ul>
    </footer>
</template>

<style scoped>
footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: 1000;
    justify-content: space-between;
    padding-left: var(--bs-gutter-x, .75rem);
    padding-right: var(--bs-gutter-x, .75rem);
    padding-top: 10px;
}

footer p {
    padding-left: 10px;
}

footer ul li .text-muted:hover, footer a p:hover, footer a i:hover {
    color: white !important;
    transition: 0.3s;
}

i {
  color: #777;
}
</style>