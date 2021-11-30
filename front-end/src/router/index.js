import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/airport",
    name: "Airport",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Airport.vue"),
  },
  {
    path: "/metar",
    name: "METAR",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/METAR.vue"),
  },
  {
    path: "/taf",
    name: "TAF",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/TAF.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
