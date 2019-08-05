<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0px;
}

button{
    border: 0;
    padding: 7px;
    font-size: 18px;
    background-color: #8ecbd3;
    color: white;
    cursor: pointer;
}

button:hover{
    background-color: #c7e7e2;
    color: rgb(41, 59, 83);
}
</style>
