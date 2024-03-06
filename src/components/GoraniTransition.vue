<template>
	<div ref="target">
		<transition :name="transitionName" appear>
			<div v-appear="animate" class="animated-component">
				<slot />
			</div>
		</transition>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
const props = defineProps({
	transitionName: {
		type: String,
		required: false,
		default: 'fade',
	},
	targetName: {
		type: String,
		default: 'element name', //트랜지션 건 요소의 식별자
	},
	threshold: {
		type: Number,
		default: 0.5,
	},
});
const emits = defineEmits(['intersect-in', 'intersect-out']);
const target = ref();
const animate = ref(false);

const observer = new IntersectionObserver(
	([entry]) => {
		animate.value = entry.isIntersecting;
		if (animate.value) {
			emits('intersect-in', props.targetName);
		} else {
			emits('intersect-out', props.targetName);
		}
	},
	{
		threshold: props.threshold,
	},
);
onMounted(() => {
	observer.observe(target.value);
});
</script>

<style lang="scss" scoped>
.animated-component.upfade-enter-from,
.animated-component.fade-enter-from,
.animated-component.scale-y-fade-enter-from,
.animated-component.scale-x-fade-enter-from {
	transition: none;
}

/* upFade animation */
.upfade-enter-active,
.upfade-leave-active {
	transition: all 0.5s ease;
}
.upfade-enter-from,
.upfade-leave-to {
	opacity: 0;
	transform: translateY(2rem);
}

// fade animation
.fade-enter-active,
.fade-leave-active {
	transition: all 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

// scale-y-fade animation
.scale-y-fade-enter-active,
.scale-y-fade-leave-active {
	transition: all 1s ease;
}
.scale-y-fade-enter-from,
.scale-y-fade-leave-to {
	opacity: 0;
	transform: scaleY(0);
}

// scale-x-fade animation
.scale-x-fade-enter-active,
.scale-x-fade-leave-active {
	transition: all 2s ease;
}
.scale-x-fade-enter-from,
.scale-x-fade-leave-to {
	opacity: 0;
	transform: scaleX(0);
}
</style>
