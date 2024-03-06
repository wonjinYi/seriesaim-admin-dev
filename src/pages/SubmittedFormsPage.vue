<template>
	<div class="submitted-forms-page">
		<password-input-set
			v-if="forms.length === 0"
			@request-validation="handleValidation"
		/>
		<div v-else style="width: 100%">
			<div
				v-for="form in forms"
				:key="form.id"
				style="margin: 4rem 0; width: 100%"
			>
				<div
					style="
						display: flex;
						justify-content: space-between;
						margin: 4px;
						align-items: flex-end;
					"
				>
					<span style="font-size: 1rem">{{
						form.제출일시.split('KST')[1]
					}}</span>
					<span style="font-size: 0.7rem">{{ form.id }}</span>
				</div>
				<div
					@click="openForm(form.id)"
					style="
						padding: 1rem 1rem;
						width: 100%;
						border: 1px solid black;
						cursor: pointer;
						font-size: 0.85rem;
					"
				>
					<!-- onlyAnswer 미리보기 -->
					<div>
						<span
							v-for="(item, index) in getPreviewOnlyAnswerItems(form.응답)"
							:key="index"
							style="
								display: inline-block;
								padding: 0.5rem;
								margin: 0 0.25rem 0.25rem 0;
								font-weight: 500;
								background-color: rgb(225, 225, 225);
							"
						>
							<template v-if="item.type === 'text'">
								{{ item.answer }}
							</template>
							<template v-else-if="item.type === 'radio'">
								{{ item.answer.selected }}
								{{ item.answer.etcText ? ` :${item.answer.etcText}` : '' }}
							</template>
							<template v-else-if="item.type === 'checkbox'">
								{{ item.answer.selected.join(' | ') }}
								{{ item.answer.etcText ? ` :${item.answer.etcText}` : '' }}
							</template>
						</span>
					</div>

					<!-- both 미리보기 -->
					<div>
						<div
							v-for="(item, index) in getPreviewBothItems(form.응답)"
							:key="index"
							style="
								display: inline-block;
								padding: 0.5rem;
								margin: 0.25rem 0;
								width: 100%;
								border: 1px solid lightgrey;
							"
						>
							<p
								class="question"
								style="font-weight: 500; padding-bottom: 0.5rem"
							>
								{{ item.question }}
							</p>
							<p class="answer">
								<template v-if="item.type === 'text'">
									{{ item.answer }}
								</template>
								<template v-else-if="item.type === 'radio'">
									{{ item.answer.selected }}
									{{ item.answer.etcText ? ` :${item.answer.etcText}` : '' }}
								</template>
								<template v-else-if="item.type === 'checkbox'">
									{{ String(item.answer.selected) }}
									{{ item.answer.etcText ? ` :${item.answer.etcText}` : '' }}
								</template>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { API_URL } from '@/assets/constants.js';
import { REF_LOADING, REF_FRONTEND_BASE_URL } from '@/assets/globalState.js';
import PasswordInputSet from '@/components/PasswordInputSet.vue';
import axios from 'axios';

const forms = ref([]);

// form tempalte에서 미리보기 체크한 아이템의 목록 반환
function getPreviewBothItems(arr2) {
	const arr = [];
	for (let section of arr2) {
		for (let item of section.items) {
			if (item.preview === 'both') {
				arr.push(item);
			}
		}
	}
	return arr;
}
function getPreviewOnlyAnswerItems(arr2) {
	const arr = [];

	for (let section of arr2) {
		for (let item of section.items) {
			if (item.preview === 'onlyAnswer') {
				arr.push(item);
			}
		}
	}
	return arr;
}

function openForm(id) {
	window.open(`${REF_FRONTEND_BASE_URL.value}/form/${id}`);
}
async function handleValidation(pw) {
	try {
		REF_LOADING.value = true;
		const _res = await axios.post(
			`${API_URL}?taskType=getFormList`,
			JSON.stringify({
				pw: pw,
			}),
		);

		const res = _res.data;

		if (res.status === 'error') {
			if (res.data.msg === 'Invalid password') {
				alert('비밀번호 틀림');
			} else {
				alert('정상적으로 통신하였으나 오류 발생 : ' + JSON.stringify(res));
			}
			return;
		}

		forms.value = res.data.userForms;
	} catch (err) {
		alert(err);
	} finally {
		REF_LOADING.value = false;
	}
}
</script>

<style lang="scss" scoped>
.submitted-forms-page {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	max-width: 650px;
}
</style>
