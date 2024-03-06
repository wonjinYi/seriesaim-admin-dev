export const API_URL =
	'https://script.google.com/macros/s/AKfycbz1GAlBJfv3CqN9FBN8Lr-GCBpQ6nRVJ09J29OxsR64bdMiQzLAYJPGl5fmN3KVRLhOgA/exec';

export const ETC_OPTION_LABEL = '기타 (직접 입력)';

export const DEV_HOSTNAME_LIST = ['localhost', '127.0.0.1'];
export const DEV_PORT = '5173';

export const FORM_TEMPLATE_SCHEMA = {
	section: {
		header: {
			title: '',
			desc: '',
		},
		items: [], // Object[] --> text, radio, checkbox
	},
	text: {
		// -- 유지
		type: 'text', // 'text', 'radio', 'checkbox'
		answer: '',
		placeholder: '',
		// -- 무조건 이전
		required: true, // true, false
		preview: null, // null, 'both', 'onlyAnswer'
		question: '',
	},
	radio: {
		// -- 유지
		type: 'radio',
		answer: {
			selected: '',
			etcText: '',
		},
		// -- 무조건 이전
		preview: null,
		question: '',
		required: true,
		// -- checkbox에서 온 경우 이전
		options: [], // string[]
		useEtc: false,
	},
	checkbox: {
		// -- 유지
		type: 'checkbox',
		answer: {
			selected: [], // string[]
			etcText: '',
		},
		// -- 무조건 이전
		required: true,
		preview: null,
		question: '',
		// -- checkbox에서 온 경우 이전
		options: [], // string[]
		useEtc: false,
	},
};
