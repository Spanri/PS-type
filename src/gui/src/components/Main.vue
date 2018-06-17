<template>
  <div class="main">
    
    <div id="error" v-bind:style="{ display: displayError }">
      <p>Ошибка. Кажется, вы пропустили процедуру аутентификации.</p>
      <router-link to="/">
        На главную
      </router-link>
    </div>
    <div id="success" v-bind:style="{ display: displaySuccess }">
      <header>
        <div class="title">
          <span class="i"></span>
          <p style="display:inline-block">Панель управления</p>
        </div>
        <div class="nav">
          <div class="nav2" 
              v-bind:class="{ colorNav: todo.isActive}" 
              v-bind:style="todo" 
              v-bind:key="todo.id" 
              v-for='(todo, id) of todos' 
              @click="nav(id)">
            {{ todo.text }}
          </div>
        </div>
      </header>
      <div class="right">
        <div :is="this.$store.getters.component"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import PageAll from "./All.vue";
import PageMap from "./Map.vue";
import PageDoc from "./Documentation.vue";
import PageDoc2 from "./Documentation2.vue";
import PageOneUser from "./OneUser.vue";
import OtherAccel from "./otherAccel.vue";

export default {
  name: "Main",
  components: { PageAll, PageMap, PageDoc, PageDoc2, PageOneUser, OtherAccel },
  data: () => ({
    displayError: "none",
    displaySuccess: "none",
    componentName: null,
    todos: [
      {
        text: "Все юзеры",
        component: "page-all",
        "--before": "'\\f007'",
        "--colorNav": "#41cadc",
        isActive: false
      },
      {
        text: "Карты",
        component: "page-map",
        "--before": "'\\f041'",
        "--colorNav": "#41cadc",
        isActive: false
      },
      {
        text: "Заметки",
        component: "page-doc",
        "--before": "'\\f040'",
        "--colorNav": "#41cadc",
        isActive: false
      },
      {
        text: "Документация",
        component: "page-doc2",
        "--before": "'\\f15c'",
        "--colorNav": "#41cadc",
        isActive: false
      }
    ]
  }),
  created: async function() {
    await this.http
      .post("api/v1/data/", {
        token: sessionStorage.getItem("token")
      })
      // ответ на запрос
      .then(async response => {
        this.displaySuccess = "grid";
        await this.http
          .post("api/v1/data/all", {
            token: sessionStorage.getItem("token")
          })
          // ответ на запрос
          .then(response => {
            this.$store.commit("all", response.data.all);
            var doc = response.data.all.filter(function(row) {
              return Object.keys(row).some(function(key) {
                return (
                  String(row[key])
                    .toLowerCase()
                    .indexOf("admin0") > -1
                );
              });
            });
            this.$store.commit("doc", doc["0"].name);
          });
      })
      // обработка ошибок
      .catch(e => {
        console.log(e);
        this.displayError = "block";
      });
    let self = this;
    self.nav(0);
  },
  methods: {
    nav: function(id) {
      for (let todo of this.todos) {
        todo.isActive = false;
        todo["--colorNav"] = "#41cadc";
      }
      let todo = this.todos[id];
      this.$store.commit("component", todo.component);
      todo.isActive = true;
      todo["--colorNav"] = "white";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../assets/css/font-awesome.min.css";

.auth p,
#error {
  padding: 15px;
  margin: 0;
}

.inp input {
  color: rgb(55, 63, 48);
  background: #ffffff;
  padding: 5px;
  margin: 10px;
  font-size: 18px;
  text-align: center;
  border: none;
  /* -webkit-box-shadow: inset 0 0 0 50px #ffffff; */
  -webkit-text-fill-color: rgb(55, 63, 48);
}

.inp input::-webkit-input-placeholder {
  color: rgb(255, 255, 255);
}

.main {
  margin: 0;
  width: 100%;
  min-height: 100vh;
  color: rgb(37, 73, 121);
  font-size: 18px;
}

header {
  background: #c7e7e2;
  min-height: 100vh;
  min-width: 250px;
  text-align: left;
}

.nav {
  display: grid;
  grid-template-rows: repeat(2, auto);
}

header p {
  margin: 0;
  padding: 10px;
  background-color: #41cadc;
  color: #ffffff;
  position: relative;
  left: 60px;
}

.title {
  margin: 15px;
  margin-left: 0px;
  margin-right: 0px;
  background-color: #41cadc;
}

.i {
  background-image: url(../assets/home.svg);
  width: 50px;
  height: 50px;
  position: absolute;
  top: 10px;
  left: 10px;
  display: inline-block;
  vertical-align: middle;
  z-index: 2;
}

.nav2 {
  /*margin: 3px;*/
  margin-left: 0px;
  margin-right: 0px;
  padding: 10px;
  padding-left: 20px;
  text-decoration: none;
  color: rgb(41, 59, 83);
}

.nav2:hover,
.colorNav {
  background-color: #8ecbd3;
  color: #ffffff;
  cursor: pointer;
}

.nav2:before {
  content: var(--before); /* добавляем иконку дом */
  font-family: FontAwesome;
  color: var(--colorNav);
  display: inline-block;
  min-width: 30px;
}

.nav2:hover::before {
  color: white;
}

#success {
  grid-template-columns: max-content auto;
  -moz-box-sizing: border-box; /* Для Firefox */
  -webkit-box-sizing: border-box; /* Для Safari и Chrome */
  box-sizing: border-box; /* Для IE и Opera */
}

.right {
  overflow-x: hidden;
}
</style>