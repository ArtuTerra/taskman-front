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
		const dataReady = ref(false);
		const status = ref("pending");

		const fetchAllTasks = async () => {
			try {
				status.value = "pending";
				await taskStore.fetchTasks();
				taskData.value = taskStore.tasks;
				status.value = "success";
			} catch (error) {
				status.value = "error";
			} finally {
				dataReady.value = true;
			}
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
			dataReady,
			status,
			refresh,
			taskData,
		};
	},
});
</script>

<template>
	<div v-if="status === 'pending' || !dataReady">
		<p>Loading . . .</p>
	</div>
	<div v-else class="main__container">
		<div class="task__button">
			<button class="task__button__all" @click.prevent="showAllTasks()">All Tasks</button>
			<button class="task__button__assigned" @click.prevent="assignedTasks()">
				Assigned Tasks
			</button>
			<button class="task__button__created" @click.prevent="myTasks()">My Tasks</button>
			<button class="task__button__refresh" @click.prevent="refresh()">Refresh Data</button>
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
	</div>
</template>

<style scoped lang="scss">
%bg {
	background-color: var(--background-dark-highlight);
	color: var(--text-light-hover);
	border: 1px solid var(--brand-color-primary-600);
	transition: 150ms;
}
.main__container {
	display: flex;
	flex-direction: column;
}
.task__button {
	display: flex;
	flex-direction: row;
	justify-content: center;
	padding-top: 0.75rem;
	gap: 12px;
	&__all,
	&__created,
	&__assigned,
	&__refresh {
		background-color: var(--ds-background-neutral);
		color: var(--text-light);
		padding: 8px 5px;
		margin: 0px 3px;
		border: 1px solid var(--brand-color-primary-700);
		border-radius: 20px;
	}
}
.task__button__assigned:hover,
.task__button__all:hover,
.task__button__created:hover,
.task__button__refresh:hover {
	@extend %bg;
}

.task__list {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: flex-start;
	&__box__top {
		justify-content: space-between;
	}
	margin-bottom: 10px;
	@media screen and (max-width: 980px) {
		justify-content: center;
	}
}
</style>
