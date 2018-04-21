<template>
  <div class="auth">
    <div id="error">
        Всё плохо.
    </div>
  </div>
</template>

<script>
export default {
  name: 'Auth',  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.auth p, #error{
  padding: 15px;
  margin: 0;
}

</style>