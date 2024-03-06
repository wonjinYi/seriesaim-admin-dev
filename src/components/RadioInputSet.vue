<template>
	<div class="radio-input-set">
		<p class="question">
			<slot></slot>
		</p>
		<div class="input-wrap">
			<!-- options 버튼 -->
			<div class="item-wrap" v-for="(option, index) in options" :key="index">
				<div
					class="item"
					@click="handleSelect(index)"
					:class="{
						selected: option.data === modelValue,
						disabled: readOnly,
					}"
				>
					<div class="check-box"></div>
					<span class="value">{{ option.label }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	modelValue: {
		type: [String, Boolean],
	},
	options: {
		type: Array,
		// [{
		// 	label:'예',
		// 	data:true
		// }, {}, ...]
	},
	readOnly: {
		type: Boolean,
		default: false,
	},
	handleItemType: {
		type: Boolean,
		default: false,
	},
});
const emits = defineEmits(['update:modelValue', 'update:itemType']);

function handleSelect(index) {
	if (props.readOnly) {
		return;
	}
	// 선택된 체크박스의 값
	const selectedValue = props.options[index].data;

	// 선택해제
	if (selectedValue === props.modelValue) {
		// 그런건 없다
		// emits('update:modelValue', '');
		return;
	}

	// 응답유형을 바꾸는 경우 추가로 이벤트 날리기
	if (props.handleItemType) {
		emits('update:itemType', selectedValue);
	}

	// 선택
	emits('update:modelValue', selectedValue);
}
</script>

<style lang="scss" scoped>
//------------------------------
.radio-input-set {
	margin-top: 1rem;
	p {
		font-weight: 600;
		font-size: 1rem;
	}
	.input-wrap {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		.item-wrap {
			.item {
				width: fit-content;
				padding: 0.5rem;
				display: flex;
				align-items: center;
				border-radius: 0.5rem;
				margin: 0.5rem 0;
				font-weight: 300;
				cursor: pointer;
				.check-box {
					margin-right: 8px;
					width: 1rem;
					height: 1rem;
					border-radius: 50%;
					border: 1px solid rgb(20, 20, 20);
					color: white;
					transition: all 0.3s;
				}
				.value {
					font-size: 1rem;
				}
			}
		}
		.item:hover {
			background-color: rgba(0, 0, 0, 0.1);
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
