<template>
	<div class="checkbox-input-set">
		<p class="question">
			<slot></slot>
		</p>
		<div class="input-wrap">
			<div class="item-wrap" v-for="(option, index) in options" :key="index">
				<div
					class="item"
					@click="handleSelect(index)"
					:class="{
						selected: selected.includes(option),
						disabled:
							(selected.length >= maxSelectNum && !selected.includes(option)) ||
							readOnly,
					}"
				>
					<div class="check-box"></div>
					<span class="value">{{ option }}</span>
				</div>
			</div>
			<!-- 기타 체크박스 -->
			<div class="item-wrap" v-if="useEtc">
				<div
					class="item"
					@click="handleSelect(-1)"
					:class="{
						selected: selected.includes(ETC_OPTION_LABEL),
						disabled:
							(selected.length >= maxSelectNum &&
								!selected.includes(ETC_OPTION_LABEL)) ||
							readOnly,
					}"
				>
					<div class="check-box"></div>
					<span class="value">{{ ETC_OPTION_LABEL }}</span>
				</div>
			</div>
		</div>

		<!-- 기타 항목을 선택했을 때 세부 내용을 입력할 텍스트필드 -->
		<transition name="fade-etc-textinput">
			<div class="etc-textinput" v-if="selected.includes(ETC_OPTION_LABEL)">
				<text-input-set
					v-model="etcText"
					style="margin: 0"
					:placeholder="`기타 항목 직접 입력`"
					:read-only="readOnly"
				></text-input-set>
			</div>
		</transition>
	</div>
</template>

<script setup>
import { computed } from 'vue';
import TextInputSet from '@/components/TextInputSet.vue';
import { ETC_OPTION_LABEL } from '@/assets/constants.js';

// define props
const props = defineProps({
	modelValue: {
		type: Object,
		// {
		//     selected : [],
		//     etcText : ''
		// }
	},
	options: {
		type: Array,
	},
	useEtc: {
		type: Boolean,
		default: false,
	},
	maxSelectNum: {
		type: Number,
		default: 1,
	},
	readOnly: {
		type: Boolean,
		default: false,
	},
});

// define event
const emits = defineEmits(['update:modelValue']);

// computed
const selected = computed({
	get() {
		return props.modelValue.selected;
	},
	set(newSelected) {
		emits('update:modelValue', { ...props.modelValue, selected: newSelected });
	},
});
const etcText = computed({
	get() {
		return props.modelValue.etcText;
	},
	set(newEtcText) {
		emits('update:modelValue', { ...props.modelValue, etcText: newEtcText });
	},
});

function handleSelect(index) {
	if (props.readOnly) {
		return;
	}

	// 선택된 체크박스의 값. (index매개변수가 -1이면 기타 항목으로 간주)
	const selectedValue = index !== -1 ? props.options[index] : ETC_OPTION_LABEL;

	// 선택해제
	if (selected.value.includes(selectedValue)) {
		const newSelected = selected.value.filter(item => item !== selectedValue);
		selected.value = newSelected;

		// // 기타 항목을 선택해제 하는 경우 etcText도 초기화
		const newEtcText = selectedValue === ETC_OPTION_LABEL ? '' : etcText.value;

		emits('update:modelValue', { selected: newSelected, etcText: newEtcText });
		return;
	}

	// 최대선택가능 개수를 넘었으면 선택할 수 없음
	if (selected.value.length >= props.maxSelectNum) {
		return;
	}

	// 선택
	const newSelected = [...selected.value];
	newSelected.push(selectedValue);
	// emits('update:modelValue', { ...selected.value, selected: newSelected });
	selected.value = newSelected;
}
</script>

<style lang="scss" scoped>
// etc용 text input
.fade-etc-textinput-enter-active {
	transition: all 1s;
}
.fade-etc-textinput-enter-from {
	opacity: 0;
	transform: translateY(-3rem);
}
.etc-textinput {
	padding-left: 2rem;
	transform: translateY(-1rem);
}

//------------------------------
.checkbox-input-set {
	// position: relative;

	margin-bottom: 4rem;
	p {
		font-weight: 600;
		font-size: 1rem;
		padding-bottom: 1rem;
	}
	.input-wrap {
		display: flex;
		flex-wrap: wrap;
		align-items: center;

		.item-wrap {
			width: 49%;
			max-width: 512px;
		}
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
				min-width: 1rem;
				min-height: 1rem;
				border: 1px solid rgb(20, 20, 20);
				color: white;
				transition: all 0.3s;
			}
			.value {
				font-size: 1rem;
			}
			transition: all 0.3s;
		}
		.item:hover {
			background-color: rgba(0, 0, 0, 0.1);
		}
		.selected {
			.check-box {
				background-color: rgb(50, 50, 50);
				text-align: center;
				font-size: 0.8rem;
				// &:after {
				// 	content: '✓';
				// }
			}
		}
		.disabled {
			opacity: 0.6;
			cursor: not-allowed;
		}
	}
}

@media (max-width: 768px) {
	.checkbox-input-set .input-wrap .item-wrap {
		width: 100%;
	}
}

@media (max-width: 430px) {
	.checkbox-input-set {
		margin-bottom: 32px;
		p {
			font-size: 0.85rem;
			word-break: keep-all;
		}

		.input-wrap {
			display: flex;
			flex-wrap: wrap;
			width: 100%;
			.item {
				padding: 8px;
				margin: 8px 0;
				.value {
					font-size: 0.8rem;
				}
				transition: all 0.3s;
			}
		}
	}
}
</style>
