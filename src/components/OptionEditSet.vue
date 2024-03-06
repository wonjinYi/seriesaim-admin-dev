<template>
	<div class="option-edit-set">
		<p class="title">옵션</p>
		<div class="input-wrap">
			<!-- options 버튼 -->
			<div class="item-wrap" v-for="(option, index) in modelValue" :key="index">
				<div class="item">
					<app-button class="btn" @click="addOption(index)">✚</app-button>
					<app-button class="btn" @click="removeOption(index)">❌</app-button>
					<input
						class="option-input"
						type="text"
						:value="option"
						@input="e => handleChange(e, index)"
					/>
				</div>
			</div>
		</div>
		<app-button class="btn" style="margin-top: 0.5rem" @click="addOption(-1)"
			>✚</app-button
		>
	</div>
</template>

<script setup>
import AppButton from '@/components/AppButton.vue';
const props = defineProps({
	modelValue: {
		type: Array,
		// [ 'aa', 'bb', 'cc', ... ]
	},
});

const emits = defineEmits(['update:modelValue']);

function addOption(index) {
	const newValue = [...props.modelValue];
	if (index === -1) {
		newValue.push('');
	} else {
		newValue.splice(index, 0, '');
	}
	emits('update:modelValue', newValue);
}

function removeOption(index) {
	const newValue = [...props.modelValue];
	newValue.splice(index, 1);
	emits('update:modelValue', newValue);
}

function handleChange(e, index) {
	const value = e.target.value;
	const newValue = [...props.modelValue];
	newValue[index] = value;
	emits('update:modelValue', newValue);
}
</script>

<style lang="scss" scoped>
//------------------------------

.btn {
	width: 2rem;
	padding: 0.5rem 0.25rem;
	margin: 0 0.25rem;
}
.option-edit-set {
	width: 100%;
	padding: 2rem;
	margin-top: 1rem;
	background-color: rgb(245, 245, 245);
	p {
		font-weight: 600;
		font-size: 1rem;
		margin-bottom: 1rem;
	}
	.input-wrap {
		width: 100%;
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		.item-wrap {
			.item {
				display: flex;
				margin-top: 8px;
				width: 100%;

				input {
					flex: 1;
					font-size: 1rem;
					border: 0px solid transparent;
					// line-height: 1.3rem;
					background-color: transparent;
					border-bottom: 1px solid black;
					margin-left: 0.25rem;
				}
				input:focus {
					// border: 0;
					outline: 0px solid transparent;
				}
			}
		}
		.selected {
			.check-box {
				background-color: rgb(50, 50, 50);
				text-align: center;
				font-size: 0.8rem;
			}
		}
		.item.disabled {
			opacity: 0.6;
			cursor: not-allowed;
		}
	}
}

// @media (max-width: 768px) {
// 	.radio-input-set .input-wrap .item-wrap {
// 		width: 100%;
// 	}
// }

// @media (max-width: 430px) {
// 	.radio-input-set {
// 		margin-bottom: 32px;
// 		p {
// 			font-size: 0.85rem;
// 			word-break: keep-all;
// 		}
// 		.input-wrap .item-wrap .item {
// 			.value {
// 				font-size: 0.8rem;
// 			}
// 		}
// 	}
// }
</style>
