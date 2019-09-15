<template>
	<div class="maps">
		<p>Приветик</p>
		<!-- <GmapMap
			class = "google-map"
			:center = "{lat: 10, lng: 10}"
			:zoom = "7"
			map-type-id = "terrain"
		>
			<GmapMarker ref="myMarker"
				:position="google && new google.maps.LatLng(latitude, longitude)"
				@click="infoWinOpen=!infoWinOpen"
			/>
		</GmapMap> -->
		<!-- <div class="google-map" :id="mapName"></div> -->
		<!-- <form id="search">
			<input name="query" v-model="filterKey">
		</form>
		<div class="k"
			v-for="(key, index) in filteredData"
			:key="index"
			@click="showDate(key._id)"
			v-show="open">
			{{key.username}}
		</div>
		<div class="oneUser" v-show="!open">
			<div class="k" @click="back">&#8592; Назад</div>
			<p>{{name}}</p>
			<div class="k"
				@click="timesOfDate(index)"
				v-for="(key, index) in filteredDate"
				:key="index">
				{{key}}
				<div class="k2"
					@click="userOnMap(key, key2)"
					v-show="activeItem == index"
					v-for="(key2, index2) in filteredTime(key)"
					:key="index2">
					{{key2}}
				</div>
			</div>
		</div> -->
	</div>
</template>

<script lang="ts">
import axios from 'axios';
import { Vue } from 'vue-property-decorator';
// import { gmapApi } from 'vue2-google-maps';

