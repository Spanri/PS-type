<template>
	<nav class="navbar">
		<div class="navbar__title">
			<span class="navbar__icon_logo"></span>
			<p class="navbar__text_logo">Панель управления</p>
		</div>
		<div class="navbar__menu">
			<router-link
					class="navbar__menu-link"
					v-bind:key="todo.id"
					v-for='(todo) of todos'
					v-bind:style="todo"
					:to='todo.component'>
				{{ todo.text }}
			</router-link>
		</div>
	</nav>
</template>

<script lang="ts">
import axios from 'axios';
import { Component, Vue, Provide } from 'vue-property-decorator';

@Component({
})

export default class Navbar extends Vue {
	// data
	public displayError: any = 'none';
	public displaySuccess: any = 'none';
	public todos: object[] = [
		{
			'text': 'Все юзеры',
			'component': '/all-users',
			'--before': '"\\f007"',
		},
		{
			'text': 'Карты',
			'component': '/maps',
			'--before': '"\\f041"',
		},
		{
			'text': 'Заметки',
			'component': '/notes',
			'--before': '"\\f040"',
		},
		{
			'text': 'Документация',
			'component': '/docs',
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
	}
}
</script>

<style lang="scss" scoped>
@import "../assets/css/font-awesome.min.css";

.navbar {
	background: #c7e7e2;
	text-align: left;
	min-width: 250px;
	min-height: 100vh;
	font-size: 18px;
	
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
</style>