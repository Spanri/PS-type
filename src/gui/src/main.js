// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import App from './App';
import router from './router';

Vue.config.productionTip = false;

import axios from 'axios';
Vue.prototype.http = axios.create({
  baseURL: 'https://pstype.herokuapp.com/',
  headers: {
    'Content-Type': 'application/json',
  }
})

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
      all: []
    },
    actions: {
    },
    mutations: {
      all(state, all) {
        state.all = all;
      }
    },
    getters: {
      all(state) {
        return state.all
      }
    },  
    modules: {}
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
