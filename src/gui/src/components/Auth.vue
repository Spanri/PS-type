<template>
  <div class="auth">
    <p class="title">Пожалуйста, войдите в систему.</p>
    <div class="inp">
        <input id="username" type="text" placeholder="Логин" />
    </div>
    <div class="inp">
        <input id="password" type="password" placeholder="Пароль"/>
    </div>
    <input id="login" type="submit" value="Войти" />
    <div id="error">
        Всё плохо.
    </div>
  </div>
</template>

<script>
export default {
  name: 'Auth',
  data () {
    return {
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
    -webkit-box-shadow: inset 0 0 0 50px #ffffff;
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
