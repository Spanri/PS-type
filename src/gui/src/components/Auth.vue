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
        // отправка запроса
        this.http.post('api/v1/signin', {
            "username": this.username, "password": this.password 
        })
        // ответ на запрос
        .then(res => {
            sessionStorage.setItem('token', res.data.token);
            this.$router.push({ path: '/main' });
        })
        // обработка ошибок
        .catch(e => {
            console.log(e);
            this.displayError = 'block';
            //alert("Что-то не то введено. Описание: " + e);
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
  width: 225.2px;
  height: 30.8px;
  color: white;
  border: none;
  padding-left: 30px;
  padding-right: 30px;
  margin: 10px;
  margin-bottom: 20px;
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
