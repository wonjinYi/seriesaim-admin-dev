<template>
	<div
		class="app-button"
		:class="{ white: color === 'white', black: color === 'black' }"
	>
		<span>
			<slot></slot>
		</span>
	</div>
</template>

<script setup>
const props = defineProps({
	color: {
		type: String,
		default: 'white', // white, black
	},
	fontWeight: {
		type: String,
		default: '600',
	},
});
</script>

<style lang="scss" scoped>
.app-button {
	display: inline-block;
	padding: 0.5rem 1rem;
	cursor: pointer;
	text-align: center;

	span {
		// font-weight: v-bind(fontWeight);
	}
	&:hover {
		filter: brightness(0.8);
	}
}
.white {
	color: black;
	background-color: white;
	border: 1px solid black;
}
.black {
	color: white;
	background-color: black;
}
</style>
