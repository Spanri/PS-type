import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import HelloWorld from './components/HelloWorld.vue';
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
			children: [
				{
					path: '',
					redirect: '/hello',
				},
				{
					path: 'hello',
					name: 'hello',
					component: HelloWorld,
					// beforeEnter: ifAuthenticated,
				},
				{
					path: 'doc',
					redirect: './doc/index.html',
				},
			],
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