<template>
	<div class="works-page">
		<div class="item-wrap" v-for="(work, idx) in data" :key="idx">
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
						<text-input-set v-model="work.제목"> 제목 </text-input-set>
						<text-input-set v-model="work.고객"> 고객 </text-input-set>
						<text-input-set v-model="work.유튜브링크">
							유튜브링크
						</text-input-set>
					</div>
					<div class="text-input-container">
						<radio-input-set
							v-model="work.기획태그_표시"
							:options="[
								{ label: '예', data: true },
								{ label: '아니오', data: false },
							]"
						>
							기획태그 표시
						</radio-input-set>
						<radio-input-set
							v-model="work.촬영태그_표시"
							:options="[
								{ label: '예', data: true },
								{ label: '아니오', data: false },
							]"
						>
							촬영태그 표시
						</radio-input-set>
						<radio-input-set
							v-model="work.편집태그_표시"
							:options="[
								{ label: '예', data: true },
								{ label: '아니오', data: false },
							]"
						>
							편집태그 표시
						</radio-input-set>
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

<style lang="scss" scoped>
.works-page {
	// font-size: 0.75rem;
	padding: 6rem 0;
	width: 80%;
}
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

<script setup>
import axios from 'axios';
import { ref } from 'vue';

import toast from '@/assets/makeToast.js';
import AppButton from '@/components/AppButton.vue';
import TextInputSet from '@/components/TextInputSet.vue';
import RadioInputSet from '@/components/RadioInputSet.vue';

import { API_URL } from '@/assets/constants.js';
import {
	REF_INIT_GLOBAL_STATE_FINISHED,
	REF_LOADING,
	REF_WORK_LIST,
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
		data.value = [...REF_WORK_LIST.value];
	} catch (err) {
		console.error(err);
		alert('작업 내역 불러오지 못함');
	} finally {
		REF_LOADING.value = false;
	}
}
init();

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
	toast.add();
	if (index === -1) {
		data.value.push({
			제목: '',
			고객: '',
			유튜브링크: '',
			기획태그_표시: false,
			촬영태그_표시: false,
			편집태그_표시: false,
		});
		return;
	}
	data.value.splice(index, 0, {
		제목: '',
		고객: '',
		유튜브링크: '',
		기획태그_표시: false,
		촬영태그_표시: false,
		편집태그_표시: false,
	});
}
function deleteItem(index) {
	if (!confirm(`"${data.value[index].제목}" 항목을 삭제하시는게 맞나요?`)) {
		return;
	}
	toast.remove();
	data.value.splice(index, 1);
}

// 저장
const waitingResponse = ref(false);
async function handleSubmit() {
	try {
		REF_LOADING.value = true;
		const _pw = pw.value;
		pw.value = '';

		if (waitingResponse.value) return;
		waitingResponse.value = true;
		const _res = await axios.post(
			`${API_URL}?taskType=updateWorks`,
			JSON.stringify({
				pw: _pw,
				newWorks: data.value,
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
		alert('작업 내역 변경사항 저장 완료');
		window.scrollTo(0, 0);
	} catch (err) {
		console.error(err);
		alert(err);
		waitingResponse.value = false;
		REF_LOADING.value = false;
	} finally {
	}
}
</script>
