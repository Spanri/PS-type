<template>
  <div class="all">
    <div id="error" v-bind:style="{ display: displayError }">
      <p>Ошибка. Кажется, вы сюда зашли не через главную страницу.</p>
    </div>
    <div id="success" v-bind:style="{ display: displaySuccess }">
      <p class="title">Пожалуйста, войдите в системуfghfghfgh.</p>
      <div id="error">
        Всё плохо.
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'All',
  data: () => ({
    displayError: 'none',
    displaySuccess: 'none'
  }),
  created: function () {
    console.log(this.token);
    this.http.post('api/v1/data/', {
        "token": this.token 
      })
      // ответ на запрос
      .then(response => {
        this.displaySuccess = 'block';
        //alert("Пользователь найден");
        //this.token = response.token;
        //window.location = "/all/";
      })
      // обработка ошибок
      .catch(e => {
        console.log(e);
        this.displayError = 'block';
        console.log("Что-то не то введено " + this.token);
      })
    
  },
  methods:{
    
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
    /* -webkit-box-shadow: inset 0 0 0 50px #ffffff; */
    -webkit-text-fill-color: rgb(55, 63, 48);
}

.inp input::-webkit-input-placeholder {color:rgb(255, 255, 255);}

.all{
    background: #c7e7e2;
    margin: auto;
    width: 500px;
    color: black;
    font-size: 18px;
}
</style>