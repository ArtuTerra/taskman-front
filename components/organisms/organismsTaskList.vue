<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useAuthStore } from "~/stores/useAuthStore";
import TaskBox from "~/components/molecules/taskBox.vue";
import { fetchWrapper } from "~/composables/fetchWrapper";
import type { TaskAssigns } from "~/types/tasksAssigns";

export default defineComponent({
	name: "TaskList",
	components: {
		TaskBox,
	},
	setup() {
		const authStore = useAuthStore();
		const baseUrl = useRuntimeConfig().public.apiBaseUrl;
		const taskData = ref<TaskAssigns[] | null>(null);
		const dataReady = ref(false);
		const status = ref("pending");

		const fetchTasks = async () => {
			try {
				const response = await fetchWrapper.get(
					`${baseUrl}/api/tasks/assigns`,
					authStore.user?.access_token,
				);
				taskData.value = response;
				status.value = "success";
			} catch (error) {
				alert(`Error fetching tasks: ${error}`);
				status.value = "error";
			} finally {
				dataReady.value = true;
			}
		};

		onMounted(() => {
			fetchTasks();
		});

		const refresh = () => {
			status.value = "pending";
			fetchTasks();
		};

		const recieveEmit = async (value: number) => {
			try {
				await fetchWrapper.delete(`${baseUrl}/api/task/${value}`, authStore.user?.access_token);
				alert("Task deleted!");
				refresh();
			} catch (error) {
				alert(`Error deleting task: ${error}`);
			}
		};

		return {
			recieveEmit,
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
	<div v-else>
		<button @click="refresh">Refresh Data</button>
		<div v-if="taskData && taskData.length" class="task__list">
			<TaskBox
				v-for="task in taskData"
				:key="task.id"
				:task-id="task.id"
				:title="task.title"
				:description="task.description"
				:completed="task.completed ? true : false"
				:creator="task.creator"
				:assigns="task.assigns"
				@delete-task="recieveEmit"
			/>
		</div>
		<div v-else>
			<p>No tasks available.</p>
		</div>
	</div>
</template>

<style scoped lang="scss">
.task__list {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: flex-start;
}
</style>
