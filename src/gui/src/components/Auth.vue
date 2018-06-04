<template>
  <div class="auth">
    <p class="title">Пожалуйста, войдите в систему.</p>
    <div class="inp">
        <input id="username" type="text" v-model="username" placeholder="Логин" />
    </div>
    <div class="inp">
        <input id="password" type="password" v-model="password" placeholder="Пароль"/>
    </div>
    <input id="login" type="submit" value="Войти" v-on:click="login"/>
    <div id="error">
        Всё плохо.
    </div>
  </div>
</template>

<script>
import axios from 'axios';
//import * as Auth from './../routes/api/v1/auth';

const http = axios.create({
  baseURL: 'https://pstype.herokuapp.com/',
    //baseURL: 'localhost:8080/',
  headers: {
    'Content-Type': 'application/json',
    crossDomain: true
  }
    /*'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
    'Access-Control-Request-Method' : 'GET/POST/OPTIONS',
    timeout: 10000,
    withCredentials: false
  }*/
})

export default {
  name: 'Auth',
  data: () => ({
    username: "",
    password: ""
  }),
  methods: {
    login: function (event) {
      // отправка запроса
      http.post('api/v1/signin', {
        "username": "admin0", "password": "hardpassword" 
      })
      // ответ на запрос
      .then(response => {
        console.log("Пользователь найден");
        alert('пользователь найден');
      })
      // обработка ошибок
      .catch(e => {
        console.log(e);
      })
    

/*
      var all = [], token;
      $("#login").click(()=>{
          let username = $("#username").val();
          let password = $("#password").val();
          $.post("/api/v1/signin", { "username": username, "password": password }, (auth) => {
              console.log("Пользователь найден");
              token = auth.token;
              $.post("/api/v1/data",
                  { "token": token },
                  (data) => {
                      if (data.username == "admin0" || data.username == "id136955296") {
                          console.log("Загрузка данных");
                          $("#auth").css("display","none");
                          $("#base").css("display","grid");
                          $("body").css("background","white");
                          $("#line").css("height","auto");
                          $.ajax({
                              type: "POST",
                              url: "/api/v1/data/all",
                              data: { "token": token },
                              success: (dataAll) => {
                                  if (dataAll) {
                                      all = dataAll.all;
                                      window.all = all;
                                      console.log(window.all);
                                      tableUser();
                                      $("#preloader").hide();
                                  }
                              },
                              fail: function (response, status, error) {
                                  console.log("Error: " + response.responseText);
                                  $("#error").html(error);
                                  $("#error").css("display","block");
                                  setInterval(()=>{
                                      $("#error").css("display","none");
                                  },3000);
                              }
                          });
                      } else {
                          $("#error").html("Круто, но ты не админ:^(");
                          $("#error").css("display","block");
                          setInterval(()=>{
                              $("#error").css("display","none");
                          },3000);
                      }
                  }).fail(function (response, status, error) {
                      console.log("Error: " + response.responseText);
                      $("#error").html(error);
                      $("#error").css("display","block");
                      setInterval(()=>{
                          $("#error").css("display","none");
                      },3000);
                  });
          }).fail(function (response, status, error) {
              console.log("Error: " + response.responseText);
              $("#error").html(error);
              $("#error").css("display","block");
              setInterval(()=>{
                  $("#error").css("display","none");
              },2000);
          });
      });
*/

      //window.location = "/all/";
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.auth p, #error{
  padding: 15px;
  margin: 0;
}

.inp input{
    color: rgb(55, 63, 48);
    background: #ffffff;
    padding: 5px;
    margin: 10px;
    font-size: 18px;
    text-align: center;
    border: none;
    /*-webkit-box-shadow: inset 0 0 0 50px #ffffff;*/
    -webkit-text-fill-color: rgb(55, 63, 48);
}

.inp input::-webkit-input-placeholder {color:rgb(255, 255, 255);}

#login{
  background: white;
  border: none;
  padding-left: 10px;
  padding-right: 10px;
  margin: 15px;
  font-size: 18px;
}

#error{
  display: none;
}

.auth{
    background: #c7e7e2;
    margin: auto;
    width: 500px;
    color: black;
    font-size: 18px;
}
</style>
