<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
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
				alert(`Error fetching tasks: ${error}`);
				status.value = "error";
			} finally {
				dataReady.value = true;
			}
		};

		onMounted(() => {
			fetchAllTasks();
		});

		const showAllTasks = (noalert?: boolean) => {
			taskData.value = taskStore.tasks;
			if (!noalert) {
				alert("Tasks refreshed!");
			}
		};

		const refresh = async (noalert?: boolean) => {
			await fetchAllTasks();
			if (!noalert) {
				alert("Tasks refreshed!");
			}
		};

		const myTasks = (noalert?: boolean) => {
			if (authStore && authStore.user && authStore.user.id) {
				taskData.value = taskStore.getTasksByCreator(authStore.user.id);
				if (!noalert) {
					alert("Tasks refreshed!");
				}
			}
		};

		const deleteEmit = async (value: number) => {
			try {
				await taskStore.deleteTask(value);
				alert("Task deleted!");
				refresh(true);
			} catch (error) {
				alert(`Error deleting task: ${error}`);
			}
		};

		const completeEmit = async (value: number, oldState: boolean) => {
			try {
				const newState = !oldState;
				await taskStore.completeTask(value, newState);
				alert("Task (un)Completed!");
			} catch (error) {
				alert(`Error completing task: ${error}`);
			} finally {
				refresh(true);
			}
		};

		const editEmit = (value: number) => {
			try {
				navigateTo(`/edit/${value}`);
				refresh(true);
			} catch (error) {
				alert(`Error deleting task: ${error}`);
			}
		};

		return {
			showAllTasks,
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
			<button class="task__button__filter" @click="showAllTasks(true)">All Tasks</button>
			<button class="task__button__filter" @click="myTasks(true)">My Tasks</button>
			<button class="task__button__refresh" @click="refresh()">Refresh Data</button>
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
.main__container {
	display: flex;
	flex-direction: column;
}
.task__button {
	display: flex;
	flex-direction: row;
	justify-content: center;
	&__filter,
	&__refresh {
		color: blue;
		padding: 8px 5px;
		margin: 0px 3px;
		border: 4px solid var(--brand-color-primary-700);
		border-radius: 20px;
	}
}
.task__list {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: flex-start;
}
</style>
