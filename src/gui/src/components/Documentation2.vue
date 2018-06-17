<template></template>

<script>

export default {
    name: 'Doc2',
    created: function () {
        window.location.href = "./doc/index.html"
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.docum2{
    text-align: left;
    
    padding: 0;
    height: 100vh;
    display: grid;
    grid-template-rows: auto 1fr;
}

.title{
    margin: 30px;
    font-size: 25px;
    display: grid;
    /* grid-template-columns: 1fr auto; */
}

.title p{
    margin: 0px;
}

.tooltip, .doc{
    margin: 30px;
    margin-top: 10px;
}
</style>