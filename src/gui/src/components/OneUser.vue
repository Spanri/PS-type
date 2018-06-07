<template>
    <div class="oneUser">
        <p
            v-for="(key, index) in data"
            :key="index"
            v-if="isFolder"
            @click="toggle(key)">
            {{index}}: {{isFolder(key)}}
        </p>
        <ul id="demo">
  <item
    class="item"
    :model="treeData">
  </item>
</ul>
    </div>
</template>

<script>


export default {
    name: 'Map',  
    data: ()=>({
        data: '',
        open: true,
    }),
    computed: {

    },
    created: function(){
        this.data = this.$store.getters.allId;
    },
    methods: {
        toggle: function (key) {
            if (typeof(key)=="object") {
                console.log(key);
                
            }
        },
        isFolder: function(key){
            console.log(key);
            return (typeof(key)=="object") ? '+' : key;
        }
    } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.oneUser{
    padding: 15px;
    margin: 0;
}

p{
    text-align: left;
}

</style>