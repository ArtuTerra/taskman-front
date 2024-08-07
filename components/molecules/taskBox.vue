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
		assigns: {
			type: Array,
			default: () => [],
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
		<div class="task__list__box__middle">
			<TaskEditButton :task-id="taskId" @click="$emit('edit-task', taskId)" />
			<TaskCompletedButton
				:completed="completed"
				:task-id="taskId"
				@click.prevent="$emit('complete-task', taskId, completed)"
			/>
		</div>
		<div class="task__list__box__bottom">
			<TaskDivider />
			<UserAdd :task-id="taskId" :assigned-users="assigns" @assign-users="handleAssignUsers" />
		</div>
	</div>
</template>

<style scoped lang="scss">
.task__list__box {
	background-color: var(--background-darkblue);
	width: 300px;
	border: 2px solid var(--border-dark);
	border-radius: 0.5rem;
	padding: 5px;
	margin: 5px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	transition: 0.5s;
	flex-grow: 1;
	max-width: 380px;
	max-height: 350px;
	&__top {
		background-color: var(--background-darkblue-highlight);
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	&__middle {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		margin-bottom: 0.5rem;
	}
	&__bottom {
		display: flex;
		flex-direction: column;
	}
}
</style>
