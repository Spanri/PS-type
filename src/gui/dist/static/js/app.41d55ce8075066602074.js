webpackJsonp([1],{"1bOg":function(t,e){},GcEV:function(t,e){},Kzl8:function(t,e){},L1Kh:function(t,e){},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n("fZjL"),i=n.n(r),o=n("7+uW"),a=function(t){if(Number(t.version.split(".")[0])>=2)t.mixin({beforeCreate:n});else{var e=t.prototype._init;t.prototype._init=function(t){void 0===t&&(t={}),t.init=t.init?[n].concat(t.init):n,e.call(this,t)}}function n(){var t=this.$options;t.store?this.$store="function"==typeof t.store?t.store():t.store:t.parent&&t.parent.$store&&(this.$store=t.parent.$store)}},s="undefined"!=typeof window&&window.__VUE_DEVTOOLS_GLOBAL_HOOK__;function c(t,e){Object.keys(t).forEach(function(n){return e(t[n],n)})}var u=function(t,e){this.runtime=e,this._children=Object.create(null),this._rawModule=t;var n=t.state;this.state=("function"==typeof n?n():n)||{}},l={namespaced:{configurable:!0}};l.namespaced.get=function(){return!!this._rawModule.namespaced},u.prototype.addChild=function(t,e){this._children[t]=e},u.prototype.removeChild=function(t){delete this._children[t]},u.prototype.getChild=function(t){return this._children[t]},u.prototype.update=function(t){this._rawModule.namespaced=t.namespaced,t.actions&&(this._rawModule.actions=t.actions),t.mutations&&(this._rawModule.mutations=t.mutations),t.getters&&(this._rawModule.getters=t.getters)},u.prototype.forEachChild=function(t){c(this._children,t)},u.prototype.forEachGetter=function(t){this._rawModule.getters&&c(this._rawModule.getters,t)},u.prototype.forEachAction=function(t){this._rawModule.actions&&c(this._rawModule.actions,t)},u.prototype.forEachMutation=function(t){this._rawModule.mutations&&c(this._rawModule.mutations,t)},Object.defineProperties(u.prototype,l);var d=function(t){this.register([],t,!1)};d.prototype.get=function(t){return t.reduce(function(t,e){return t.getChild(e)},this.root)},d.prototype.getNamespace=function(t){var e=this.root;return t.reduce(function(t,n){return t+((e=e.getChild(n)).namespaced?n+"/":"")},"")},d.prototype.update=function(t){!function t(e,n,r){0;n.update(r);if(r.modules)for(var i in r.modules){if(!n.getChild(i))return void 0;t(e.concat(i),n.getChild(i),r.modules[i])}}([],this.root,t)},d.prototype.register=function(t,e,n){var r=this;void 0===n&&(n=!0);var i=new u(e,n);0===t.length?this.root=i:this.get(t.slice(0,-1)).addChild(t[t.length-1],i);e.modules&&c(e.modules,function(e,i){r.register(t.concat(i),e,n)})},d.prototype.unregister=function(t){var e=this.get(t.slice(0,-1)),n=t[t.length-1];e.getChild(n).runtime&&e.removeChild(n)};var h;var p=function(t){var e=this;void 0===t&&(t={}),!h&&"undefined"!=typeof window&&window.Vue&&b(window.Vue);var n=t.plugins;void 0===n&&(n=[]);var r=t.strict;void 0===r&&(r=!1);var i=t.state;void 0===i&&(i={}),"function"==typeof i&&(i=i()||{}),this._committing=!1,this._actions=Object.create(null),this._actionSubscribers=[],this._mutations=Object.create(null),this._wrappedGetters=Object.create(null),this._modules=new d(t),this._modulesNamespaceMap=Object.create(null),this._subscribers=[],this._watcherVM=new h;var o=this,a=this.dispatch,c=this.commit;this.dispatch=function(t,e){return a.call(o,t,e)},this.commit=function(t,e,n){return c.call(o,t,e,n)},this.strict=r,_(this,i,[],this._modules.root),g(this,i),n.forEach(function(t){return t(e)}),h.config.devtools&&function(t){s&&(t._devtoolHook=s,s.emit("vuex:init",t),s.on("vuex:travel-to-state",function(e){t.replaceState(e)}),t.subscribe(function(t,e){s.emit("vuex:mutation",t,e)}))}(this)},f={state:{configurable:!0}};function m(t,e){return e.indexOf(t)<0&&e.push(t),function(){var n=e.indexOf(t);n>-1&&e.splice(n,1)}}function v(t,e){t._actions=Object.create(null),t._mutations=Object.create(null),t._wrappedGetters=Object.create(null),t._modulesNamespaceMap=Object.create(null);var n=t.state;_(t,n,[],t._modules.root,!0),g(t,n,e)}function g(t,e,n){var r=t._vm;t.getters={};var i={};c(t._wrappedGetters,function(e,n){i[n]=function(){return e(t)},Object.defineProperty(t.getters,n,{get:function(){return t._vm[n]},enumerable:!0})});var o=h.config.silent;h.config.silent=!0,t._vm=new h({data:{$$state:e},computed:i}),h.config.silent=o,t.strict&&function(t){t._vm.$watch(function(){return this._data.$$state},function(){0},{deep:!0,sync:!0})}(t),r&&(n&&t._withCommit(function(){r._data.$$state=null}),h.nextTick(function(){return r.$destroy()}))}function _(t,e,n,r,i){var o=!n.length,a=t._modules.getNamespace(n);if(r.namespaced&&(t._modulesNamespaceMap[a]=r),!o&&!i){var s=y(e,n.slice(0,-1)),c=n[n.length-1];t._withCommit(function(){h.set(s,c,r.state)})}var u=r.context=function(t,e,n){var r=""===e,i={dispatch:r?t.dispatch:function(n,r,i){var o=w(n,r,i),a=o.payload,s=o.options,c=o.type;return s&&s.root||(c=e+c),t.dispatch(c,a)},commit:r?t.commit:function(n,r,i){var o=w(n,r,i),a=o.payload,s=o.options,c=o.type;s&&s.root||(c=e+c),t.commit(c,a,s)}};return Object.defineProperties(i,{getters:{get:r?function(){return t.getters}:function(){return function(t,e){var n={},r=e.length;return Object.keys(t.getters).forEach(function(i){if(i.slice(0,r)===e){var o=i.slice(r);Object.defineProperty(n,o,{get:function(){return t.getters[i]},enumerable:!0})}}),n}(t,e)}},state:{get:function(){return y(t.state,n)}}}),i}(t,a,n);r.forEachMutation(function(e,n){!function(t,e,n,r){(t._mutations[e]||(t._mutations[e]=[])).push(function(e){n.call(t,r.state,e)})}(t,a+n,e,u)}),r.forEachAction(function(e,n){var r=e.root?n:a+n,i=e.handler||e;!function(t,e,n,r){(t._actions[e]||(t._actions[e]=[])).push(function(e,i){var o,a=n.call(t,{dispatch:r.dispatch,commit:r.commit,getters:r.getters,state:r.state,rootGetters:t.getters,rootState:t.state},e,i);return(o=a)&&"function"==typeof o.then||(a=Promise.resolve(a)),t._devtoolHook?a.catch(function(e){throw t._devtoolHook.emit("vuex:error",e),e}):a})}(t,r,i,u)}),r.forEachGetter(function(e,n){!function(t,e,n,r){if(t._wrappedGetters[e])return void 0;t._wrappedGetters[e]=function(t){return n(r.state,r.getters,t.state,t.getters)}}(t,a+n,e,u)}),r.forEachChild(function(r,o){_(t,e,n.concat(o),r,i)})}function y(t,e){return e.length?e.reduce(function(t,e){return t[e]},t):t}function w(t,e,n){var r;return null!==(r=t)&&"object"==typeof r&&t.type&&(n=e,e=t,t=t.type),{type:t,payload:e,options:n}}function b(t){h&&t===h||a(h=t)}f.state.get=function(){return this._vm._data.$$state},f.state.set=function(t){0},p.prototype.commit=function(t,e,n){var r=this,i=w(t,e,n),o=i.type,a=i.payload,s=(i.options,{type:o,payload:a}),c=this._mutations[o];c&&(this._withCommit(function(){c.forEach(function(t){t(a)})}),this._subscribers.forEach(function(t){return t(s,r.state)}))},p.prototype.dispatch=function(t,e){var n=this,r=w(t,e),i=r.type,o=r.payload,a={type:i,payload:o},s=this._actions[i];if(s)return this._actionSubscribers.forEach(function(t){return t(a,n.state)}),s.length>1?Promise.all(s.map(function(t){return t(o)})):s[0](o)},p.prototype.subscribe=function(t){return m(t,this._subscribers)},p.prototype.subscribeAction=function(t){return m(t,this._actionSubscribers)},p.prototype.watch=function(t,e,n){var r=this;return this._watcherVM.$watch(function(){return t(r.state,r.getters)},e,n)},p.prototype.replaceState=function(t){var e=this;this._withCommit(function(){e._vm._data.$$state=t})},p.prototype.registerModule=function(t,e,n){void 0===n&&(n={}),"string"==typeof t&&(t=[t]),this._modules.register(t,e),_(this,this.state,t,this._modules.get(t),n.preserveState),g(this,this.state)},p.prototype.unregisterModule=function(t){var e=this;"string"==typeof t&&(t=[t]),this._modules.unregister(t),this._withCommit(function(){var n=y(e.state,t.slice(0,-1));h.delete(n,t[t.length-1])}),v(this)},p.prototype.hotUpdate=function(t){this._modules.update(t),v(this,!0)},p.prototype._withCommit=function(t){var e=this._committing;this._committing=!0,t(),this._committing=e},Object.defineProperties(p.prototype,f);var k=C(function(t,e){var n={};return $(e).forEach(function(e){var r=e.key,i=e.val;n[r]=function(){var e=this.$store.state,n=this.$store.getters;if(t){var r=E(this.$store,"mapState",t);if(!r)return;e=r.context.state,n=r.context.getters}return"function"==typeof i?i.call(this,e,n):e[i]},n[r].vuex=!0}),n}),O=C(function(t,e){var n={};return $(e).forEach(function(e){var r=e.key,i=e.val;n[r]=function(){for(var e=[],n=arguments.length;n--;)e[n]=arguments[n];var r=this.$store.commit;if(t){var o=E(this.$store,"mapMutations",t);if(!o)return;r=o.context.commit}return"function"==typeof i?i.apply(this,[r].concat(e)):r.apply(this.$store,[i].concat(e))}}),n}),x=C(function(t,e){var n={};return $(e).forEach(function(e){var r=e.key,i=e.val;i=t+i,n[r]=function(){if(!t||E(this.$store,"mapGetters",t))return this.$store.getters[i]},n[r].vuex=!0}),n}),A=C(function(t,e){var n={};return $(e).forEach(function(e){var r=e.key,i=e.val;n[r]=function(){for(var e=[],n=arguments.length;n--;)e[n]=arguments[n];var r=this.$store.dispatch;if(t){var o=E(this.$store,"mapActions",t);if(!o)return;r=o.context.dispatch}return"function"==typeof i?i.apply(this,[r].concat(e)):r.apply(this.$store,[i].concat(e))}}),n});function $(t){return Array.isArray(t)?t.map(function(t){return{key:t,val:t}}):Object.keys(t).map(function(e){return{key:e,val:t[e]}})}function C(t){return function(e,n){return"string"!=typeof e?(n=e,e=""):"/"!==e.charAt(e.length-1)&&(e+="/"),t(e,n)}}function E(t,e,n){return t._modulesNamespaceMap[n]}var F={Store:p,install:b,version:"3.0.1",mapState:k,mapMutations:O,mapGetters:x,mapActions:A,createNamespacedHelpers:function(t){return{mapState:k.bind(null,t),mapGetters:x.bind(null,t),mapMutations:O.bind(null,t),mapActions:A.bind(null,t)}}},M={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var S=n("VU/8")({name:"app"},M,!1,function(t){n("1bOg")},null,null).exports,N=n("/ocq"),j=n("mtWM"),P=n.n(j),K={name:"Auth",data:function(){return{displayError:"none",username:"",password:""}},methods:{login:function(t){var e=this;this.displayError="none",this.http.post("api/v1/signin",{username:this.username,password:this.password}).then(function(t){sessionStorage.setItem("token",t.data.token),e.$router.push({path:"/main"})}).catch(function(t){console.log(t),e.displayError="block"})}}},U={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"auth"},[n("p",{staticClass:"title"},[t._v("Авторизация")]),t._v(" "),n("div",{staticClass:"inp"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.username,expression:"username"}],attrs:{id:"username",type:"text",placeholder:"Логин"},domProps:{value:t.username},on:{input:function(e){e.target.composing||(t.username=e.target.value)}}})]),t._v(" "),n("div",{staticClass:"inp"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],attrs:{id:"password",type:"password",placeholder:"Пароль"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}})]),t._v(" "),n("input",{attrs:{id:"login",type:"submit",value:""},on:{click:t.login}}),t._v(" "),n("div",{style:{display:t.displayError},attrs:{id:"error"}},[t._v("\n      Всё плохо.\n  ")])])},staticRenderFns:[]};var L=n("VU/8")(K,U,!1,function(t){n("Kzl8")},"data-v-3f648abd",null).exports,V=n("BO1k"),G=n.n(V),I=n("Xxa5"),B=n.n(I),R=n("exGp"),D=n.n(R),H={name:"All",data:function(){return{filterKey:"",sortKey:"",sortOrders:{},columns:["username","name","age","sex"],columnsName:["Имя (username)","Имя (name)","Возраст","Пол"],data:""}},created:function(){this.data=this.$store.getters.all;var t={};this.columns.forEach(function(e){t[e]=1}),this.sortOrders=t},computed:{filteredData:function(){var t=this.sortKey,e=this.filterKey&&this.filterKey.toLowerCase(),n=this.sortOrders[t]||1,r=this.data;return e&&(r=r.filter(function(t){return i()(t).some(function(n){return String(t[n]).toLowerCase().indexOf(e)>-1})})),t&&(r=r.slice().sort(function(e,r){return((e=e[t])===(r=r[t])?0:e>r?1:-1)*n})),r}},filters:{capitalize:function(t){return t.charAt(0).toUpperCase()+t.slice(1)}},methods:{sortBy:function(t){this.sortKey=t,this.sortOrders[t]=-1*this.sortOrders[t]},toOneUser:function(t){this.$store.commit("id",t),this.$store.commit("component","page-one-user")}}},T={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"all"},[n("form",{attrs:{id:"search"}},[n("p",{staticStyle:{display:"inline-block"}},[t._v("Найти пользователя")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.filterKey,expression:"filterKey"}],attrs:{name:"query"},domProps:{value:t.filterKey},on:{input:function(e){e.target.composing||(t.filterKey=e.target.value)}}})]),t._v(" "),n("table",[n("thead",[n("tr",t._l(t.columns,function(e,r){return n("th",{key:e.id,class:{active:t.sortKey==e},on:{click:function(n){t.sortBy(e)}}},[t._v("\n                "+t._s(t._f("capitalize")(t.columnsName[r]))+"\n                "),n("span",{staticClass:"arrow",class:t.sortOrders[e]>0?"asc":"dsc"})])}))]),t._v(" "),n("tbody",t._l(t.filteredData,function(e,r){return n("tr",{key:e.id,on:{click:function(e){t.toOneUser(r)}}},t._l(t.columns,function(r){return n("td",{key:r.id},[t._v("\n                    "+t._s("name"==r&&"admin0"==e.username?"admin0":e[r])+"\n                ")])}))}))])])},staticRenderFns:[]};var q=n("VU/8")(H,T,!1,function(t){n("L1Kh")},"data-v-4e02377d",null).exports,z={name:"google-map",data:function(){return{mapName:"google-map",map:null,all:"",flightPath:"",filterKey:""}},created:function(){this.all=this.$store.getters.all},computed:{filteredData:function(){var t=this.filterKey&&this.filterKey.toLowerCase(),e=this.all;return t&&(e=e.filter(function(e){return i()(e).some(function(n){return String(e[n]).toLowerCase().indexOf(t)>-1})})),e}},mounted:function(){var t=document.getElementById(this.mapName),e={zoom:10,center:new google.maps.LatLng(55.754941,37.617188)};this.map=new google.maps.Map(t,e)},methods:{userOnMap:function(){var t=D()(B.a.mark(function t(e){var n,r,o;return B.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.all.filter(function(t){return i()(t).some(function(n){return String(t[n]).toLowerCase().indexOf(e)>-1})});case 2:n=(n=t.sent)[0],this.flightPath&&this.flightPath.setMap(null),r=Array(),o=0;case 7:if(!(o<n.longitude.length)){t.next=13;break}return t.next=10,r.push({lat:n.latitude[o],lng:n.longitude[o]});case 10:o++,t.next=7;break;case 13:this.flightPath=new google.maps.Polyline({path:r,geodesic:!0,strokeColor:"rgb(41, 59, 83)",strokeOpacity:1,strokeWeight:2}),this.flightPath.setMap(this.map);case 15:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}()}},W={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"map"},[n("div",{staticClass:"google-map",attrs:{id:t.mapName}}),t._v(" "),n("div",[n("form",{attrs:{id:"search"}},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.filterKey,expression:"filterKey"}],attrs:{name:"query"},domProps:{value:t.filterKey},on:{input:function(e){e.target.composing||(t.filterKey=e.target.value)}}})]),t._v(" "),t._l(t.filteredData,function(e,r){return n("div",{key:r,staticClass:"k",on:{click:function(n){t.userOnMap(e._id)}}},[t._v("\n\t\t\t\t"+t._s(e.username)+"\n        \t")])})],2)])},staticRenderFns:[]};var X=n("VU/8")(z,W,!1,function(t){n("GcEV")},"data-v-3672e023",null).exports,Z={name:"Map",data:function(){return{data:"",data2:"",show_tooltip:!1,show_doc:!0,show_cancel:!1,grid:"1fr auto",change:"Изменить документацию"}},created:function(){this.data=this.$store.getters.doc,this.data2=this.data},methods:{clickButton:function(){this.show_tooltip=!this.show_tooltip,this.show_doc=!this.show_doc,this.show_cancel=!this.show_cancel,"Изменить документацию"==this.change?(this.grid="1fr auto auto",this.change="Подтвердить",this.data2=this.data2.replace(/<br\/>/g,"\n")):(this.grid="1fr auto",this.confirmButton(),this.change="Изменить документацию")},cancel:function(){this.show_tooltip=!this.show_tooltip,this.show_doc=!this.show_doc,this.change="Изменить документацию",this.show_cancel=!1},confirmButton:function(){var t=D()(B.a.mark(function t(){return B.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return this.data=this.data2.replace(/\n/g,"<br/>"),t.next=3,this.http.post("api/v1/data/change",{token:sessionStorage.getItem("token"),name:this.data}).then(function(t){console.log("Изменили документацию")}).catch(function(t){console.log(t),console.log("Что-то не то введено")});case 3:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()}},J={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"docum"},[n("div",{staticClass:"title",style:{gridTemplateColumns:t.grid}},[n("p",[t._v(" Документация по базе данных. ")]),t._v(" "),t.show_cancel?n("button",{staticStyle:{"margin-right":"15px"},on:{click:function(e){t.cancel()}}},[t._v(" Отменить ")]):t._e(),t._v(" "),n("button",{on:{click:function(e){t.clickButton()}}},[t._v(" "+t._s(t.change)+" ")])]),t._v(" "),t.show_tooltip?n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.data2,expression:"data2"}],staticClass:"tooltip",attrs:{wrap:"hard"},domProps:{value:t.data2},on:{click:function(t){t.stopPropagation()},input:function(e){e.target.composing||(t.data2=e.target.value)}}}):t._e(),t._v(" "),t.show_doc?n("p",{staticClass:"doc",domProps:{innerHTML:t._s(t.data)}}):t._e()])},staticRenderFns:[]};var Y=n("VU/8")(Z,J,!1,function(t){n("tXZo")},"data-v-1c741910",null).exports,Q=n("pFYg"),tt=n.n(Q),et={name:"item",props:{model:{type:Object,required:!1,default:function(){return{value:this.$store.getters.allId,name:this.$store.getters.allId.username}}}},data:function(){return{open:!1}},created:function(){},computed:{begin:function(){return this.$store.getters.allId==this.data?"begin":""},data:function(){return(this.model.value==this.$store.getters.allId||this.model.value.length<10)&&(this.open=!0),this.model.value},name:function(){return this.model.name},isFolder:function(){return"object"==tt()(this.data)&&!Array.isArray(this.data)&&i()(this.data)},isArray:function(){return!(!Array.isArray(this.data)||0==this.data.length)&&this.data}},methods:{toggle:function(){(this.isFolder||this.isArray)&&(this.open=!this.open)},toOtherAccel:function(){var t=D()(B.a.mark(function t(){return B.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.$store.commit("masForOtherAccel",this.data);case 2:this.$store.commit("component","other-accel");case 3:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()}},nt={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"oneUser",class:t.begin},[n("li",[n("div",{class:{bold:t.isFolder},staticStyle:{display:"inline-block"},on:{click:t.toggle}},[t._v("\n            "+t._s(t.name)+": \n            "),t.isFolder||t.isArray?n("span",[t._v("["+t._s(t.open?"-":"+")+"]")]):t._e(),t._v(" "),"accel"==t.name?n("button",{on:{click:function(e){t.toOtherAccel()}}},[t._v("\n                Другая версия отображения\n            ")]):t._e()]),t._v(" "),t.isArray?n("p",{directives:[{name:"show",rawName:"v-show",value:t.open,expression:"open"}],staticStyle:{display:"inline-block",margin:"0"}},[t._v("\n            "+t._s(t.data)+"\n        ")]):t.isFolder?n("ul",{directives:[{name:"show",rawName:"v-show",value:t.open,expression:"open"}],staticStyle:{margin:"0"}},t._l(t.data,function(t,e){return n("item",{key:e,staticClass:"item",attrs:{model:{value:t,name:e}}})})):n("p",{staticStyle:{display:"inline-block",margin:"0"}},[t._v("\n            "+t._s(t.data)+"\n        ")])])])},staticRenderFns:[]};var rt=n("VU/8")(et,nt,!1,function(t){n("xjag")},"data-v-3f0aa925",null).exports,it={name:"item",props:{model:{type:Object,required:!1,default:function(){return{value:this.$store.getters.masForOtherAccel,name:"accel"}}}},data:function(){return{open:!0}},computed:{begin:function(){return this.$store.getters.masForOtherAccel==this.data?"begin":""},data:function(){return(this.model.value==this.$store.getters.masForOtherAccel||this.model.value.length<10)&&(this.open=!0),this.model.value},name:function(){return this.model.name},isFolder:function(){return"object"==tt()(this.data)&&!Array.isArray(this.data)&&i()(this.data)},isArray:function(){return!(!Array.isArray(this.data)||0==this.data.length)&&this.data}},methods:{toggle:function(){(this.isFolder||this.isArray)&&(this.open=!this.open)},back:function(){this.$store.commit("component","page-one-user")}}},ot={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"oneUser",class:t.begin},[this.$store.getters.masForOtherAccel==this.data?n("button",{on:{click:function(e){t.back()}}},[t._v(" \n        ← Назад\n    ")]):t._e(),t._v(" "),n("li",[n("div",{class:{bold:t.isFolder},staticStyle:{display:"inline-block"},on:{click:t.toggle}},[t._v("\n            "+t._s(t.name)+": \n            "),t.isFolder||t.isArray?n("span",[t._v("["+t._s(t.open?"-":"+")+"]")]):t._e()]),t._v(" "),t.isArray?n("ul",{directives:[{name:"show",rawName:"v-show",value:t.open,expression:"open"}],staticStyle:{margin:"0"}},t._l(t.data,function(t,e){return n("item",{key:e,staticClass:"item",attrs:{model:{value:t,name:e},first:!1}})})):t.isFolder?n("p",{directives:[{name:"show",rawName:"v-show",value:t.open,expression:"open"}],staticStyle:{display:"inline-block",margin:"0"}},[t._v("\n            "+t._s(t.data)+"\n        ")]):n("p",{staticStyle:{display:"inline-block",margin:"0"}},[t._v("\n            "+t._s(t.data)+"\n        ")])])])},staticRenderFns:[]};var at={name:"Main",components:{PageAll:q,PageMap:X,PageDoc:Y,PageOneUser:rt,OtherAccel:n("VU/8")(it,ot,!1,function(t){n("P5gK")},"data-v-4c67e9a2",null).exports},data:function(){return{displayError:"none",displaySuccess:"none",componentName:null,todos:[{text:"Все юзеры",component:"page-all","--before":"'\\f007'","--colorNav":"#41cadc",isActive:!1},{text:"Карты",component:"page-map","--before":"'\\f041'","--colorNav":"#41cadc",isActive:!1},{text:"Документация",component:"page-doc","--before":"'\\f15c'","--colorNav":"#41cadc",isActive:!1}]}},created:function(){var t=D()(B.a.mark(function t(){var e=this;return B.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.http.post("api/v1/data/",{token:sessionStorage.getItem("token")}).then(function(){var t=D()(B.a.mark(function t(n){return B.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.displaySuccess="grid",t.next=3,e.http.post("api/v1/data/all",{token:sessionStorage.getItem("token")}).then(function(t){e.$store.commit("all",t.data.all);var n=t.data.all.filter(function(t){return i()(t).some(function(e){return String(t[e]).toLowerCase().indexOf("admin0")>-1})});e.$store.commit("doc",n[0].name)});case 3:case"end":return t.stop()}},t,e)}));return function(e){return t.apply(this,arguments)}}()).catch(function(t){console.log(t),e.displayError="block"});case 2:this.nav(0);case 4:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),methods:{nav:function(t){var e=!0,n=!1,r=void 0;try{for(var i,o=G()(this.todos);!(e=(i=o.next()).done);e=!0){var a=i.value;a.isActive=!1,a["--colorNav"]="#41cadc"}}catch(t){n=!0,r=t}finally{try{!e&&o.return&&o.return()}finally{if(n)throw r}}var s=this.todos[t];this.$store.commit("component",s.component),s.isActive=!0,s["--colorNav"]="white"}}},st={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"main"},[n("div",{style:{display:t.displayError},attrs:{id:"error"}},[n("p",[t._v("Ошибка. Кажется, вы пропустили процедуру аутентификации.")]),t._v(" "),n("router-link",{attrs:{to:"/"}},[t._v("\n      На главную\n    ")])],1),t._v(" "),n("div",{style:{display:t.displaySuccess},attrs:{id:"success"}},[n("header",[t._m(0),t._v(" "),n("div",{staticClass:"nav"},t._l(t.todos,function(e,r){return n("div",{key:e.id,staticClass:"nav2",class:{colorNav:e.isActive},style:e,on:{click:function(e){t.nav(r)}}},[t._v("\n          "+t._s(e.text)+"\n        ")])}))]),t._v(" "),n("div",{staticClass:"right"},[n(this.$store.getters.component,{tag:"div"})])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"title"},[e("span",{staticClass:"i"}),this._v(" "),e("p",{staticStyle:{display:"inline-block"}},[this._v("Панель управления")])])}]};var ct=n("VU/8")(at,st,!1,function(t){n("XDrW")},"data-v-51d2bc85",null).exports;o.a.use(N.a);var ut=new N.a({mode:"history",routes:[{path:"/",name:"Auth",component:L},{path:"/main",name:"Main",component:ct}]});o.a.config.productionTip=!1,o.a.prototype.http=P.a.create({baseURL:"https://pstype.herokuapp.com/",headers:{"Content-Type":"application/json"}}),o.a.use(F);var lt=new F.Store({state:{all:[],doc:"",component:null,id:"",masForOtherAccel:[]},actions:{},mutations:{all:function(t,e){t.all=e},doc:function(t,e){t.doc=e},component:function(t,e){t.component=e},id:function(t,e){t.id=e},masForOtherAccel:function(t,e){t.masForOtherAccel=e}},getters:{all:function(t){return t.all},doc:function(t){return t.doc},component:function(t){return t.component},allId:function(t){return t.all[t.id]},masForOtherAccel:function(t){t.masForOtherAccel.mas=[];for(var e=i()(t.masForOtherAccel)[0],n=t.masForOtherAccel[e].length,r=0;r<n;r++){var o=i()(t.masForOtherAccel).length-1;t.masForOtherAccel.mas[r]={};for(var a=0;a<o;a++){var s=i()(t.masForOtherAccel)[a];t.masForOtherAccel.mas[r][s]=t.masForOtherAccel[s][r]}}return t.masForOtherAccel.mas}},modules:{}});new o.a({el:"#app",store:lt,router:ut,components:{App:S},template:"<App/>"})},P5gK:function(t,e){},XDrW:function(t,e){},tXZo:function(t,e){},xjag:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.41d55ce8075066602074.js.map