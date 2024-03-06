<template>
	<div
		v-if="REF_INIT_GLOBAL_STATE_FINISHED"
		class="form-template-page"
		style="
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 100%;
		"
	>
		<!-- 편집기 -->
		<div class="editor">
			<div
				class="section-wrap wrap"
				v-for="(section, sectionIdx) in data"
				:key="sectionIdx"
			>
				<!-- 섹션 추가버튼 -->
				<div class="add-btn-wrap">
					<app-button class="add-section-btn" @click="addSection(sectionIdx)"
						>섹션 추가 ✚</app-button
					>
				</div>

				<!-- 섹션 -->
				<div class="section">
					<div class="section-indicator indicator">
						<p>섹션</p>
						<p>{{ sectionIdx + 1 }}</p>
						<div class="btns">
							<app-button class="btn" @click="moveSectionUp(sectionIdx)"
								>▲</app-button
							>
							<app-button class="btn" @click="moveSectionDown(sectionIdx)"
								>▼</app-button
							>
							<app-button class="btn" @click="deleteSection(sectionIdx)"
								>❌</app-button
							>
						</div>
					</div>
					<div class="section-contents contents">
						<!-- 섹션 헤더 -->
						<div class="header">
							<text-input-set class="title" v-model="section.header.title">
								섹션 제목
							</text-input-set>
							<text-input-set class="desc" v-model="section.header.desc">
								섹션 상세설명
							</text-input-set>
						</div>
						<!-- 섹션 내 문항 -->
						<div
							class="item-wrap"
							v-for="(item, itemIdx) in section.items"
							:key="itemIdx"
						>
							<!-- 문항 추가버튼(상) -->
							<div class="add-btn-wrap">
								<app-button
									class="add-item-btn"
									@click="addItem(sectionIdx, itemIdx)"
								>
									문항 추가 ✚
								</app-button>
							</div>

							<div class="item">
								<div class="item-indicator indicator">
									<p>문항</p>
									<p>{{ `${sectionIdx + 1}-${itemIdx + 1}` }}</p>
									<div class="btns">
										<app-button
											class="btn"
											@click="moveItemUp(sectionIdx, itemIdx)"
											>▲</app-button
										>
										<app-button
											class="btn"
											@click="moveItemDown(sectionIdx, itemIdx)"
											>▼</app-button
										>
										<app-button
											class="btn"
											@click="deleteItem(sectionIdx, itemIdx)"
											>❌</app-button
										>
									</div>
								</div>
								<div class="item-contents contents">
									<text-input-set class="question" v-model="item.question">
										질문
									</text-input-set>

									<div class="common-properties">
										<radio-input-set
											class="required"
											v-model="item.required"
											:options="[
												{ label: '필수', data: true },
												{ label: '선택(무응답 허용)', data: false },
											]"
										>
											필수 응답 여부
										</radio-input-set>

										<radio-input-set
											class="type"
											v-model="item.type"
											@update:itemType="
												newItemType =>
													handleChangeItemType(sectionIdx, itemIdx, newItemType)
											"
											:handle-item-type="true"
											:options="[
												{ label: '자유응답', data: 'text' },
												{ label: '단일응답', data: 'radio' },
												{ label: '다중응답', data: 'checkbox' },
											]"
										>
											응답 유형
										</radio-input-set>

										<radio-input-set
											class="preview"
											v-model="item.preview"
											:options="[
												{ label: '아니요', data: null },
												{ label: '네 (질문/응답 모두)', data: 'both' },
												{ label: '네 (응답만)', data: 'onlyAnswer' },
											]"
										>
											<span class="link-text" @click="goSubmittedForms">{{
												`문의 목록`
											}}</span>
											<span style="font-weight: 600">
												의 요약정보에 표시할까요?
											</span>
										</radio-input-set>
									</div>

									<template v-if="item.type === 'text'">
										<text-input-set
											class="placeholder"
											v-model="item.placeholder"
										>
											입력칸이 비어있을 때 보여줄 내용(힌트)
										</text-input-set>
									</template>
									<template v-else-if="item.type === 'radio'">
										<option-edit-set v-model="item.options"></option-edit-set>
										<radio-input-set
											class="useEtc"
											v-model="item.useEtc"
											:options="[
												{ label: '예', data: true },
												{ label: '아니요', data: false },
											]"
										>
											{{ `기타 옵션 사용` }}
										</radio-input-set>
									</template>
									<template v-else-if="item.type === 'checkbox'">
										<option-edit-set v-model="item.options"></option-edit-set>
										<radio-input-set
											class="useEtc"
											v-model="item.useEtc"
											:options="[
												{ label: '예', data: true },
												{ label: '아니요', data: false },
											]"
										>
											{{ `기타 옵션 사용` }}
										</radio-input-set>
									</template>
								</div>
							</div>
						</div>
						<!-- 문항 추가버튼(하) -->
						<div class="add-btn-wrap">
							<app-button class="add-item-btn" @click="addItem(sectionIdx, -1)">
								문항 추가 ✚
							</app-button>
						</div>
					</div>
				</div>
			</div>
			<!-- 섹션 추가버튼(하)) -->
			<div class="add-btn-wrap">
				<app-button class="add-section-btn" @click="addSection(-1)"
					>섹션 추가 ✚</app-button
				>
			</div>
		</div>

		<!--  -->
		<div
			style="
				border-bottom: 1px solid black;
				height: 1px;
				width: 100%;
				margin: 3rem 0;
			"
		></div>

		<div @keydown.enter="handleSubmit">
			<input
				v-model="pw"
				type="password"
				placeholder="비밀번호"
				style="height: 48px; padding: 0.5rem; margin: 1rem; width: 256px"
			/>
		</div>

		<app-button
			color="black"
			@click="handleSubmit"
			style="margin: 1rem; padding: 0.5rem; width: 256px; margin-bottom: 4rem"
			>저장하기</app-button
		>
	</div>
