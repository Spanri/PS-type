import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Axios from 'axios';
import * as VueGoogleMaps from 'vue2-google-maps';

Vue.config.productionTip = false;
Vue.prototype.$http = Axios;
const token = localStorage.getItem('token');
if (token) {
	Vue.prototype.$http.defaults.headers.common.Authorization = token;
}

Vue.use(VueGoogleMaps, {
	load: {
		key: 'AIzaSyBtRDH4cdzcp6ukYeH-KJF6uCN8iJwItpM',
		v: '3',
		libraries: 'places',
	},

	//// If you intend to programmatically custom event listener code
	//// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
	//// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
	//// you might need to turn this on.
	// autobindAllEvents: false,

	//// If you want to manually install components, e.g.
	//// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
	//// Vue.component('GmapMarker', GmapMarker)
	//// then disable the following:
	// installComponents: true,
});

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');
