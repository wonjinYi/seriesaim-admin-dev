<template>
	<div class="horizontal-divider">
		<div class="line"></div>
		<div class="line-with-x">
			<div class="orthogonal-line"></div>
			<div class="x-1"></div>
			<div class="x-2"></div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.horizontal-divider {
	$divider-height: 4rem;
	position: relative;

	width: 100%;
	.line {
		width: 100%;
		height: 1px;
		background-color: black;
	}
	.line-with-x {
		position: absolute;
		left: 10%;

		.orthogonal-line,
		.x-1,
		.x-2 {
			height: 1px;
			position: absolute;
			background-color: black;
		}

		.orthogonal-line {
			width: $divider-height;
			transform: rotate(90deg) translateY(calc($divider-height / 4));
		}
		.x-1 {
			width: calc($divider-height / 2);
			transform: rotate(45deg) translateY(-50%);
		}
		.x-2 {
			width: calc($divider-height / 2);
			transform: rotate(-45deg) translateY(-50%);
		}
	}
}
</style>
