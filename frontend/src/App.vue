<template>
	<div id="app">
		<div v-if="this.$store.getters.isAuthenticated && this.$store.getters.auth">
			<Auth></Auth>
		</div>
		<div v-else-if="this.$store.getters.auth" class="load">
			<div></div>
			<div class="loadText">
				<p>Система<br>загружается</p>
				<svg class="loadSvg" version="1.1" viewBox="0 0 16 16" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
					<path d="M14,8c-0.609,0-0.898,0.43-1,0.883C12.635,10.516,11.084,13,8,13c-0.757,0-1.473-0.172-2.114-0.474L6.414,12  C6.773,11.656,7,11.445,7,11c0-0.523-0.438-1-1-1H3c-0.609,0-1,0.492-1,1v3c0,0.541,0.428,1,1,1c0.484,0,0.688-0.273,1-0.594  l0.408-0.407C5.458,14.632,6.685,15,8,15c4.99,0,7-4.75,7-5.938C15,8.336,14.469,8,14,8z M3,7.117C3.365,5.485,4.916,3,8,3  c0.757,0,1.473,0.171,2.114,0.473L9.586,4C9.227,4.344,9,4.555,9,5c0,0.523,0.438,1,1,1h3c0.609,0,1-0.492,1-1V2  c0-0.541-0.428-1-1-1c-0.484,0-0.688,0.273-1,0.594l-0.408,0.407C10.542,1.368,9.315,1,8,1C3.01,1,1,5.75,1,6.938  C1,7.664,1.531,8,2,8C2.609,8,2.898,7.57,3,7.117z"/>
				</svg>
			</div>
			<div></div>
		</div>
		<main v-else class="authenticated">
			<router-view></router-view>
		</main>
	</div>
</template>

<script lang="ts">
import axios from 'axios';
import { Component, Vue } from 'vue-property-decorator';
import Auth from '@/views/Auth.vue';

@Component({
	components: {
		Auth,
	},
})

export default class App extends Vue {
	public created() {
		axios.interceptors.response.use(undefined, function(err) {
			return new Promise(function(resolve, reject) {
				if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
					// this.$store.dispatch(AUTH_LOGOUT);
				}
				throw err;
			});
		 });
	}
}
</script>

<style lang="scss">
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	height: 100vh;
	width: 100vw;
}

h1 {
	font-size: 140%;
}

/* Окошко "Система загружается" после успешной авторизации*/
.load{
	height: 100vh;
	width: 100vw;
	display: grid;
	grid-template-rows: auto max-content auto;
}

.loadText{
	margin: 0 auto;
	background: #64b2db;
	padding: 10px;
}

.load p{
	color: white;
	padding: 0px;
	text-align: center;
}

.loadSvg{
	fill: white;
	enable-background: new 0 0 16 16;
	padding: 15px;
	margin-left: 0px;
	height: 30px;
	width: 30px;
	animation: spin 3s linear infinite;

	@keyframes spin {
		100% {
				transform: rotate(360deg); 
		}
	}
}
</style>
