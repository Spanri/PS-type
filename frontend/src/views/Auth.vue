<template>
	<div class="auth-parent">
		<p class="title">Авторизация</p>
		<div class="auth">
			<div class="input">
				<p>Логин</p>
				<input id="username" type="text" v-model="username" placeholder="Введите логин" />
			</div>
			<div class="input">
				<p>Пароль</p>
				<input id="password" type="password" v-model="password" placeholder="Введите пароль"/>
			</div>
			<button @click="login()">ОК</button>
		</div>
		<div id="error">&#8195;{{ error }}</div>
	</div>
</template>

<script>
import axios from 'axios';
import {path} from '../variables';

export default {
	name: 'Auth',
	data: () => ({
		error: '',
		username: '',
		password: '',
	}),
	methods: {
		login(event) {
			this.error = '';
			console.log(path);
			axios.post(path + '/api/v1/signin', {
					username: this.username,
					password: this.password,
			})
			.then((res) => {
					sessionStorage.setItem('token', res.data.token);
					this.$router.push({ path: '/home' });
			})
			.catch((e) => {
					console.log(e);
					this.error = 'Что-то не так.';
			});
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.auth-parent {
	height: 100vh;
	display: flex;
	justify-content: center;
	align-content: center;
	flex-direction: column;
	background-image: url('../assets/background.svg');
	background-size: cover;
}

.title{
	background: rgb(37, 73, 121);
	width: 270px;
	margin: 0 auto;
	color: white;
	margin-top: 0;
	margin-bottom: 10px;
	padding: 15px;

	@media (max-width: 700px) {
		background: rgb(26, 55, 94);
		color: white;
	}
}

.auth {
	background: #c7e7e2;
	width: 300px;
	margin: 0 auto;
	padding-top: 10px;

	button {
		width: 70px;
		margin: 15px auto 25px auto;
		background: #41cadc;
		color: white;
		border: none;
		font-size: 18px;
		padding: 7px;
	}

	button:hover {
		background: #2d919e;
		cursor: pointer;
	}
}

#error {
	padding: 15px;
	margin: 0;
	color: #03424b;
}

.input {
	p {
		margin: 0;
		padding-top: 15px;
		color: #03424b;
	}

	input {
		color: rgb(55, 63, 48);
		background: #ffffff;
		width: 200px;
		padding: 7px;
		margin: 10px;
		font-size: 16px;
		text-align: center;
		border: none;
		box-shadow: inset 0 0 0 50px #ffffffda;
		-webkit-text-fill-color: rgb(55, 63, 48);
	
		&::-webkit-input-placeholder {
			color:rgb(255, 255, 255);
		}

		&:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill{
			background-color: rgb(37, 73, 121);
		}
	}

}


</style>