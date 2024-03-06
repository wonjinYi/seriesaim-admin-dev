<template>
	<div class="password-input-set" @keydown="handleKeydown">
		<input
			v-model="pw"
			type="password"
			placeholder="비밀번호 입력"
			style="height: 48px; text-align: center; margin-bottom: 1rem"
		/>
		<app-button color="black" @click="handleClick" style="width: 100%"
			>확인</app-button
		>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import AppButton from '@/components/AppButton.vue';
const emits = defineEmits(['request-validation']);
const pw = ref('');
function handleClick() {
	emits('request-validation', pw.value);
}

function handleKeydown(e) {
	if (e.key === 'Enter') {
		handleClick();
	}
}
</script>

<style lang="scss" scoped>
div {
	display: flex;
	align-items: center;
	flex-direction: column;
}
</style>
