import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router.js';

export const appear = {
	// https://michael-verschoof.medium.com/create-an-animated-vue-3-component-when-scrolling-into-view-f8e793e221c8
	beforeMount(element) {
		element.style.visibility = 'hidden';
	},
	updated(element, binding, node) {
		if (!binding.value === !binding.oldValue || null === node.transition) {
			return;
		}
		if (!binding.value) {
			node.transition.leave(element, () => {
				element.style.visibility = 'hidden';
			});
			return;
		}
		node.transition.beforeEnter(element);
		element.style.visibility = '';
		node.transition.enter(element);
	},
};

const app = createApp(App);
app.use(router);
app.directive('appear', appear);
app.mount('#app');
