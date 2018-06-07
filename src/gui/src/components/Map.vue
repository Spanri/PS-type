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
				@click="userOnMap(key._id)">
				{{key.username}}
        	</div>
		</div>
    </div>
</template>

<script>
export default {
	name: "google-map",
	data: () => ({
		mapName: "google-map",
		map: null,
		all: "",
		flightPath: "",
		filterKey: '',
	}),
	created: function() {
		this.all = this.$store.getters.all;
	},
	computed: {
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
        }
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
		userOnMap: async function(id) {
			let all = await this.all.filter(function (row) {
				return Object.keys(row).some(function (key) {
					return String(row[key]).toLowerCase().indexOf(id) > -1;
				})
			})
			all = all["0"];
			console.log(all);
			//var all = this.$store.getters.all[id];
			if (this.flightPath) this.flightPath.setMap(null);
			let geometry = Array();

			for (let i = 0; i < all.longitude.length; i++) {
				await geometry.push({ lat: all.latitude[i], lng: all.longitude[i] });
			}

			this.flightPath = new google.maps.Polyline({
				path: geometry,
				geodesic: true,
				strokeColor: "#FF0000",
				strokeOpacity: 1.0,
				strokeWeight: 2
			});
			this.flightPath.setMap(this.map);
			}
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

</style>