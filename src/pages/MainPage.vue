<template>
	<div class="main-page">
		<div>
			<img :src="logo" style="width: 128px; height: auto" />
			<h1 style="font-size: 1.75rem">관리자 도구</h1>
		</div>
		<app-button class="btn" @click="router.push('/form/submitted')">
			문의 목록
		</app-button>
		<app-button class="btn" @click="router.push('/pw')"
			>비밀번호 변경</app-button
		>
		<app-button class="btn" @click="router.push('/contact/info')"
			>연락처 관리</app-button
		>
		<app-button class="btn" @click="router.push('/form/template')">
			문의 템플릿 관리
		</app-button>
		<app-button class="btn" @click="router.push('/works')"
			>작업 내역 관리</app-button
		>
		<app-button class="btn" @click="openGuide">도움말</app-button>
	</div>
</template>

<script setup>
import AppButton from '@/components/AppButton.vue';
import logo from '@/assets/images/logo_black.png';
import { useRouter } from 'vue-router';
const router = useRouter();

function openGuide() {
	window.open(
		'https://chambray-archer-93c.notion.site/3a7747b54cf3426bb51e8abb77bfe430?pvs=4',
	);
}
</script>

<style lang="scss" scoped>
.main-page {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
	.btn {
		width: 200px;
		margin-top: 20px;
	}
}
</style>
