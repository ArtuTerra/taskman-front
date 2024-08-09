<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "TaskEditButton",
	props: {
		taskId: {
			type: Number as PropType<number>,
			required: true,
		},
	},
	emits: ["edit-task"],
});
</script>

<template>
	<button
		:id="taskId.toString()"
		class="task__edit__button"
		type="button"
		title="Edit task"
		@click="$emit('edit-task', taskId)"
	>
		<!-- FIRST SVG -->
		<img class="task__edit__button__1" src="~/assets/icons/edit1.svg" />
		<!-- END OF FIRST SVG -->

		<!-- SECOND SVG -->
		<img class="task__edit__button__2" src="~/assets/icons/edit2.svg" />
		<!-- END OF SECOND SVG -->
	</button>
</template>

<style scoped lang="scss">
.task__edit__button {
	position: relative;
	margin: 5px;
	padding: 1px;
	width: 25px;
	height: 25px;
	cursor: pointer;
	align-items: center;
	justify-content: center;

	&__1,
	&__2 {
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		transition-property: opacity;
		transition-duration: 150ms;
		transition-timing-function: ease;
	}

	&__1 {
		fill: var(--brand-color-primary-700);
		z-index: 1;
		opacity: 1;
	}

	&__2 {
		fill: var(--brand-color-secondary-700);
		z-index: 2;
		opacity: 0;
	}

	&:hover .task__edit__button {
		&__1 {
			z-index: 1;
			opacity: 0;
			transition: 0.2s;
		}
		&__2 {
			z-index: 3;
			opacity: 1;
			transition: 0.2s;
		}
	}
}
</style>
