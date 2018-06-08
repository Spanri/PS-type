<template>
    <div class="all">
        <form id="search">
            <p style="display:inline-block">Найти пользователя</p> <input name="query" v-model="filterKey">
        </form>
        <table>
            <thead>
                <tr>
                <th v-for="(key, id) in columns"
                    v-bind:key="key.id"
                    @click="sortBy(key)"
                    :class="{ active: sortKey == key }">
                    {{ columnsName[id] | capitalize }}
                    <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
                    </span>
                </th>
                </tr>
            </thead>
            <tbody>
                <!-- Фильтруем и выводим строки (td) только те, что подходят -->
                <tr v-for="(entry, id) in filteredData" v-bind:key="entry.id" @click="toOneUser(id)">
                    <td v-for="key in columns" v-bind:key="key.id">
                        {{entry[key]}}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>


<script>

export default {
    name: 'All',
    data: ()=> ({
        filterKey: '',
        sortKey: '',
        sortOrders: {},
        columns: ['username', 'age', 'sex'],
        columnsName: ['Имя', 'Возраст', 'Пол'],
        data: ''
    }),
    created: function(){
        let self = this;
        self.data = this.$store.getters.all;
        var sortOrders = {};
        this.columns.forEach(function (key) {
            sortOrders[key] = 1;
        })
        this.sortOrders = sortOrders;
    },
    computed: {
        filteredData: function () {
            var sortKey = this.sortKey;
            var filterKey = this.filterKey && this.filterKey.toLowerCase();
            var order = this.sortOrders[sortKey] || 1;
            var data = this.data;
            if (filterKey) {
                data = data.filter(function (row) {
                    return Object.keys(row).some(function (key) {
                        return String(row[key]).toLowerCase().indexOf(filterKey) > -1;
                    })
                })
            }
            if (sortKey) {
                data = data.slice().sort(function (a, b) {
                    a = a[sortKey];
                    b = b[sortKey];
                    return (a === b ? 0 : a > b ? 1 : -1) * order;
                })
            }
            return data;
        }
    },
    filters: {
        capitalize: function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1)
        }
    },
    methods: {
        sortBy: function (key) {
            this.sortKey = key;
            this.sortOrders[key] = this.sortOrders[key] * -1;
        },
        toOneUser: function(id) {
            this.$store.commit('id', id);
            this.$store.commit('id2', true); // первый вход в template
            this.$store.commit('component', 'page-one-user');
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.all {
    font-family: Helvetica Neue, Arial, sans-serif;
    font-size: 14px;
    color: #444;
    display: grid;
}

#search{
    text-align: left;
    font-size: 17px;
    margin: 15px;
    display: grid;
    grid-template-columns: 170px 1fr;
}

input{
    margin: 15px;
}

table {
    margin: 5px;
    /* border: 2px solid #41cadc; */
    background-color: #fff;
}

th {
    background-color: #8ecbd3;
    color: rgb(41, 59, 83);
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: 1px solid white;
}

td {
    background-color: #dde9e7;
    border: 1px solid white;
}

tr:hover > td{
    background-color: #c0e3e7;
    cursor: pointer;
}

th, td {
    min-width: 120px;
    padding: 10px 20px;
}

th.active {
    color: #fff;
}

th.active .arrow {
    opacity: 1;
}

.arrow {
    display: inline-block;
    vertical-align: middle;
    width: 0;
    height: 0;
    margin-left: 5px;
    opacity: 0.66;
}

.arrow.asc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid #fff;
}

.arrow.dsc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid #fff;
}

</style>