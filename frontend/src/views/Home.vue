<template>
  <div class="home">
    <nav class="navbar">
      <div class="navbar__title">
        <span class="i"></span>
        <p style="display:inline-block">Панель управления</p>
      </div>
      <div class="navbar__menu">
        <div class="navbar__menu-inner"
            v-bind:class="{ colorNav: todo.component == 'page-doc2' ? todos[3].isActive : todo.isActive}"
            v-bind:style="todo.component == 'page-doc2' ? todos[3] : todo"
            v-bind:key="todo.id"
            v-for='(todo, id) of todos'
            @click="nav(id)">
          {{ todo.text }}
        </div>
      </div>
    </nav>
    <div class="content-block">
      <div :is="goToComponent()"></div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { Component, Vue, Provide } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
  
})
export default class Home extends Vue {
  // data
  displayError: any = 'none';
  displaySuccess: any = 'none';
  componentName: any = null;
  todos: any = [
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
  ];
  
	async created() {
    await axios
    .post("api/v1/data/", {
      token: sessionStorage.getItem("token")
    })
    // ответ на запрос
    .then(async response => {
      this.displaySuccess = "grid";
      await axios
        .post("api/v1/data/all", {
          token: sessionStorage.getItem("token")
        })
        // ответ на запрос
        .then(response => {
          this.$store.commit("all", response.data.all);
          var doc = response.data.all.filter(function(row: any) {
            return Object.keys(row).some(function(key: any) {
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
  }
  
  nav(id: any) {
    for (let todo of this.todos) {
      todo.isActive = false;
      todo["--colorNav"] = "#41cadc";
    }
    let todo = this.todos[id];
    if (todo.component == "page-doc2") {
      this.$store.commit("component", "page-all");
      this.todos[0].isActive = true;
      this.todos[0]["--colorNav"] = "white";
      window.open("./doc/index.html");
    }
    else {
      this.$store.commit("component", todo.component);
      todo.isActive = true;
      todo["--colorNav"] = "white";
    }
  }
  
  goToComponent() {
    return this.$store.getters.component;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
// @import "../assets/css/font-awesome.min.css";

.home {
	margin: 0;
	width: 100%;
	min-height: 100vh;
	color: rgb(37, 73, 121);
	font-size: 18px;
}

.navbar {
	background: #c7e7e2;
	min-height: 100vh;
	min-width: 250px;
	text-align: left;

  p {
    margin: 0;
    padding: 10px;
    background-color: #41cadc;
    color: #ffffff;
    position: relative;
    left: 60px;
  }

  &__title {
    margin: 15px;
    margin-left: 0px;
    margin-right: 0px;
    background-color: #41cadc;

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
  }

  &__menu {
    display: grid;
	  grid-template-rows: repeat(2, auto);
  }

  &__menu-inner {
    /*margin: 3px;*/
    margin-left: 0px;
    margin-right: 0px;
    padding: 10px;
    padding-left: 20px;
    text-decoration: none;
    color: rgb(41, 59, 83);

    &:hover {
      background-color: #8ecbd3;
      color: #ffffff;
      cursor: pointer;
    }

    &:before {
      content: var(--before); /* добавляем иконку дом */
      font-family: FontAwesome;
      color: var(--colorNav);
      display: inline-block;
      min-width: 30px;
    }

    &:hover::before {
      color: white;
    }
  } 
}

.colorNav {
	background-color: #8ecbd3;
	color: #ffffff;
	cursor: pointer;
}

.right-block {
	overflow-x: hidden;
}
</style>
