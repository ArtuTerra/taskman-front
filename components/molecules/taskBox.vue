<script lang="ts">
import { defineComponent, type PropType } from "vue";
import TaskCompletedButton from "~/components/atoms/taskCompletedButton.vue";
import TaskTitle from "~/components/atoms/taskTitle.vue";
import TaskDescription from "~/components/atoms/taskDescription.vue";
import TaskDivider from "~/components/atoms/taskDivider.vue";
import TaskDeleteButton from "~/components/atoms/taskDeleteButton.vue";
import UserAdd from "~/components/molecules/userAdd.vue";
import TaskEditButton from "~/components/atoms/taskEditButton.vue";

export default defineComponent({
	name: "TaskBox",
	components: {
		TaskTitle,
		TaskDescription,
		TaskEditButton,
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
	emits: ["delete-task", "complete-task", "edit-task"],
	setup() {
		const taskStore = useTaskStore();

		const handleAssignUsers = ({ taskId, userIds }: { taskId: number; userIds: number[] }) => {
			taskStore.assignUsersToTask({ taskId, userIds });
		};

		return {
			handleAssignUsers,
		};
	},
});
</script>

<template>
	<div class="task__list__box">
		<div class="task__list__box__top">
			<TaskTitle :title="title" />
			<TaskDeleteButton :task-id="taskId" @click="$emit('delete-task', taskId)" />
		</div>
		<TaskDescription :description="description" />
		<TaskEditButton :task-id="taskId" @click="$emit('edit-task', taskId)" />
		<TaskDivider />
		<div class="task__list__box__bottom">
			<TaskCompletedButton
				:completed="completed"
				:task-id="taskId"
				@click.prevent="$emit('complete-task', taskId, completed)"
			/>
			<UserAdd :task-id="taskId" @assign-users="handleAssignUsers" />
		</div>
	</div>
</template>

<style scoped lang="scss">
.task__list__box {
	background-color: var(--brand-color-primary-200);
	width: 200px;
	border: 3px solid var(--brand-color-primary-200);
	border-radius: 4px;
	margin: 10px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	transition: 0.5s;
	&__top {
		background-color: var(--brand-color-primary-300);
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	&__bottom {
		display: flex;
		flex-direction: column;
	}
}
</style>
