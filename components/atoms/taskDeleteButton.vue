<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "TaskDeleteButton",
	props: {
		taskId: {
			type: Number as PropType<number>,
			required: true,
		},
	},
	emits: ["delete-task"],
});
</script>

<template>
	<button
		:id="taskId.toString()"
		class="task__delete__button"
		type="button"
		@click="$emit('delete-task', taskId)"
	>
		<!-- FIRST SVG -->
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="30px"
			height="30px"
			viewBox="0 0 20 20"
			fill="#000000"
			stroke="#000000"
			stroke-width="1.5"
			class="task__delete__button__1"
		>
			<line
				fill="none"
				stroke="#e01b24"
				stroke-linecap="round"
				stroke-linejoin="round"
				x1="14.1"
				y1="6.6"
				x2="6.6"
				y2="14.1"
			/>
			<circle fill="none" stroke="#000000" stroke-linejoin="round" cx="10" cy="10" r="9.5" />
			<line
				fill="none"
				stroke="#e01b24"
				stroke-linecap="round"
				stroke-linejoin="round"
				x1="14.1"
				y1="14.1"
				x2="6.6"
				y2="6.6"
			/>
		</svg>
		<!-- END OF FIRST SVG -->

		<!-- SECOND SVG -->
		<svg
			fill="#000000"
			width="30px"
			height="30px"
			viewBox="0 0 17 18"
			xmlns="http://www.w3.org/2000/svg"
			class="task__delete__button__2"
		>
			<path
				d="M16.417 10.283A7.917 7.917 0 1 1 8.5 2.366a7.916 7.916 0 0 1 7.917 7.917zm-6.804.01 3.032-3.033a.792.792 0 0 0-1.12-1.12L8.494 9.173 5.46 6.14a.792.792 0 0 0-1.12 1.12l3.034 3.033-3.033 3.033a.792.792 0 0 0 1.12 1.119l3.032-3.033 3.033 3.033a.792.792 0 0 0 1.12-1.12z"
			/>
		</svg>
		<!-- END OF SECOND SVG -->
	</button>
</template>

<style scoped lang="scss">
.task__delete__button {
	position: relative;
	width: 30px;
	height: 30px;
	border: none;
	background: none;
	padding: 0;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;

	&__1,
	&__2 {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		transition: opacity 0.2s;
	}

	&__1 {
		z-index: 1;
		opacity: 0;
	}

	&__2 {
		z-index: 2;
		opacity: 1;
	}

	&:hover .task__delete__button {
		&__1 {
			opacity: 1;
		}
		&__2 {
			opacity: 0;
		}
	}
}
</style>
