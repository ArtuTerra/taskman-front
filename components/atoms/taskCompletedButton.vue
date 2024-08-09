<script lang="ts">
import { defineComponent, type PropType } from "vue";

export default defineComponent({
	name: "TaskCompletedButton",
	props: {
		taskId: {
			type: Number as PropType<number>,
			required: true,
		},
		completed: {
			type: Boolean as PropType<boolean>,
			required: false,
			default: false,
		},
	},
	emits: ["complete-task"],
});
</script>

<template>
	<label class="task__list__box__checkbox__container">
		<input
			type="checkbox"
			:checked="completed"
			class="checkbox__input"
			@click="$emit('complete-task', taskId, completed)"
		/>
		<svg height="28" width="28" class="checkbox__check">
			<polyline points="20 6 9 17 4 12"></polyline>
		</svg>
		<div v-if="!completed">
			<h3 class="checkbox__text">To-do</h3>
		</div>
		<div v-else>
			<h3 class="checkbox__text">Done!</h3>
		</div>
	</label>
</template>

<style scoped lang="scss">
.task__list__box__checkbox__container {
	color: var(--text-light);
	padding: 3px;
	max-width: 200px;
	border: 2px solid var(--auxiliary-color-blue-800);
	border-radius: 5px;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	cursor: pointer;
	transition: 0.2s;
}

h3 {
	align-content: center;
	height: 18px;
	width: 80px;
}

.task__list__box__checkbox__container:hover {
	background: var(--background-blue);
	transition: 0.2s;
}

.task__list__box__checkbox__container:hover .checkbox__check {
	border-color: var(--text-lightblue-selected);
	background: var(--text-blue-hover);
	transition: 0.2s;
}

.checkbox__input {
	width: 1px;
	height: 1px;
	opacity: 0;
}

.checkbox__input:checked + .checkbox__check {
	background: var(--brand-color-primary-900);
	stroke-dashoffset: 0;
}

.checkbox__check {
	border: 2px solid var(--text-lightblue);
	stroke: #f9f9f9;
	stroke-dasharray: 25;
	stroke-dashoffset: 25;
	stroke-linecap: round;
	stroke-width: 0.2rem;
	border-radius: 0.2rem;
	fill: none;
	transition:
		background 0.4s,
		stroke-dashoffset 0.6s,
		0.2s;
}
</style>
