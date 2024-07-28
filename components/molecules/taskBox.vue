<script lang="ts">
import { defineComponent, type PropType } from "vue";
import TaskCompletedButton from "~/components/atoms/taskCompletedButton.vue";
import TaskTitle from "~/components/atoms/taskTitle.vue";
import TaskDescription from "~/components/atoms/taskDescription.vue";
import TaskDivider from "~/components/atoms/taskDivider.vue";
import TaskDeleteButton from "~/components/atoms/taskDeleteButton.vue";
import UserAdd from "~/components/molecules/userAdd.vue";

export default defineComponent({
	name: "TaskBox",
	components: {
		TaskTitle,
		TaskDescription,
		TaskDivider,
		TaskCompletedButton,
		TaskDeleteButton,
		UserAdd,
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
		taskId: {
			type: Number as PropType<number>,
			required: true,
		},
	},
	emits: ["delete-task"],
	// methods: {
	// 	recieveEmit(value: string) {
	// 		useDeleteTask(value);
	// 		refresh();
	// 	},
	// },
});
</script>

<template>
	<div class="task__list__box">
		<div class="task__list__box__top">
			<TaskTitle :title="title" />
			<TaskDeleteButton :task-id="taskId" @click="$emit('delete-task', taskId)" />
		</div>
		<TaskDescription :description="description" />
		<TaskDivider />
		<UserAdd />
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
	&__top {
		display: flex;
		flex-direction: row;
	}
}
</style>
