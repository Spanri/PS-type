<template>
    <div class="oneUser" :class="begin">
        <li>
            <div style="display:inline-block"
                :class="{bold: isFolder}"
                @click="toggle">
                {{ name }}: 
                <span v-if="isFolder || isArray">[{{ open ? '-' : '+' }}]</span>
                <button 
                    v-if="name == 'accel'" 
                    @click="toOtherAccel()" >
                    Другая версия отображения
                </button>
            </div>
            <p 
                style="display:inline-block; margin:0" 
                v-show="open" 
                v-if="isArray">
                {{ data }}
            </p>
            <ul style="margin:0" v-show="open" v-else-if="isFolder">
                <item
                    class="item"
                    v-for="(value, key) in data"
                    :key="key"
                    :model="{value: value, name: key}">
                </item>
            </ul>
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
                    value: this.$store.getters.allId,
                    name: this.$store.getters.allId.username
                }
            }
        },       
    },
    data: () => ({
        open: false,        // раскрыть список детей (используется в v-show)
    }),
    created: function() {
        
        //console.log(this.data[0]);
    },
    computed: {
        begin: function () {
            if(this.$store.getters.allId == this.data)
                return "begin";
            else return "";
        },
        data: function () {
            if(this.model.value == this.$store.getters.allId || this.model.value.length < 10)
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
            else if(this.name == "points") {
                console.log(this.name);
                return this.data;
            }
            else return false;
        },
        isArray: function () {
            if(Array.isArray(this.data) && this.data.length != 0 && this.name != "points") {
                return this.data;
            }    
            else return false;
        }
    },
    methods: {
        toggle: function () {
            if (this.isFolder || this.isArray) {
                this.open = !this.open;
            }
        },
        toOtherAccel: async function () {
            await this.$store.commit('masForOtherAccel', this.data);
            this.$store.commit('component', 'other-accel'); 
        }
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