import Vue from 'vue'
import Router from 'vue-router'

import Auth from '@/components/Auth'
import Main from '@/components/Main'

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
      path: '/main',
      name: 'Main',
      component: Main
    },
  ]
})
