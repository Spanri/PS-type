<template>
  <div class="auth">
    <div></div>
    <div class="auth2">
      <p class="title">Авторизация</p>
      <div class="inp">
        <p>Логин</p>
        <input id="username" type="text" v-model="username" placeholder="Введите логин" />
      </div>
      <div class="inp">
        <p>Пароль</p>
        <input id="password" type="password" v-model="password" placeholder="Введите пароль"/>
      </div>
      <button @click="login()">ОК</button>
      <div id="error" v-bind:style="{ display: displayError }">
        Что-то не так.
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
import axios from 'axios';
import path from '../path';

export default {
  name: 'Auth',
  data: () => ({
    displayError: 'none',
    username: "",
    password: ""
  }),
  methods: {
    login: function (event) {
        this.displayError = 'none';
        console.log(path);
        axios.post(path+'/api/v1/signin', {
            "username": this.username, "password": this.password
        })
        .then(res => {
            sessionStorage.setItem('token', res.data.token);
            this.$router.push({ path: '/main' });
        })
        .catch(e => {
            console.log(e);
            this.displayError = 'block';
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.auth{
  height: 100vh;
  display: grid;
  grid-template-rows: auto max-content auto;
}
#error{
    padding: 15px;
    margin: 0;
}
.inp p{
  margin: 0;
  padding-top: 15px;
  color: #03424b;
}
.inp input{
    color: rgb(55, 63, 48);
    background: #ffffff;
    width: 200px;
    padding: 7px;
    margin: 10px;
    font-size: 16px;
    text-align: center;
    border: none;
    -webkit-box-shadow: inset 0 0 0 50px #ffffffda;
    -webkit-text-fill-color: rgb(55, 63, 48);
}
input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill{
    background-color: rgb(37, 73, 121);
}
.inp input::-webkit-input-placeholder {color:rgb(255, 255, 255);}
button{
  width: 70px;
  margin-top: 15px;
  background: #41cadc;
  margin-bottom: 25px;
  color: white;
  border: none;
  font-size: 18px;
  padding: 7px;
}
button:hover{
  background: #2d919e;
  cursor: pointer;
}
#error{
  color: #03424b;
}
.title{
    background: #41cadc;
    color: #ffffff;
    margin-top: 0;
    margin-bottom: 10px;
    padding: 10px;
}
.auth2{
    background: #c7e7e2;
    margin: auto;
    width: 350px;
    color: black;
    font-size: 18px;
}
</style>
