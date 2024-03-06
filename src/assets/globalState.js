import { ref } from 'vue';
import axios from 'axios';
import { API_URL } from '@/assets/constants.js';

// CONTACT페이지 사용자 작성 Form의 템플릿
export const REF_FORM_TEMPLATE = ref([]);

// CONTACT페이지 시리즈에임 연락처
export const REF_CONTACT_INFO = ref([]);

// WORKS페이지에 표시할 작업물 리스트
export const REF_WORK_LIST = ref([]);

// 프론트엔드(어드민이 아닌 고객용 웹사이트) 프로그램의 protocol+hostname URL
export const REF_FRONTEND_BASE_URL = ref('');

// 모든 글로벌 상태 fetch완료되었는지 여부
export const REF_INIT_GLOBAL_STATE_FINISHED = ref(false);

export async function FETCH_GLOBAL_STATES() {
	try {
		REF_INIT_GLOBAL_STATE_FINISHED.value = false;

		const res = await axios.get(`${API_URL}?taskType=init`);
		const data = res.data.data;

		REF_CONTACT_INFO.value = data.contactInfo;
		REF_FORM_TEMPLATE.value = data.formTemplate;
		REF_WORK_LIST.value = data.works;
		REF_FRONTEND_BASE_URL.value = data.frontendBaseUrl;
		REF_INIT_GLOBAL_STATE_FINISHED.value = true;
	} catch (err) {
		console.error(err);
		if (confirm('기본 정보를 불러오는데 실패했습니다. 재시도 할까요?')) {
			FETCH_GLOBAL_STATES();
		}
	}
}

// --------------------------------------------------------------

//

export const REF_LOADING = ref(false);
