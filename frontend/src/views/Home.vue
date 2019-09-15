<template>
	<div class="home">
		<nav class="navbar">
			<div class="navbar__title">
				<span class="navbar__icon_logo"></span>
				<p class="navbar__text_logo">Панель управления</p>
			</div>
			<div class="navbar__menu">
				<router-link class="navbar__menu-link"
						v-bind:class="{ navbar__icon_menu: todo.component == 'page-doc2' ? todos[3].isActive : todo.isActive}"
						v-bind:style="todo.component == 'page-doc2' ? todos[3] : todo"
						v-bind:key="todo.id"
						:to='todo.component'
						v-for='(todo) of todos'>
					{{ todo.text }}
				</router-link>
			</div>
		</nav>
		<div class="content-block">
			<router-view></router-view>
		</div>
	</div>
</template>

<script lang="ts">
import axios from 'axios';
import { Component, Vue, Provide } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
})

export default class Home extends Vue {
	// data
	public component: any = '';
	public displayError: any = 'none';
	public displaySuccess: any = 'none';
	public componentName: any = null;
	public todos: any = [
		{
			'text': 'Все юзеры',
			'component': 'page-all',
			'--before': '"\\f007"',
			'isActive': false,
		},
		{
			'text': 'Карты',
			'component': 'page-map',
			'--before': '"\\f041"',
			'isActive': false,
		},
		{
			'text': 'Заметки',
			'component': 'page-doc',
			'--before': '\'\\f040\'',
		},
		{
			'text': 'Документация',
			'component': 'page-doc2',
			'--before': '"\\f15c"',
		},
		{
			'text': 'Привет мир',
			'component': '/hello',
			'--before': '"\\f15c"',
		},
	];
	public async created() {
		await axios
		.post('api/v1/data/', {
			token: sessionStorage.getItem('token'),
		})
		// ответ на запрос
		.then(async (response) => {
			this.displaySuccess = 'grid';
			await axios
				.post('api/v1/data/all', {
					token: sessionStorage.getItem('token'),
				})
				// ответ на запрос
				.then((response) => {
					this.$store.commit('all', response.data.all);
					const doc = response.data.all.filter(function(row: any) {
						return Object.keys(row).some(function(key: any) {
							return (
								String(row[key])
									.toLowerCase()
									.indexOf('admin0') > -1
							);
						});
					});
					this.$store.commit('doc', doc['0'].name);
				});
			})
			// обработка ошибок
			.catch((e) => {
				console.log(e);
				this.displayError = 'block';
			});
		this.nav(0);
	}
	public nav(id: any) {
		const todo = this.todos[id];
		if (todo.component === 'page-doc2') {
			this.$store.commit('component', 'page-all');
			this.todos[0].isActive = true;
			this.todos[0]['--colorNav'] = 'white';
			window.open('./doc/index.html');
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/css/font-awesome.min.css";

.home {
	margin: 0;
	width: 100%;
	min-height: 100vh;
	color: rgb(37, 73, 121);
	font-size: 18px;
	display: flex;
}

.navbar {
	background: #c7e7e2;
	text-align: left;
	min-width: 250px;
	min-height: 100vh;
	
	&__title {
		margin: 15px;
		margin-left: 0px;
		margin-right: 0px;
		background-color: #41cadc;
	}

	&__icon_logo {
		background-image: url(../assets/home.svg);
		width: 50px;
		height: 50px;
		position: absolute;
		top: 10px;
		left: 10px;
		display: inline-block;
		vertical-align: middle;
		z-index: 2;
	}

	&__text_logo {
		display: inline-block;
		margin: 0;
		padding: 10px;
		background-color: #41cadc;
		color: #ffffff;
		position: relative;
		left: 60px;
	}

	.router-link-exact-active {
		background-color: #8ecbd3;
		color: #ffffff;
		cursor: pointer;
	}

	.router-link-exact-active::before {
		color: #ffffff;
	}

	&__menu {
		display: grid;
		grid-template-rows: repeat(2, auto);
	}

	&__menu-link {
		/*margin: 3px;*/
		margin-left: 0px;
		margin-right: 0px;
		padding: 10px;
		padding-left: 20px;
		text-decoration: none;
		color: rgb(41, 59, 83);

		&:hover {
			background-color: #8ecbd3;
			color: #ffffff;
			cursor: pointer;
		}

		&::before {
			content: var(--before); /* добавляем иконку дом */
			font-family: FontAwesome;
			color: #41cadc;
			display: inline-block;
			min-width: 30px;
		}

		&:hover::before {
			color: white;
		}
	} 
}

.content-block {
	overflow-x: hidden;
	flex: 100%;
}
</style>
