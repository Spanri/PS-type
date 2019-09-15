import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import AllUsers from './views/AllUsers.vue';
import Maps from './views/Map.vue';
import Notes from './views/Notes.vue';
import Auth from './views/Auth.vue';
import NotFound from './views/NotFound.vue';
import store from './store';

Vue.use(Router);

const ifAuthenticated = (to: any, from: any, next: any) => {
	if (store.getters.isAuthenticated) {
		next('/auth');
		return;
	}
	next();
};

const ifNotAuthenticated = (to: any, from: any, next: any) => {
	if (!store.getters.isAuthenticated) {
		next();
		return;
	}
	next('/');
};

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '',
			component: Home,
			beforeEnter: ifAuthenticated,
			children: [
				{
					path: '',
					redirect: '/all-users',
				},
				{
					path: '/all-users',
					name: 'allUsers',
					component: AllUsers,
				},
				{
					path: '/maps',
					name: 'maps',
					component: Maps,
				},
				{
					path: '/notes',
					name: 'notes',
					component: Notes,
				},
				{
					path: '/docs',
					beforeEnter() {
						location.href = './doc/index.html';
					},
				},
			],
		},
		{
			path: '/auth',
			name: 'auth',
			component: Auth,
			beforeEnter: ifNotAuthenticated,
		},
		{
			path: '*',
			name: 'notFound',
			component: NotFound,
			beforeEnter: ifAuthenticated,
		},
	],
});
