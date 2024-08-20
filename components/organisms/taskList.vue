<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useToastSuccess, useAlert, useToast } from "~/composables/swalMixins";
import { useAuthStore } from "~/stores/useAuthStore";
import { useTaskStore } from "~/stores/taskStore";
import type { TaskAssigns } from "~/types/tasksAssigns";

export default defineComponent({
	name: "TaskList",
	setup() {
		const taskStore = useTaskStore();
		const authStore = useAuthStore();
		const userStore = useUsersStore();
		const taskData = ref<TaskAssigns[] | null>(null);

		const getCreatorName = (creatorId: number) => {
			const username: string = `Created by ${userStore.getUserNameById(creatorId)}`;
			return username;
		};

		const fetchAllTasks = async () => {
			await taskStore.fetchTasks();
			taskData.value = taskStore.tasks;
		};

		onMounted(() => {
			userStore.fetchAllUsers();
			fetchAllTasks();
		});

		const refresh = async () => {
			await fetchAllTasks();
			useToastSuccess.fire({
				title: "Tasks Refreshed successfully",
			});
		};

		const showAllTasks = () => {
			taskData.value = taskStore.tasks;
			useToast.fire({
				title: "Showing all tasks!",
			});
		};

		const myTasks = () => {
			if (authStore && authStore.user && authStore.user.id) {
				taskData.value = taskStore.getTasksByCreator(authStore.user.id);
				useToast.fire({
					title: "Showing the tasks you created!",
				});
			}
		};

		const assignedTasks = () => {
			if (authStore && authStore.user && authStore.user.id) {
				taskData.value = taskStore.getTasksByAssigned(authStore.user.id);
				useToast.fire({
					title: "Showing tasks assigned to you!",
				});
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
						await taskStore.fetchDeleteTask(taskId).then(() => (taskData.value = taskStore.tasks));
					}
				});
		};

		const completeEmit = async (taskId: number, oldState: boolean) => {
			try {
				const newState = !oldState;
				await taskStore.fetchCompleteTask(taskId, newState);
			} catch (error) {
				useToastError.fire({
					title: "Error changing task status!",
					text: "Try again later!",
				});
			}
		};

		const editEmit = (taskId: number) => {
			navigateTo(`/edit/${taskId}`);
		};

		return {
			getCreatorName,
			showAllTasks,
			assignedTasks,
			myTasks,
			completeEmit,
			deleteEmit,
			editEmit,
			refresh,
			taskData,
			filters: [
				{ label: "All Tasks", action: showAllTasks },
				{ label: "Assigned Tasks", action: assignedTasks },
				{ label: "My Tasks", action: myTasks },
				{ label: "Refresh Data", action: refresh },
			],
		};
	},
});
</script>

<template>
	<div class="task__button">
		<MoleculesButton
			v-for="(filter, index) in filters"
			:key="index"
			size="small"
			text-size="extra-small-skinny"
			text-type="default"
			types="purple"
			style="text-wrap: nowrap; width: fit-content"
			:text="filter.label"
			@click.prevent="filter.action"
		/>
	</div>
	<div v-if="taskData && taskData.length" class="task__list">
		<OrganismsTaskBox
			v-for="task in taskData"
			:key="task.id"
			:task-id="task.id"
			:title="task.title"
			:description="task.description"
			:completed="task.completed"
			:creator="getCreatorName(task.creator_id)"
			:assigns="task.assigned_users"
			@delete-task="deleteEmit"
			@complete-task="completeEmit"
			@edit-task="editEmit"
		/>
	</div>
	<div v-else>
		<AtomsTaskTitle text="No tasks Available!" types="default" size="medium" />
	</div>
</template>

<style scoped lang="scss">
.task__button {
	display: flex;
	flex-direction: row;
	justify-content: center;
	padding: 0.5rem 0px;
	gap: 0.75rem;
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
