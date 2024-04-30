import type { RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import type { AsyncComponentLoader } from 'vue'

const airportView: AsyncComponentLoader = () => import(/* webpackChunkName: "airport" */ '@/views/AirportView.vue');
const metarView: AsyncComponentLoader = () => import(/* webpackChunkName: "metar" */ '@/views/MetarView.vue');
const tafView: AsyncComponentLoader = () => import(/* webpackChunkName: "taf" */ '@/views/TafView.vue');

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'Home',
      order: 0,
    },
  },
  {
    path: '/airport',
    name: 'airport',
    component: airportView,
    meta: {
      title: 'Airport',
      order: 1,
    },
  },
  {
    path: '/metar',
    name: 'metar',
    component: metarView,
    meta: {
      title: 'METAR',
      order: 2,
    },
  },
  {
    path: '/taf',
    name: 'taf',
    component: tafView,
    meta: {
      title: 'TAF',
      order: 3,
    },
  },
]

export default routes
