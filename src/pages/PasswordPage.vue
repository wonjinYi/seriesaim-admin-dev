<template>
	<div class="password-page" @keydown.enter="handleClick">
		<input v-model="curPw" type="password" placeholder="현재 비밀번호" />
		<input v-model="newPw1" type="password" placeholder="새 비밀번호" />
		<input v-model="newPw2" type="password" placeholder="새 비밀번호 확인" />
		<app-button color="black" @click="handleClick">변경</app-button>
	</div>
</template>

<script setup>
import AppButton from '../components/AppButton.vue';
import axios from 'axios';
import { ref } from 'vue';
import { API_URL } from '@/assets/constants.js';
import { REF_LOADING } from '@/assets/globalState.js';

const newPw1 = ref('');
const newPw2 = ref('');
const curPw = ref('');
const waitingResponse = ref(false);
async function handleClick() {
	try {
		REF_LOADING.value = true;
		if (newPw1.value !== newPw2.value) {
			alert('새 비밀번호가 일치하지 않습니다.');
			return;
		}

		const _newPw1 = newPw1.value;
		const _pw = curPw.value;
		newPw1.value = '';
		newPw2.value = '';
		curPw.value = '';

		if (waitingResponse.value) return;
		waitingResponse.value = true;

		const _res = await axios.post(
			`${API_URL}?taskType=updatePw`,
			JSON.stringify({
				pw: _pw,
				newPw: _newPw1,
			}),
		);
		waitingResponse.value = false;
		REF_LOADING.value = false;

		const res = _res.data;

		if (res.status === 'error') {
			if (res.data.msg === 'Invalid password') {
				alert('비밀번호 틀림');
			} else {
				alert('정상적으로 통신하였으나 오류 발생 : ' + JSON.stringify(res));
			}
			return;
		}

		alert('비밀번호 변경 완료');
	} catch (err) {
		alert(err);
		waitingResponse.value = false;
		REF_LOADING.value = false;
	} finally {
	}
}
</script>

<style lang="scss" scoped>
.password-page {
	display: flex;
	flex-direction: column;
	justify-content: center;
	input {
		height: 48px;
		padding: 1rem;
		margin: 1rem;
		width: 256px;
	}
	.app-button {
		margin: 1rem;
		margin-top: 2rem;
		width: 256px;
	}
}
</style>
