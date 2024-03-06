<template>
	<div class="text-input-set" @click="resize">
		<p class="question">
			<slot></slot>
		</p>
		<div class="input-wrap">
			<textarea
				v-if="!readOnly"
				ref="textArea"
				:placeholder="props.placeholder"
				:value="props.modelValue"
				@input="handleChange"
				style="width: 100%"
			></textarea>
			<textarea
				v-else
				ref="textArea"
				:value="props.modelValue"
				@input="handleChange"
				style="width: 100%; opacity: 0.6; cursor: not-allowed"
				readonly
			></textarea>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const props = defineProps({
	modelValue: {
		require: true,
		type: String,
		default: '',
	},
	placeholder: {
		type: String,
	},
	readOnly: {
		type: Boolean,
		default: false,
	},
});
const emits = defineEmits(['update:modelValue']);

const textArea = ref();
function resize() {
	textArea.value.style.height = '1px';
	textArea.value.style.height = textArea.value.scrollHeight + 'px';
}

function handleChange(e) {
	emits('update:modelValue', e.target.value);
	resize();
}

onMounted(() => {
	resize();
});
</script>

<style lang="scss" scoped>
.text-input-set {
	width: 100%;
	// margin-bottom: 48px;
	margin: 1rem 0;
	p {
		font-weight: 600;
		font-size: 1rem;
		word-break: keep-all;
		// padding-bottom: 1rem;
	}

	.input-wrap {
		margin-top: 8px;
		width: 100%;
		border-bottom: 1px solid black;
		textarea {
			overflow: hidden;
			font-size: 1rem;
			height: auto;
			border: 0px solid transparent;
			font-weight: 300;
			resize: none;
			line-height: 1.3rem;
			// height: 1.3rem;
			background-color: transparent;
		}
		textarea:focus {
			border: 0;
			outline: 0px solid transparent;
		}
	}
}

@media (max-width: 430px) {
	.text-input-set {
		margin-bottom: 32px;
		p {
			font-size: 0.85rem;
		}
		.input-wrap textarea {
			font-size: 0.85rem;
		}
	}
}
</style>
