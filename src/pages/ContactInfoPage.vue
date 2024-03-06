<template>
	<div class="contactinfo-page" style="padding: 6rem 0; max-width: 700px">
		<div class="item-wrap" v-for="(item, idx) in data" :key="idx">
			<!-- 추가버튼(상) -->
			<div class="add-btn-wrap">
				<app-button class="add-item-btn" @click="addItem(idx)">
					추가 ✚
				</app-button>
			</div>

			<div class="item">
				<div class="item-indicator indicator">
					<p style="word-break: keep-all; white-space: nowrap">
						항목 {{ idx + 1 }}
					</p>
					<div class="btns">
						<app-button class="btn" @click="goUp(idx)"> ▲ </app-button>
						<app-button class="btn" @click="goDown(idx)"> ▼ </app-button>
						<app-button class="btn" @click="deleteItem(idx)"> ❌ </app-button>
					</div>
				</div>
				<div class="item-contents contents">
					<div class="text-input-container">
						<text-input-set v-model="item.label"> 항목 이름 </text-input-set>
						<text-input-set v-model="item.value"> 값 </text-input-set>
					</div>
				</div>
			</div>
		</div>
		<!-- 추가버튼(하) -->
		<div class="add-btn-wrap">
			<app-button class="add-item-btn" @click="addItem(-1)">
				추가 ✚
			</app-button>
		</div>

		<!--  -->
		<div
			style="
				border-bottom: 1px solid black;
				height: 1px;
				width: 100%;
				margin: 3rem 0;
			"
		></div>

		<div style="text-align: center" @keydown.enter="handleSubmit">
			<div>
				<input
					v-model="pw"
					type="password"
					placeholder="비밀번호"
					style="height: 48px; padding: 0.5rem; margin: 1rem; width: 256px"
				/>
			</div>

			<app-button
				color="black"
				@click="handleSubmit"
				style="margin: 1rem; padding: 0.5rem; width: 256px; margin-bottom: 4rem"
			>
				저장하기
			</app-button>
		</div>
	</div>
</template>

<script setup>
import AppButton from '../components/AppButton.vue';
import TextInputSet from '../components/TextInputSet.vue';

import toast from '@/assets/makeToast.js';
import axios from 'axios';
import { ref } from 'vue';
import { API_URL } from '@/assets/constants.js';
import {
	REF_LOADING,
	REF_CONTACT_INFO,
	REF_INIT_GLOBAL_STATE_FINISHED,
	FETCH_GLOBAL_STATES,
} from '@/assets/globalState.js';

const data = ref([]);
const pw = ref('');
let temp;

async function init() {
	try {
		REF_LOADING.value = true;
		if (!REF_INIT_GLOBAL_STATE_FINISHED.value) {
			await FETCH_GLOBAL_STATES();
		}
		data.value = [...REF_CONTACT_INFO.value];
	} catch (err) {
		console.error(err);
		alert('연락처 정보 불러오지 못함');
	} finally {
		REF_LOADING.value = false;
	}
}
init();

//

// 순서
function goUp(index) {
	if (index === 0) return;
	temp = data.value[index - 1];
	data.value[index - 1] = data.value[index];
	data.value[index] = temp;
	toast.up();
}
function goDown(index) {
	if (index === data.value.length - 1) return;
	temp = data.value[index + 1];
	data.value[index + 1] = data.value[index];
	data.value[index] = temp;
	toast.down();
}
function addItem(index) {
	if (index === -1) {
		data.value.push({
			label: '',
			value: '',
		});
		return;
	}
	data.value.splice(index, 0, {
		label: '',
		value: '',
	});
	toast.add();
}
function deleteItem(index) {
	data.value.splice(index, 1);
	toast.remove();
}

const waitingResponse = ref(false);

async function handleSubmit() {
	try {
		REF_LOADING.value = true;

		if (waitingResponse.value) return;
		console.log('asdf');
		waitingResponse.value = true;

		const _pw = pw.value;
		pw.value = '';

		const _res = await axios.post(
			`${API_URL}?taskType=updateContactInfo`,
			JSON.stringify({
				pw: _pw,
				newContactInfo: data.value,
			}),
		);
		waitingResponse.value = false;
		REF_LOADING.value = false;
		const res = _res.data;

		if (res.status === 'error') {
			if (res.data.msg === 'Invalid password') {
				alert('비밀번호가 틀렸습니다');
				return;
			}
			alert('정상적으로 통신하였으나 오류 발생 : ' + JSON.stringify(res));
			return;
		}

		FETCH_GLOBAL_STATES();
		alert('연락처 정보 변경사항 저장 완료');
		window.scrollTo(0, 0);
	} catch (err) {
		alert(err);
		waitingResponse.value = false;
		REF_LOADING.value = false;
	} finally {
		// REF_LOADING.value = false;
	}
}
</script>

<style lang="scss" scoped>
.item {
	display: flex;

	margin: 1rem 0;
	border: 1px solid grey;

	.item-indicator {
		border-right: 1px solid grey;
	}
	.item-contents {
		.text-input-container {
			display: flex;
			margin: 1rem 0;
			align-items: flex-end;

			.text-input-set {
				margin: 1rem;
			}
			.radio-input-set {
				margin: 0 2rem 0 1rem;
			}
		}
	}
}

.indicator {
	min-width: 64px;
	width: 64px;
	padding: 0.5rem;
	text-align: center;
	p {
		padding: 0.25rem 0;
		font-weight: 500;
	}
	.btns .btn {
		width: 2rem;
		padding: 0.5rem 0.25rem;
		margin: 0.5rem 0;
	}
}
.contents {
	padding: 1rem 1rem;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.add-btn-wrap {
	text-align: center;
	.add-section-btn {
		background-color: black;
		color: white;
		transform: translateX(32px);
	}
}
</style>
