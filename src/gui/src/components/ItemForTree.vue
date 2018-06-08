<template>
    <div class="oneUser">
       <li>
            <div
                :class="{bold: isFolder}"
                @click="toggle">
                {{ model.name }}
                <span v-if="isFolder">[{{ open ? '-' : '+' }}]</span>
            </div>
            <ul v-show="open" v-if="isFolder">
                <item
                    class="item"
                    v-for="(model, index) in model.children"
                    :key="index"
                    :model="model">
                </item>
            </ul>
    </li>
    </div>
</template>

<script>

// по рекурсии в этот template возвращаем этот же 
//template со свойством model, который возвращается с помощью isFolder  
export default {
    name: 'item',
    props: {
        data: Object
    },
    data: function () {
        return {
        open: false
        }
    },
    computed: {
        isFolder: function () {
        return this.model.children &&
            this.model.children.length
        }
    },
    methods: {
        toggle: function () {
        if (this.isFolder) {
            this.open = !this.open
        }
        }
    } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.oneUser{
    padding: 15px;
    margin: 0;
    font-family: Menlo, Consolas, monospace;
    color: #444;
}
.item {
    cursor: pointer;
}
.bold {
    font-weight: bold;
}
ul {
    padding-left: 1em;
    line-height: 1.5em;
    list-style-type: dot;
}

</style>