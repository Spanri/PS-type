// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';

Vue.config.productionTip = false;
Vue.prototype.token = '';

import axios from 'axios';
Vue.prototype.http = axios.create({
  baseURL: 'https://pstype.herokuapp.com/',
  headers: {
    'Content-Type': 'application/json',
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data:{
    all: []
  },
  router,
  components: { App },
  template: '<App/>'
})
