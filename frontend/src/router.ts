import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Auth from './views/Auth.vue';
import About from './views/About.vue';
import store from './store';

Vue.use(Router);

const ifAuthenticated = (to: any, from: any, next: any) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/auth');
};

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      // beforeEnter: ifAuthenticated,
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      beforeEnter: ifAuthenticated,
    },
  ],
});
