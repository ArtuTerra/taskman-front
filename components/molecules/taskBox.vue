<script lang="ts">
import { defineComponent, type PropType } from "vue";
import TaskCompletedButton from "@/components/atoms/taskCompletedButton.vue";
import TaskTitle from "@/components/atoms/taskTitle.vue";
import TaskDescription from "@/components/atoms/taskDescription.vue";
import TaskDivider from "@/components/atoms/taskDivider.vue";

export default defineComponent({
	name: "TaskBox",
	components: {
		TaskTitle,
		TaskDescription,
		TaskDivider,
		TaskCompletedButton,
	},
	props: {
		title: {
			type: String as PropType<string>,
			required: true,
		},
		description: {
			type: String as PropType<string>,
			required: true,
		},
		completed: {
			type: Boolean as PropType<boolean>,
			required: false,
			default: false,
		},
	},
});
</script>

<template>
	<div class="task__list__box">
		<TaskTitle :title="title" />
		<TaskDescription :description="description" />
		<TaskDivider />
		<TaskCompletedButton :completed="completed" />
	</div>
</template>

<style scoped lang="scss">
.task__list__box {
	width: 200px;
	border: 3px solid blue;
	border-radius: 10px;
	margin: 10px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	transition: 0.5s;
}
</style>
