import { createRouter, createWebHistory } from 'vue-router';

// 뷰 불러오기 ------------------------------------
import NotFoundPage from '@/pages/NotFoundPage.vue';

import MainPage from '@/pages/MainPage.vue';
import PasswordPage from '@/pages/PasswordPage.vue';
import WorksPage from '@/pages/WorksPage.vue';
import FormTemplatePage from '@/pages/FormTemplatePage.vue';
import SubmittedFormsPage from '@/pages/SubmittedFormsPage.vue';
import ContactInfo from '@/pages/ContactInfoPage.vue';

// 라우터 설정 ------------------------------------
const routes = [
	{
		// 정의된 path가 아닌 다른 path로 접근하려고 하면 NotFoundPage로 이동
		path: '/:pathMatch(.*)*',
		name: 'NotFound',
		component: NotFoundPage,
	},
	// 아래와 일치하는 path로 접근하면 지정된 페이지(component)를 App.vue의 router-view자리에 표시
	{
		path: '/',
		name: 'Main',
		component: MainPage,
	},
	{
		path: '/pw',
		name: 'Password',
		component: PasswordPage,
	},
	{
		path: '/works',
		name: 'Works',
		component: WorksPage,
	},
	{
		path: '/contact/info',
		name: 'ContactInfo',
		component: ContactInfo,
	},
	{
		path: '/form/template',
		name: 'FormTemplate',
		component: FormTemplatePage,
	},
	{
		path: '/form/submitted',
		name: 'SubmittedForms',
		component: SubmittedFormsPage,
	},
];

// 라우터 객체 생성
const router = createRouter({
	history: createWebHistory(),
	routes,
	scrollBehavior(/*to, from, savedPosition*/) {
		return { top: 0 };
	},
});

export default router;