</template>

<style lang="scss" scoped>
.editor {
	padding-top: 92px;
	width: 80%;
}

.section {
	display: flex;
	margin: 2rem 0;
	border: 1px solid black;

	.section-indicator {
		border-right: 1px solid black;
		background-color: rgb(30, 30, 30);
		color: white;
	}
	.section-contents {
		.header {
			// border: 1px solid black;
			background-color: rgb(236, 236, 236);
			padding: 1rem 2rem;
			margin: 1rem 0;
		}
		.item {
			display: flex;

			margin: 1rem 0;
			border: 1px solid grey;

			.item-indicator {
				border-right: 1px solid grey;
			}
			.item-contents {
				.common-properties {
					display: flex;
					justify-content: space-between;
					align-items: center;
					flex-wrap: wrap;
				}
			}
		}
	}
}

//
.indicator {
	min-width: 64px;
	width: 64px;
	padding: 0.5rem;
	text-align: center;
	p {
		padding: 0.25rem 0;
		font-weight: 500;
	}
	.btns .btn {
		width: 2rem;
		padding: 0.5rem 0.25rem;
		margin: 0.5rem 0;
	}
}
.contents {
	padding: 1rem 1rem;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.add-btn-wrap {
	text-align: center;
	.add-section-btn {
		background-color: black;
		color: white;
		transform: translateX(32px);
	}
}

.link-text {
	font-weight: 700;
	color: orangered;
	cursor: pointer;
	transition: color 0.5s;
	&:hover {
		color: orange;
	}
}
</style>

<script setup>
import AppButton from '@/components/AppButton.vue';
import axios from 'axios';
import { ref } from 'vue';

import toast from '@/assets/makeToast.js';
import TextInputSet from '@/components/TextInputSet.vue';
import RadioInputSet from '@/components/RadioInputSet.vue';
import OptionEditSet from '@/components/OptionEditSet.vue';

import { API_URL, FORM_TEMPLATE_SCHEMA } from '@/assets/constants.js';
import { REF_INIT_GLOBAL_STATE_FINISHED } from '@/assets/globalState.js';
import {
	REF_LOADING,
	REF_FORM_TEMPLATE,
	FETCH_GLOBAL_STATES,
} from '@/assets/globalState.js';

const data = ref([]);
const pw = ref('');
let temp;

async function init() {
	try {
		REF_LOADING.value = true;
		if (!REF_INIT_GLOBAL_STATE_FINISHED.value) {
			await FETCH_GLOBAL_STATES();
		}
		data.value = [...REF_FORM_TEMPLATE.value];
	} catch (err) {
		console.error(err);
		alert('문의 템플릿 불러오지 못함');
	} finally {
		REF_LOADING.value = false;
	}
}
init();

// 섹션 추가/삭제/순서이동
function addSection(idx) {
	toast.add();
	if (idx === -1) {
		data.value.push({
			...FORM_TEMPLATE_SCHEMA.section,
		});
		return;
	}

	data.value.splice(idx, 0, {
		...FORM_TEMPLATE_SCHEMA.section,
	});
}
function deleteSection(idx) {
	if (!confirm(`${idx + 1}번 섹션을 삭제하시는게 맞나요?`)) {
		return;
	}
	toast.remove();
	data.value.splice(idx, 1);
}
function moveSectionUp(idx) {
	if (idx === 0) return;
	temp = data.value[idx];
	data.value.splice(idx, 1);
	data.value.splice(idx - 1, 0, temp);
	toast.up();
}
function moveSectionDown(idx) {
	if (idx === data.value.length - 1) return;
	temp = data.value[idx];
	data.value.splice(idx, 1);
	data.value.splice(idx + 1, 0, temp);
	toast.down();
}

// 문항 추가/삭제/순서이동
function addItem(sectionIdx, itemIdx) {
	toast.add();
	if (itemIdx === -1) {
		data.value[sectionIdx].items.push({
			...FORM_TEMPLATE_SCHEMA.text,
		});
		return;
	}

	data.value[sectionIdx].items.splice(itemIdx, 0, {
		...FORM_TEMPLATE_SCHEMA.text,
	});
}
function deleteItem(sectionIdx, itemIdx) {
	if (
		!confirm(
			`${sectionIdx + 1}번 섹션의 ${itemIdx + 1}번 문항을 삭제하시는게 맞나요?`,
		)
	) {
		return;
	}
	toast.remove();
	data.value[sectionIdx].items.splice(itemIdx, 1);
}
function moveItemUp(sectionIdx, itemIdx) {
	if (itemIdx === 0) return;
	temp = data.value[sectionIdx].items[itemIdx];
	data.value[sectionIdx].items.splice(itemIdx, 1);
	data.value[sectionIdx].items.splice(itemIdx - 1, 0, temp);
	toast.up();
}
function moveItemDown(sectionIdx, itemIdx) {
	if (itemIdx === data.value[sectionIdx].items.length - 1) return;
	temp = data.value[sectionIdx].items[itemIdx];
	data.value[sectionIdx].items.splice(itemIdx, 1);
	data.value[sectionIdx].items.splice(itemIdx + 1, 0, temp);
	toast.down();
}

// 문항 타입 변경
function handleChangeItemType(sectionIdx, itemIdx, newItemType) {
	const prev = { ...data.value[sectionIdx].items[itemIdx] };

	if (newItemType === 'text') {
		data.value[sectionIdx].items[itemIdx] = {
			...FORM_TEMPLATE_SCHEMA.text,
			question: prev.question,
			required: prev.required,
			preview: prev.preview,
		};
	} else if (newItemType === 'radio') {
		data.value[sectionIdx].items[itemIdx] = {
			...FORM_TEMPLATE_SCHEMA.radio,
			preview: prev.preview,
			question: prev.question,
			required: prev.required,
			options: prev.options ? [...prev.options] : [],
			useEtc: prev.useEtc ? prev.useEtc : false,
		};
	} else if (newItemType === 'checkbox') {
		data.value[sectionIdx].items[itemIdx] = {
			...FORM_TEMPLATE_SCHEMA.checkbox,
			preview: prev.preview,
			question: prev.question,
			required: prev.required,
			options: prev.options ? [...prev.options] : [],
			useEtc: prev.useEtc ? prev.useEtc : false,
		};
	}
}

// 저장
const waitingResponse = ref(false);
async function handleSubmit() {
	try {
		REF_LOADING.value = true;
		const _pw = pw.value;
		pw.value = '';

		if (waitingResponse.value) return;
		waitingResponse.value = true;

		const _res = await axios.post(
			`${API_URL}?taskType=updateFormTemplate`,
			JSON.stringify({
				pw: _pw,
				newTemplate: data.value,
			}),
		);
		waitingResponse.value = false;
		REF_LOADING.value = false;
		const res = _res.data;

		if (res.status === 'error') {
			if (res.data.msg === 'Invalid password') {
				alert('비밀번호가 틀렸습니다');
				return;
			}
			alert('정상적으로 통신하였으나 오류 발생 : ' + JSON.stringify(res));
			return;
		}

		FETCH_GLOBAL_STATES();
		alert('문의 템플릿 변경사항 저장 완료');
		window.scrollTo(0, 0);
	} catch (err) {
		console.error(err);
		alert(err);
		waitingResponse.value = false;
		REF_LOADING.value = false;
	} finally {
	}
}

//

function goSubmittedForms() {
	const target = document.location.href.split('/template')[0];
	window.open(`${target}/submitted`);
}
</script>
