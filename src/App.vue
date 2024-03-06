<template>
	<div class="root">
		<div
			class="loading-overlay"
			v-if="REF_LOADING"
			style="
				z-index: 999;
				position: fixed;
				top: 0;
				left: 0;
				background-color: rgba(0, 0, 0, 0.5);
				height: 100vh;
				width: 100vw;
			"
		></div>
		<div
			v-if="route.name !== 'Main'"
			style="position: absolute; top: 1rem; left: 1rem"
		>
			<span style="display: block; margin-bottom: 0.5rem"
				>현재위치 : {{ ROUTE_NAME[route.name] }}</span
			>
			<app-button @click="router.push('/')"> 처음으로 </app-button>
		</div>
		<!--  -->
		<div class="router-view">
			<router-view></router-view>
		</div>
	</div>
</template>

<script setup>
import AppButton from './components/AppButton.vue';
import { useRoute, useRouter } from 'vue-router';

// 현재 페이지의 라우트 정보
const route = useRoute();
const router = useRouter();
const ROUTE_NAME = {
	Main: '처음',
	SubmittedForms: '문의 목록',
	FormTemplate: '문의 템플릿 관리',
	Works: '작업 내역 관리',
	ContactInfo: '연락처 관리',
	Password: '비밀번호 변경',
};

// 전역상태 초기화
import { FETCH_GLOBAL_STATES, REF_LOADING } from '@/assets/globalState.js';
FETCH_GLOBAL_STATES();
</script>

<style lang="scss" scoped>
.router-view {
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 100vh;
}
</style>
