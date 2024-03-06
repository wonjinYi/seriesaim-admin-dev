import { toast as _toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const toast = {
	up: () => {
		_toast('위로 이동', {
			autoClose: 1500,
			position: _toast.POSITION.BOTTOM_RIGHT,
			transition: _toast.TRANSITIONS.SLIDE,
			type: 'info',
			style: 'width:200px;',
		});
	},
	down: () => {
		_toast('아래로 이동', {
			autoClose: 1500,
			position: _toast.POSITION.BOTTOM_RIGHT,
			transition: _toast.TRANSITIONS.SLIDE,
			type: 'info',
			style: 'width:200px;',
		});
	},
	add: () => {
		_toast('추가', {
			autoClose: 1500,
			position: _toast.POSITION.BOTTOM_RIGHT,
			transition: _toast.TRANSITIONS.SLIDE,
			type: 'success',
			style: 'width:200px;',
		});
	},
	remove: () => {
		_toast('제거', {
			autoClose: 3000,
			position: _toast.POSITION.BOTTOM_RIGHT,
			transition: _toast.TRANSITIONS.SLIDE,
			type: 'error',
			style: 'width:200px;',
		});
	},
};

export default toast;

// export default function makeToast(msg, type) {
// 	toast(msg, {
// 		autoClose: 1500,
// 		position: toast.POSITION.BOTTOM_RIGHT,
// 		transition: toast.TRANSITIONS.SLIDE,
// 		type: type,
// 		style: 'width:200px;',
// 	});
// }
