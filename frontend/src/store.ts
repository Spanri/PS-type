import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		token: localStorage.getItem('user-token') || '',
	},
	getters: {
		token: (state) => state.token,
	},
	mutations: {

	},
	actions: {

	},
});
