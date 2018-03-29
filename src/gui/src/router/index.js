import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/components/Auth'
import All from '@/components/All'
import Map from '@/components/Map'

Vue.use(Router)

export default new Router({
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
      component: Map
    }
  ]
})