export default class Maps extends Vue {
	// data
	// public mapName: string = 'google-map';
	public latitude: number = 10;
	public longitude: number = 10;
	public map: any = null;
	public all: any = '';
	public flightPath: any = '';
	public filterKey: any = '';
	public open: boolean = true;
	public activeItem: any = -1;
	public i: any = '';
	// life hooks
	public created() {
		this.all = 'this.$store.getters.all';
	}
	// computed data
	// get google() {
	// 	return gmapApi;
	// }
	// get name () {
	// 	let id = this.i;
	// 	let all = this.filteredData.filter(function(row: any) {
	// 		return Object.keys(row).some(function(key: any) {
	// 			return String(row[key]).toLowerCase().indexOf(id) > -1;
	// 		})
	// 	});
	// 	return all['0'].username;
	// }
	// get filteredData() {
	// 	var filterKey = this.filterKey && this.filterKey.toLowerCase();
	// 	var data = this.all;
	// 	if (filterKey) {
	// 		data = data.filter(function(row: any) {
	// 			return Object.keys(row).some(function(key: any) {
	// 				return String(row[key]).toLowerCase().indexOf(filterKey) > -1;
	// 			})
	// 		})
	// 	}
	// 	return data;
	// }
	// get filteredDate() {
	// 	var data = this.all;
	// 	let id = this.i;
	// 	let all = data.filter(function(row: any) {
	// 		return Object.keys(row).some(function(key: any) {
	// 			return String(row[key]).toLowerCase().indexOf(id) > -1;
	// 		})
	// 	})['0'].track.dateTrack;
	// 	//найти одинаковые даты и объединить их
	// 	all = this.unique(all);
	// 	var filterKey = this.filterKey && this.filterKey.toLowerCase();
	// 	if (filterKey) {
	// 		all = all.filter(function(row: any) {
	// 			return Object.keys(row).some(function(key: any) {
	// 				return String(row[key]).toLowerCase().indexOf(filterKey) > -1;
	// 			})
	// 		})
	// 	}
	// 	return all;
	// }
	// methods
	// public filteredTime(index: any) {
	// 	var data = this.all;
	// 	let id = this.i;
	// 				let all0 = data.filter(function(row: any) {
	// 		return Object.keys(row).some(function(key: any) {
	// 			return String(row[key]).toLowerCase().indexOf(id) > -1;
	// 		})
	// 	})['0'].track;
	// 	let all = [];
	// 	(all0.dateTrack).forEach((a, i) => {
	// 		if(a == index)
	// 			all.push(all0.startTime[i] + ' - ' + all0.stopTime[i]);
	// 	});
	// 	var filterKey = this.filterKey && this.filterKey.toLowerCase();
	// 		if (filterKey) {
	// 			all = all.filter(function (row) {
	// 				return Object.keys(row).some(function (key) {
	// 					return String(row[key]).toLowerCase().indexOf(filterKey) > -1;
	// 				})
	// 			})
	// 		}
	// 	return all;
	// }
	// public unique(arr: any) {
	// 	// превратить в свойства и обратно в массив
	// 	var obj = {};
	// 	for (var i = 0; i < arr.length; i++) {
	// 		var str = arr[i];
	// 		obj[str] = true;
	// 	}
	// 	return Object.keys(obj);
	// }
	// public async showDate(id: any) {
	// 	this.i = id;
	// 	this.open = false;
	// 	this.filterKey = '';
	// }
	// public async timesOfDate(index: any) {
	// 	this.activeItem = (this.activeItem == index) ? -1 : index;
	// 	this.filterKey = '';
	// }
	// public async userOnMap(key: any, key2: any) {
	// 	const data = this.all;
	// 	let id = this.i;
	// 	let all0 = data.filter(function(row: any) {
	// 		return Object.keys(row).some(function(key: any) {
	// 			return String(row[key]).toLowerCase().indexOf(id) > -1;
	// 		})
	// 	})['0'].track;
	// 	// находим нужную дату, проверяем ее время
	// 	// если совпало, берем индекс
	// 	let ind, str;
	// 	console.log(key + ' ' + key2);
	// 	(all0.dateTrack).forEach((a: any, i: any) => {
	// 		str = all0.startTime[i] + ' - ' + all0.stopTime[i];
	// 		if (a === key && str === key2) {
	// 			ind = i;
	// 		}
	// 	});
	// 	let all = all0.points[ind];
	// 	console.log(all);
	// 	all = (JSON.parse(all)).track;
	// 	// var all = this.$store.getters.all[id];
	// 	if (this.flightPath) {
	// 		this.flightPath.setMap(null);
	// 	}
	// 	var Latlng = [];
	// 	// формируем в Latlng массив координат
	// 	for (let i = 0; i < all.length; i++) {
	// 		await Latlng.push({lat: all[i].lat, lng: all[i].lon});
	// 	}
	// 	// рисуем координаты на карте и обновляем карту
	// 	this.flightPath = new google.maps.Polyline({
	// 		path: Latlng,
	// 		geodesic: true,
	// 		strokeColor: 'rgb(41, 59, 83)',
	// 		strokeOpacity: 1.0,
	// 		strokeWeight: 2,
	// 	});
	// 	this.flightPath.setMap(this.map);
	// 	// масштабируем карту под координаты
	// 	const bounds = new google.maps.LatLngBounds();
	// 	Latlng.forEach((e) => bounds.extend(e));
	// 	bounds.getCenter();
	// 	this.map.fitBounds(bounds);
	// }
	// public back() {
	// 	this.open = true;
	// }
}
</script>

<style scoped lang="scss">
.maps {
	margin: 15px;
	display: grid;
	grid-template-columns: 1fr auto;
}

.google-map {
	width: 500px;
	height: 300px;
	min-width: 60vw;
	// height: 90vh;
	margin: 0;
	margin-right: 10px;
	background: gray;
}

input {
	margin: 0;
	height: 26px;
	font-size: 20px;
}

.k {
	border: 0;
	padding: 10px;
	margin: 10px;
	margin-left: 0px;
	margin-right: 0;
	font-size: 18px;
	background-color: #c7e7e2;
	color: rgb(41, 59, 83);
}
.k:hover {
	background-color: #8ecbd3;
	color: white;
	cursor: pointer;
}

.k2 {
	border: 0;
	padding: 10px;
	margin: 10px;
	margin-left: 0px;
	margin-right: 0;
	font-size: 18px;
	background-color: #8ecbd3;
	color: rgb(41, 59, 83);
}

.k:hover > .k2 {
	background-color: #c7e7e2;
	color: white;
	cursor: pointer;
}

.k:hover > .k2:hover {
	background-color: white;
	color:#8ecbd3;
	cursor: pointer;
}

.k2:hover {
	background-color: #c7e7e2;
	color: white;
	cursor: pointer;
}

.k2:active {
	background-color: rgb(41, 59, 83);
}

button {
	margin: 10px;
}

.active {
	display: block;
}
</style>