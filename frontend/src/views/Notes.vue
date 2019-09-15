<template>
	<div class="notes">
		<div class="notes__title" v-bind:style="{ gridTemplateColumns: grid }">
			<h3 class="notes__title-text">Заметки от разработчика</h3>
			<div v-if="!edit" class="notes__edit_false">
				<button class="button" @click="clickButton()">РЕДАКТИРОВАТЬ</button>
			</div>
			<div v-else class="notes__edit_true">
				<button class="button notes__button_cancel" @click="cancel()">ОТМЕНИТЬ</button>
				<button class="button notes__button_confirm" @click="clickButton()">ПОДТВЕРДИТЬ</button>
			</div>
		</div>
		<div>
			<p v-if="!edit" class="doc">{{data}}</p>
			<!-- v-html="data" -->
			<textarea v-else wrap="hard" class="tooltip" v-on:click.stop v-model="data2"></textarea>
		</div>
	</div>
</template>

<script lang="ts">
import axios from 'axios';
import { Component, Vue, Provide } from 'vue-property-decorator';

@Component({
})

export default class Notes extends Vue {
	// data
	public edit: boolean = false;
	public data: string = '';
	public data2: string = '';
	public grid: any = '1fr auto';
	public change: any = 'РЕДАИРОВАТЬ';
	// methods
	public clickButton() {
		this.edit = true;
		if (this.change === 'Редактировать') {
			this.grid = '1fr auto auto';
			this.change = 'Подтвердить';
			this.data2 = this.data2.replace(/<br\/>/g, '\n');
		} else {
			this.grid = '1fr auto';
			this.confirmButton();
			this.change = 'Редактировать';
		}
	}
	public created() {
		this.data = this.data2 = 'this.$store.getters.doc';
	}
	public cancel() {
		this.edit = false;
	}
	public async confirmButton() {
		this.data = this.data2.replace(/\n/g, '<br/>');
		await axios.post('api/v1/data/change', {
			token: sessionStorage.getItem('token'),
			name: this.data,
		})
		// ответ на запрос
		.then((response) => {
			console.log('Изменили документацию');
		})
		// обработка ошибок
		.catch((e) => {
			console.log(e);
			console.log('Что-то не то введено');
		});
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.notes{
	text-align: left;
	padding: 0;
	height: 100vh;

	&__title {
		padding: 30px;
		font-size: 25px;
		display: flex;
		justify-content: space-between;

		&-text {
			margin: 0px;
			flex: 100%;
		}
	}

	&__edit_true {
		display: flex;
	}

	&__button_cancel {
		margin-right: 15px;
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

.tooltip, .doc {
	margin: 30px;
	margin-top: 10px;
}
</style>