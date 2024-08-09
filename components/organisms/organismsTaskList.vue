<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useToastSuccess, useAlert, useToast } from "~/composables/swalMixins";
import { useAuthStore } from "~/stores/useAuthStore";
import { useTaskStore } from "~/stores/taskStore";
import TaskBox from "~/components/molecules/taskBox.vue";
import type { TaskAssigns } from "~/types/tasksAssigns";

export default defineComponent({
	name: "TaskList",
	components: {
		TaskBox,
	},
	setup() {
		const taskStore = useTaskStore();
		const authStore = useAuthStore();
		const taskData = ref<TaskAssigns[] | null>(null);

		const fetchAllTasks = async () => {
			await taskStore.fetchTasks();
			taskData.value = taskStore.tasks;
		};

		onMounted(() => {
			fetchAllTasks();
		});

		const refresh = async (noalert?: boolean) => {
			await fetchAllTasks();
			if (!noalert) {
				useToastSuccess.fire({
					title: "Tasks Refreshed successfully",
				});
			}
		};

		const showAllTasks = (noalert?: boolean) => {
			taskData.value = taskStore.tasks;
			if (!noalert) {
				useToast.fire({
					title: "Showing all tasks!",
				});
			}
		};

		const myTasks = (noalert?: boolean) => {
			if (authStore && authStore.user && authStore.user.id) {
				taskData.value = taskStore.getTasksByCreator(authStore.user.id);
				if (!noalert) {
					useToast.fire({
						title: "Showing the tasks you created!",
					});
				}
			}
		};

		const assignedTasks = (noalert?: boolean) => {
			if (authStore && authStore.user && authStore.user.id) {
				taskData.value = taskStore.getTasksByAssigned(authStore.user.id);
				if (!noalert) {
					useToast.fire({
						title: "Showing tasks assigned to you!",
					});
				}
			}
		};

		const deleteEmit = (taskId: number) => {
			useAlert
				.fire({
					title: "Are you sure?",
					text: "You won't be able to revert this!",
					icon: "warning",
					showCancelButton: true,
					confirmButtonColor: "#3085d6",
					cancelButtonColor: "#d33",
					confirmButtonText: "Yes, delete it!",
				})
				.then(async (result) => {
					if (result.isConfirmed) {
						await taskStore.deleteTask(taskId).then(() => (taskData.value = taskStore.tasks));
					}
				});
		};

		const completeEmit = async (taskId: number, oldState: boolean) => {
			try {
				const newState = !oldState;
				await taskStore.completeTask(taskId, newState);
			} catch (error) {
				useToastError.fire({
					title: "Error changing task status!",
					text: "Try again later!",
				});
			}
		};

		const editEmit = (taskId: number) => {
			try {
				navigateTo(`/edit/${taskId}`);
				refresh(true);
			} catch (error) {
				useToastError.fire({
					title: "Error changing task status!",
					text: "Try again later!",
				});
			}
		};

		return {
			showAllTasks,
			assignedTasks,
			myTasks,
			completeEmit,
			deleteEmit,
			editEmit,
			refresh,
			taskData,
		};
	},
});
</script>

<template>
	<div class="task__button">
		<button class="task__button__filter" @click.prevent="showAllTasks()">All Tasks</button>
		<button class="task__button__filter" @click.prevent="assignedTasks()">Assigned Tasks</button>
		<button class="task__button__filter" @click.prevent="myTasks()">My Tasks</button>
		<button class="task__button__filter" @click.prevent="refresh()">Refresh Data</button>
	</div>
	<div v-if="taskData && taskData.length" class="task__list">
		<TaskBox
			v-for="task in taskData"
			:key="task.id"
			:task-id="task.id"
			:title="task.title"
			:description="task.description"
			:completed="task.completed ? true : false"
			:creator="task.creator_id"
			:assigns="task.assigned_users"
			@delete-task="deleteEmit"
			@complete-task="completeEmit"
			@edit-task="editEmit"
		/>
	</div>
	<div v-else>
		<p>No tasks available.</p>
	</div>
</template>

<style scoped lang="scss">
%filter-button-style {
	background-color: var(--ds-background-neutral);
	color: var(--text-light);
	padding: 8px 5px;
	margin: 0px 3px;
	border: 1px solid var(--brand-color-primary-700);
	border-radius: 20px;
	&:hover {
		background-color: var(--background-dark-highlight);
		color: var(--text-light-hover);
		border: 1px solid var(--brand-color-primary-600);
		transition: 150ms;
	}
}
.task__button {
	display: flex;
	flex-direction: row;
	justify-content: center;
	padding-top: 0.75rem;
	gap: 12px;
	&__filter {
		@extend %filter-button-style;
	}
}

.task__list {
	display: grid;
	gap: 1rem;
	grid-template-columns: 300px 300px 300px 300px;
	margin-bottom: 10px;
	&__box__top {
		justify-content: space-between;
	}

	@media screen and (min-width: 951px) and (max-width: 1250px) {
		grid-template-columns: 300px 300px 300px;
	}
	@media screen and (min-width: 631px) and (max-width: 950px) {
		grid-template-columns: 300px 300px;
	}
	@media screen and (max-width: 630px) {
		grid-template-columns: 390px;
	}
}
</style>
