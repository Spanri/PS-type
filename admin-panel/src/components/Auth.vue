<template>
  <div class="auth">
    <p class="title">Авторизация</p>
    <div class="inp">
      <input id="username" type="text" v-model="username" placeholder="Логин" />
    </div>
    <div class="inp">
      <input id="password" type="password" v-model="password" placeholder="Пароль"/>
    </div>
    <input id="login" type="submit" value="" v-on:click="login"/>
    <div id="error" v-bind:style="{ display: displayError }">
      Всё плохо.
    </div>
  </div>
</template>

<script>
import axios from 'axios';

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
        axios.post('api/v1/signin', {
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



#error{
    padding: 15px;
    margin: 0;
}

.inp input{
    color: rgb(55, 63, 48);
    background: #ffffff;
    width: 200px;
    padding: 5px;
    margin: 10px;
    font-size: 18px;
    text-align: center;
    border: none;
    -webkit-box-shadow: inset 0 0 0 50px #ffffffda;
    -webkit-text-fill-color: rgb(55, 63, 48);
}

input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill{
    background-color: rgb(37, 73, 121);
}

.inp input::-webkit-input-placeholder {color:rgb(255, 255, 255);}

#login{

  background: #41cadc url('../assets/login_ico.png');
  background-size: 12% ;
  background-repeat: no-repeat;
  background-position: center center;
  width: 210px;
  margin: 10px;
  margin-bottom: 20px;
  height: 30.8px;
  color: white;
  border: none;
  padding-left: 30px;
  padding-right: 30px;
  font-size: 18px;
}

#login:hover{
    cursor: pointer;
}

.title{
    background: #41cadc;
    color: #ffffff;
    margin-bottom: 10px;
    padding: 10px;
}

.auth{
    background: #c7e7e2;
    margin: auto;
    width: 400px;
    color: black;
    font-size: 18px;
}
</style>
