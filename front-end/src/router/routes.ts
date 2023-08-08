import type { RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

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
    component: () => import(/* webpackChunkName: "airport" */ '@/views/AirportView.vue'),
    meta: {
      title: 'Airport',
      order: 1,
    },
  },
  {
    path: '/metar',
    name: 'metar',
    component: () => import(/* webpackChunkName: "metar" */ '@/views/MetarView.vue'),
    meta: {
      title: 'METAR',
      order: 2,
    },
  },
  {
    path: '/taf',
    name: 'taf',
    component: () => import(/* webpackChunkName: "taf" */ '@/views/TafView.vue'),
    meta: {
      title: 'TAF',
      order: 3,
    },
  },
]

export default routes
