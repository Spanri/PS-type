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
		all: [],
		doc: '',
		component: null,
		id: '',
		masForOtherAccel: [],
	},
	actions: {
	},
	mutations: {
		all(state, all) {
			state.all = all;
		},
		doc(state, doc) {
			state.doc = doc;
		},
		component(state, component) {
			state.component = component;
		},
		id(state, id) {
			state.id = id;
		},
		masForOtherAccel(state, id) {
			state.masForOtherAccel = id;
		}
	},
	getters: {
		all(state) {
			return state.all
		},
		doc(state) {
			return state.doc
		},
		component(state) {
			return state.component
		},
		allId(state) {
			return state.all[state.id]
		},
		masForOtherAccel(state) {
			state.masForOtherAccel.mas = [];
			let name = Object.keys(state.masForOtherAccel)[0];
			let length = state.masForOtherAccel[name].length; //сколько элементов в каждом массиве
			for(let i = 0;i<length;i++) {
				let length2 = Object.keys(state.masForOtherAccel).length - 1; //для количества элементов-названий полей в accel (9 - map(1))
				state.masForOtherAccel.mas[i] = {};
				for(let j = 0;j<length2;j++) {
					let name = Object.keys(state.masForOtherAccel)[j]; // получаем имя
					state.masForOtherAccel.mas[i][name] = (state.masForOtherAccel[name][i]);
				}
			}
			return state.masForOtherAccel.mas;
		},
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
