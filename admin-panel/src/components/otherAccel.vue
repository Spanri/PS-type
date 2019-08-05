<template>
    <div class="oneUser" :class="begin">
        <button 
            v-if="this.$store.getters.masForOtherAccel == this.data"
            @click="back()"> 
            &#8592; Назад
        </button>
        <li>
            <div style="display:inline-block"
                :class="{bold: isFolder}"
                @click="toggle">
                {{ name }}: 
                <span v-if="isFolder || isArray">[{{ open ? '-' : '+' }}]</span>
            </div>
            <ul style="margin:0" v-show="open" v-if="isArray">
                <item
                    class="item"
                    v-for="(value, key) in data"
                    :key="key"
                    :model="{value: value, name: key}"
                    :first="false">
                </item>
            </ul>
            <p 
                style="display:inline-block; margin:0" 
                v-show="open" 
                v-else-if="isFolder">
                {{ data }}
            </p>
            <p style="display:inline-block; margin:0" v-else>
                {{ data }}
            </p>
    </li>
    </div>
</template>

<script>


export default {
    name: 'item',           // название компонента для рекурсивного вывода
    props: {
        model: {            // важно для рекурсивного вывода, параметры компонента
            type: Object,
            required: false,
            default: function () {
                return { 
                    value: this.$store.getters.masForOtherAccel,
                    name: 'accel'
                }
            }
        }     
    },
    data: () => ({
        open: true,        // раскрыть список детей (используется в v-show)
    }),
    computed: {
        // для оформления первого элемента (accel)
        begin: function () {
            if(this.$store.getters.masForOtherAccel == this.data)
                return "begin";
            else return "";
        },
        data: function () {
            if(this.model.value == this.$store.getters.masForOtherAccel || this.model.value.length < 10)
                this.open = true;
            return this.model.value;
        },
        name: function () {
            return this.model.name;
        },
        isFolder: function () {
            if(typeof(this.data) == "object" && !Array.isArray(this.data)) {
                return Object.keys(this.data);
            }    
            else {
                return false;
            }
        },
        isArray: function () {
            if(Array.isArray(this.data) && this.data.length != 0) {
                return this.data;
            }    
            else {
                
                return false;
            }
        }
    },
    methods: {
        toggle: function () {
            if (this.isFolder || this.isArray) {
                this.open = !this.open;
            }
        },
        back: function () {
            this.$store.commit('component', 'page-one-user');
        },
    } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.oneUser{
    padding: 5px;
    margin: 0;
    text-align: left;
}

.begin{
    padding: 15px;
}

button{
    margin-bottom: 15px;
}

.item {
  cursor: pointer;
}

ul{
    padding-left: 20px;
}

li{
    list-style-type: none;
}

span{
    color: #41cadc;
}

p{
    text-align: left;
}

</style>