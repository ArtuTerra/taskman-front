<template>
	<label class="task__list__box__checkbox__container">
		<input type="checkbox" :checked="completed" class="checkbox__input" />
		<svg height="28" width="28" class="checkbox__check">
			<polyline points="20 6 9 17 4 12"></polyline>
		</svg>
		<h3 class="checkbox__text">To-do</h3>
	</label>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

export default defineComponent({
	name: "TaskCompletedButton",
	props: {
		completed: {
			type: Boolean as PropType<boolean>,
			required: false,
			default: false,
		},
	},
});
</script>

<style scoped lang="scss">
.task__list__box__checkbox__container {
	margin: 5px 10px;
	padding: 5px 10px;
	max-width: 200px;
	border: 3px solid var(--auxiliary-color-red-800);
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
	height: 25px;
	width: 80px;
	margin: 5px 10px;
}

.task__list__box__checkbox__container:hover {
	font-size: 20px;
	padding: 2pxx 4px;
	background: #4754ff25;
	transition: 0.2s;
}

.task__list__box__checkbox__container:hover .checkbox__check {
	width: 32px;
	height: 32px;
	background: #ff475425;
	transition: 0.2s;
}

.checkbox__input {
	width: 1px;
	height: 1px;
	opacity: 0;
}

.checkbox__input:checked + .checkbox__check {
	background: #dc143c;
	stroke-dashoffset: 0;
}

.checkbox__check {
	border: 0.2rem solid #dc143c;
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
