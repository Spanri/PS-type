<template>
    <div class="map">
        <div class="google-map" :id="mapName"></div>
		<div>
			<form id="search">
            	<input name="query" v-model="filterKey">
        	</form>
			<div class="k"
				v-for="(key, index) in filteredData"
				:key="index"
				@click="showDate(key._id)"
				v-show="open">
				{{key.username}}
        	</div>
			<!-- дата -->
			<div class="oneUser" v-show="!open">
				<div class="k" @click="back">&#8592; Назад</div>
				<p> {{name}} </p>
				<div class="k"
					@click="timesOfDate(index)"
					v-for="(key, index) in filteredDate"
					:key="index">
					{{key}}
					<!-- время -->
					<div class="k2"
						@click="userOnMap(key, key2)"
						v-show="activeItem == index"
						v-for="(key2, index2) in filteredTime(key)"
						:key="index2">
						{{key2}}
						<!-- v-bind:class="{'active': open2}" -->
						<!-- @click="userOnMap(index, index2)" -->
						<!-- v-bind:style="activeItem == index2 ? 'display: block' : 'display: none'"  -->
					</div>
				</div>
			</div>

		</div>
    </div>
</template>

<script>
// @click="userOnMap(key._id)"
export default {
	name: "google-map",
	data: () => ({
		mapName: "google-map",
		map: null,
		all: "",
		flightPath: "",
		filterKey: '',
		open: true,
		activeItem: -1,
		i: ''
	}),
	created: function() {
		this.all = this.$store.getters.all;
	},
	computed: {
		name: function () {
			let id = this.i;
			let all = this.filteredData.filter(function (row) {
				return Object.keys(row).some(function (key) {
					return String(row[key]).toLowerCase().indexOf(id) > -1;
				})
			});
			return all["0"].username;
		},
		filteredData: function () {
            var filterKey = this.filterKey && this.filterKey.toLowerCase();
            var data = this.all;
            if (filterKey) {
                data = data.filter(function (row) {
                    return Object.keys(row).some(function (key) {
                        return String(row[key]).toLowerCase().indexOf(filterKey) > -1;
                    })
                })
            }
            return data;
        },
		filteredDate: function () {
			var data = this.all;
			let id = this.i;
            let all = data.filter(function (row) {
				return Object.keys(row).some(function (key) {
					return String(row[key]).toLowerCase().indexOf(id) > -1;
				})
			})["0"].track.dateTrack;
			//найти одинаковые даты и объединить их
			all = this.unique(all);
			var filterKey = this.filterKey && this.filterKey.toLowerCase();
            if (filterKey) {
                all = all.filter(function (row) {
                    return Object.keys(row).some(function (key) {
                        return String(row[key]).toLowerCase().indexOf(filterKey) > -1;
                    })
                })
            }
			return all;
		},

	},
	mounted: function() {
		const element = document.getElementById(this.mapName);
		const options = {
			zoom: 10,
			center: new google.maps.LatLng(55.754941, 37.617188)
		};
		this.map = new google.maps.Map(element, options);
	},
	methods: {
		filteredTime: function (index) {
			var data = this.all;
			let id = this.i;
            let all0 = data.filter(function (row) {
				return Object.keys(row).some(function (key) {
					return String(row[key]).toLowerCase().indexOf(id) > -1;
				})
			})["0"].track;
			let all = [];
			(all0.dateTrack).forEach((a, i) => {
				if(a == index)
					all.push(all0.startTime[i]+" - "+all0.stopTime[i]);
			});
			var filterKey = this.filterKey && this.filterKey.toLowerCase();
            if (filterKey) {
                all = all.filter(function (row) {
                    return Object.keys(row).some(function (key) {
                        return String(row[key]).toLowerCase().indexOf(filterKey) > -1;
                    })
                })
            }
			return all;
        },
		unique: function (arr) {
			// превратить в свойства и обратно в массив
			var obj = {};
			for (var i = 0; i < arr.length; i++) {
				var str = arr[i];
				obj[str] = true;
			}
			return Object.keys(obj);
		},
		showDate: async function (id) {
			this.i = id;
			this.open = false;
			this.filterKey = "";
		},
		timesOfDate: async function (index) {
			this.activeItem = (this.activeItem == index) ? -1 : index;
			this.filterKey = "";
		},
		userOnMap: async function(key, key2) {
			var data = this.all;
			let id = this.i;
      let all0 = data.filter(function (row) {
				return Object.keys(row).some(function (key) {
					return String(row[key]).toLowerCase().indexOf(id) > -1;
				})
			})["0"].track;
			// находим нужную дату, проверяем ее время
			// если совпало, берем индекс
			let ind, str;
			console.log(key+" "+key2);
			(all0.dateTrack).forEach((a, i) => {
				str = all0.startTime[i]+" - "+all0.stopTime[i];
				if(a == key && str == key2)
					ind = i;
			});
			let all = all0.points[ind];
			console.log(all);
			all = (JSON.parse(all)).track;
			//var all = this.$store.getters.all[id];
			if (this.flightPath) this.flightPath.setMap(null);
			let Latlng = [];
			// формируем в Latlng массив координат
			for (let i = 0; i < all.length; i++) {
				await Latlng.push({ lat: all[i].lat, lng: all[i].lon });
			}
			// рисуем координаты на карте и обновляем карту
			this.flightPath = new google.maps.Polyline({
				path: Latlng,
				geodesic: true,
				strokeColor: "rgb(41, 59, 83)",
				strokeOpacity: 1.0,
				strokeWeight: 2
			});
			this.flightPath.setMap(this.map);
			// масштабируем карту под координаты
			var bounds = new google.maps.LatLngBounds();
			Latlng.forEach(e => bounds.extend(e));
			bounds.getCenter();
			this.map.fitBounds(bounds);
		},
		back: function () {
            this.open = true
        },
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.map {
    margin: 15px;
    /* margin: 0; */
	display: grid;
	grid-template-columns: 1fr auto;
}

.google-map {
    min-width: 60vw;
    height: 90vh;
    margin: 0;
	margin-right: 10px;
    background: gray;
}

input{
	/* padding: 10px; */
	/* margin-right: 20px; */
	/* width: 80%; */
	margin: 0;
	height: 26px;
	font-size: 20px;
}

.k{
    border: 0;
    padding: 10px;
	margin: 10px;
	margin-left: 0px;
	margin-right: 0;
	/* min-width: 10vw; */
    font-size: 18px;
    background-color: #c7e7e2;
    color: rgb(41, 59, 83);
}
.k:hover{
	background-color: #8ecbd3;
	color: white;
	cursor: pointer;
}

.k2{
    border: 0;
    padding: 10px;
	margin: 10px;
	margin-left: 0px;
	margin-right: 0;
	/* min-width: 10vw; */
    font-size: 18px;
    background-color: #8ecbd3;
    color: rgb(41, 59, 83);
}

.k:hover > .k2{
	background-color: #c7e7e2;
	color: white;
	cursor: pointer;
}

.k:hover > .k2:hover{
	background-color: white;
	color:#8ecbd3;
	cursor: pointer;
}

.k2:hover{
	background-color: #c7e7e2;
	color: white;
	cursor: pointer;
}

.k2:active{
	background-color: rgb(41, 59, 83);
}

button{
	margin: 10px;
}

.active{
	display: block;
}

</style>
