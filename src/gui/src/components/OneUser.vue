<template>
    <div class="oneUser" :class="begin">
        <!-- <p
            v-for="(key, index) in data"
            :key="index"
            v-if="isFolder"
            @click="toggle(key)">
            {{index}}: {{isFolder(key)}}
        </p> -->
        <li>
            <div style="display:inline-block"
                :class="{bold: isFolder}"
                @click="toggle">
                {{ name }}: 
                <span v-if="isFolder || isArray">[{{ open ? '-' : '+' }}]</span>
            </div>
            <p style="display:inline-block; margin:0" v-show="open" v-if="isArray">
                <!-- <p 
                    v-for="(value, key) in data"
                    :key="key">
                    {{ data[key] }} 
                </p> -->
                {{ data }}
            </p>
            <ul style="margin:0" v-show="open" v-else-if="isFolder">
                <!-- v-if="isFolder" -->
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
            required: false
        }        
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
            if(this.$store.getters.id2 == true) {
                this.$store.commit('id2', false);
                this.open = true;
                return this.$store.getters.allId;
            }
            else {
                return this.model.value;
            }
        },
        name: function () {
            if(this.$store.getters.allId == this.data) {
                return this.$store.getters.allId.username;
            }    
            else {
                return this.model.name;
            }
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