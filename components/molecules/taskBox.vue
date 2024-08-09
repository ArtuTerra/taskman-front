<script lang="ts">
import { defineComponent, type PropType } from "vue";
import TaskCompletedButton from "~/components/atoms/taskCompletedButton.vue";
import TaskDivider from "~/components/atoms/taskDivider.vue";
import UserAdd from "~/components/molecules/userAdd.vue";
import TaskEditButton from "~/components/atoms/taskEditButton.vue";

export default defineComponent({
	name: "TaskBox",
	components: {
		TaskEditButton,
		TaskDivider,
		TaskCompletedButton,
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
	<div class="task__box">
		<div class="task__box__top">
			<AtomsTaskTitle :text="title" size="small" types="primary" class="task__box__top__title" />
			<AtomsTaskDeleteButton :task-id="taskId" @click="$emit('delete-task', taskId)" />
		</div>
		<AtomsTaskTitle
			:text="description"
			size="extra-small"
			types="default"
			class="task__box__description"
		/>
		<TaskDivider />
		<div class="task__box__middle">
			<TaskEditButton :task-id="taskId" @click="$emit('edit-task', taskId)" />
			<TaskCompletedButton
				:completed="completed"
				:task-id="taskId"
				@click.prevent="$emit('complete-task', taskId, completed)"
			/>
		</div>
		<div class="task__box__bottom">
			<UserAdd :task-id="taskId" :assigned-users="assigns" @assign-users="handleAssignUsers" />
		</div>
	</div>
</template>

<style scoped lang="scss">
@mixin webkit-box($value) {
	display: -webkit-box;
	line-clamp: $value;
	-webkit-line-clamp: $value;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
}
.task__box {
	background-color: var(--background-darkblue);
	border: 2px solid var(--border-dark);
	border-radius: 0.5rem;
	margin: 5px;
	padding: 5px;

	&__top {
		border: 0.5rem solid transparent;
		background-color: var(--background-darkblue-highlight);
		border-radius: 0.5rem;
		display: flex;
		flex-direction: row;
		justify-content: space-between;

		&__title {
			@include webkit-box(2);
			height: 3.9rem;
			max-width: 85%;
		}
	}
	&__description {
		@include webkit-box(8);
		height: 8.5rem;
	}

	&__middle {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 4px 0px;
	}

	&__bottom {
		display: flex;
		flex-direction: column;
	}
}
</style>
