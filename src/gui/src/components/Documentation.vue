<template>
  <div class="docum">
    <div class="title" v-bind:style="{ gridTemplateColumns: grid }">
        <p> Документация по базе данных. </p>
        <button @click="cancel()" v-if="show_cancel" style="margin-right:15px"> Отменить </button>
        <button @click="clickButton()"> {{change}} </button>
    </div>
    <textarea wrap="hard" class="tooltip" v-on:click.stop v-if="show_tooltip" v-model="data2"></textarea>
    <p class="doc" v-if="show_doc" v-html="data"></p>
  </div>
</template>

<script>
export default {
    name: 'Map', 
    data: ()=>({
        data: '',
        data2: '',
        show_tooltip: false,
        show_doc: true,
        show_cancel: false,
        grid: '1fr auto',
        change: 'Изменить документацию'
    }),
    created: function(){
        this.data = this.$store.getters.doc;
        this.data2 = this.data;
    },
    methods:{
        clickButton: function(){
            this.show_tooltip = !this.show_tooltip;
            this.show_doc = !this.show_doc;
            this.show_cancel = !this.show_cancel;
            if(this.change == 'Изменить документацию') {
                this.grid = '1fr auto auto';
                this.change = 'Подтвердить';
                this.data2 = this.data2.replace(/<br\/>/g, "\n");
            } else {
                this.grid = '1fr auto';
                this.confirmButton();
                this.change = 'Изменить документацию';
            }
        },
        cancel: function(){
            this.show_tooltip = !this.show_tooltip;
            this.show_doc = !this.show_doc;
            this.change = 'Изменить документацию';
            this.show_cancel = false;
        },
        confirmButton: async function(){
            this.data = this.data2.replace(/\n/g, "<br/>");
            await this.http.post('api/v1/data/change', {
                "token": sessionStorage.getItem('token'), "name": this.data
            })
            // ответ на запрос
            .then(response => {
                console.log("Изменили документацию");
            })
            // обработка ошибок
            .catch(e => {
                console.log(e);
                console.log("Что-то не то введено");
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.docum{
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

.title button{
    border: 0;
    padding: 10px;
    font-size: 18px;
    background-color: #8ecbd3;
    color: white;
}

.tooltip, .doc{
    margin: 30px;
    margin-top: 10px;
}
</style>