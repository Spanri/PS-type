<template>
	<div class="notes">
		<div class="notes__title" v-bind:style="{ gridTemplateColumns: grid }">
			<h1 class="notes__title-text">Заметки от разработчика</h1>
			<div v-if="edit == false" class="notes__edit_false">
				<button class="button" @click="editC()">РЕДАКТИРОВАТЬ</button>
			</div>
			<div v-else class="notes__edit_true">
				<button class="button notes__button_cancel" @click="cancel()">ОТМЕНИТЬ</button>
				<button class="button notes__button_confirm" @click="confirm()">ПОДТВЕРДИТЬ</button>
			</div>
		</div>
		<div class="notes__content">
			<p v-if="edit == false" class="notes__content_view" v-html="data"></p>
			<textarea v-else wrap="hard" class="notes__content_edit" v-on:click.stop v-model="data2"></textarea>
		</div>
	</div>
</template>

<script lang="ts">
import axios from 'axios';
import { Vue } from 'vue-property-decorator';

export default class Notes extends Vue {
	// data
	public edit: boolean = false;
	public data: string = '';
	public data2: string = '';
	public grid: any = '1fr auto';
	public change: any = 'РЕДАИРОВАТЬ';
	// life hooks
	public created() {
		this.data = this.data2 = 'this.$store.getters.doc';
	}
	// methods
	public editC() {
		this.edit = true;
		console.log(this.edit);
	}
	public confirm() {
		axios.post('api/v1/data/change', {
			token: sessionStorage.getItem('token'),
			name: this.data2.replace(/<br\/>/g, '\n'),
		})
		.then((response) => {
			console.log('Изменили документацию');
			this.data = this.data2.replace(/<br\/>/g, '\n');
			this.edit = false;
		})
		.catch((e) => {
			console.log(e);
			console.log('Что-то не то введено');
		});
	}
	public cancel() {
		this.edit = false;
	}
}
</script>

<style scoped lang="scss">
.notes{
	text-align: left;
	padding: 0;
	height: 100vh;
	display: flex;
	flex-direction: column;
	font-size: 100%;

	&__title {
		padding: 30px;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;

		&-text {
			margin: 0px;
		}
	}

	&__edit_true {
		display: flex;
	}

	&__button_cancel {
		margin-right: 15px;
	}

	&__content {
		margin: 30px;
		margin-top: 10px;
		height: calc(100% - 140px);

		&_edit {
			width: 100%;
			height: 100%;
		}
	}
}

.button {
	color: white;
	background: #64b2db;
	border: 0;
	padding: 10px;

	&:hover {
		cursor: pointer;
		background: #5191b4;
	}
}
</style>