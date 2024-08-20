<script lang="ts">
import { defineComponent, type PropType } from "vue";
import TaskDivider from "~/components/atoms/taskDivider.vue";

export default defineComponent({
	name: "TaskBox",
	components: {
		TaskDivider,
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
		creator: {
			type: String,
			required: true,
		},
	},
	emits: ["delete-task", "complete-task", "edit-task"],
	setup() {
		const taskStore = useTaskStore();

		const handleAssignUsers = ({ taskId, userIds }: { taskId: number; userIds: number[] }) => {
			taskStore.fetchAssignUsersToTask({ taskId, userIds });
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
			<span>
				<MoleculesSVGButton
					button-title="Delete this task"
					name1="delete-full"
					name2="delete-red"
					icon-width="1.875rem"
					icon-height="1.875rem"
					:is-filled1="true"
					color1="#ffd7d780"
					color2="#fe5f5f"
					@click.prevent="$emit('delete-task', taskId)"
				/>
			</span>
		</div>
		<AtomsTaskTitle
			:text="description"
			size="extra-small"
			types="default"
			class="task__box__description"
		/>
		<AtomsTaskTitle :text="creator" size="label" types="primary" />
		<TaskDivider />
		<div class="task__box__middle">
			<MoleculesSVGButton
				button-title="Edit this task"
				name1="edit-full"
				name2="edit-empty"
				icon-width="1.875rem"
				icon-height="1.875rem"
				:is-filled1="true"
				:is-filled2="true"
				color1="#d7d7d790"
				color2="#00ffff"
				@click.prevent="$emit('edit-task', taskId)"
			/>
			<MoleculesTaskCompletedButton
				:completed="completed"
				:task-id="taskId"
				@click.prevent="$emit('complete-task', taskId, completed)"
			/>
		</div>
		<div class="task__box__bottom"></div>
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
	border: 0.125rem solid var(--border-dark);
	border-radius: 0.5rem;
	margin: 0.3125rem;
	padding: 0.3125rem;

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
