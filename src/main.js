import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;


new Vue({
  router,
  data: {
    currAirport: "",
    response: 0,
  },
  render: (h) => h(App),
}).$mount("#app");
