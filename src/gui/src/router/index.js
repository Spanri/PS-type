import Vue from 'vue'
import Router from 'vue-router'

import Auth from '@/components/Auth'
import All from '@/components/All'
import Maps from '@/components/Map'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/all',
      name: 'All',
      component: All
    },
    {
      path: '/map',
      name: 'Map',
      component: Maps
    }
  ]
})
