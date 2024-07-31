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
		title="Delete task"
		@click="$emit('delete-task', taskId)"
	>
		<!-- FIRST SVG -->
		<svg
			fill="#000000"
			width="800px"
			height="800px"
			viewBox="-1.7 0 20.4 20.4"
			xmlns="http://www.w3.org/2000/svg"
			class="task__delete__button__img1"
		>
			<path
				d="M16.417 10.283A7.917 7.917 0 1 1 8.5 2.366a7.916 7.916 0 0 1 7.917 7.917zm-6.804.01 3.032-3.033a.792.792 0 0 0-1.12-1.12L8.494 9.173 5.46 6.14a.792.792 0 0 0-1.12 1.12l3.034 3.033-3.033 3.033a.792.792 0 0 0 1.12 1.119l3.032-3.033 3.033 3.033a.792.792 0 0 0 1.12-1.12z"
			/>
		</svg>
		<!-- END OF FIRST SVG -->

		<!-- SECOND SVG -->
		<svg
			class="task__delete__button__img2"
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			width="800px"
			height="800px"
			viewBox="-5 -5 60.00 60.00"
			enable-background="new 0 0 50 50"
			xml:space="preserve"
			fill="#000000"
			stroke="#000000"
			stroke-width="5"
		>
			<g id="SVGRepo_iconCarrier">
				<line
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
					x1="35.253"
					y1="14.747"
					x2="14.747"
					y2="35.254"
				/>
				<circle fill="none" stroke="#000000" stroke-linejoin="round" cx="25" cy="25" r="23.668" />
				<line
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
					x1="35.253"
					y1="35.254"
					x2="14.747"
					y2="14.747"
				/>
			</g>
		</svg>
		<!-- END OF SECOND SVG -->
	</button>
</template>

<style scoped lang="scss">
.task__delete__button {
	position: relative;
	width: 20px;
	height: 20px;
	cursor: pointer;
	align-items: center;
	justify-content: center;

	&__img1,
	&__img2 {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		transition-property: opacity;
		transition-duration: 150ms;
		transition-timing-function: ease;
	}

	&__img1 {
		z-index: 1;
		opacity: 1;
	}

	&__img2 {
		z-index: 2;
		opacity: 0;
	}

	&:hover .task__delete__button {
		&__img1 {
			opacity: 0;
		}
		&__img2 {
			opacity: 1;
		}
	}
}
line {
	stroke: black;
}
</style>
