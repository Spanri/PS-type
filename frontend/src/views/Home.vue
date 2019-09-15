<template>
	<div class="home">
		<navbar></navbar>
		<div class="content-block">
			<router-view></router-view>
		</div>
	</div>
</template>

<script lang="ts">
import axios from 'axios';
import { Component, Vue } from 'vue-property-decorator';
import Navbar from '@/components/Navbar.vue';

@Component({
	components: {
		Navbar,
	},
})

export default class App extends Vue {
}
</script>

<style lang="scss" scoped>
.home {
	margin: 0;
	width: 100%;
	min-height: 100vh;
	color: rgb(37, 73, 121);
	display: flex;
}

.content-block {
	overflow-x: hidden;
	flex: 100%;
}
</style>