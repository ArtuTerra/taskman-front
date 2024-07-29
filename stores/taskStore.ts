import { defineStore } from "pinia";
import type { TaskAssigns } from "~/types/tasksAssigns";

const baseUrl = useRuntimeConfig().public.apiBaseUrl;

export const useTaskStore = defineStore("taskStore", {
	state: () => ({
		tasks: [] as TaskAssigns[],
	}),
	actions: {
		setTasks(newTasks: TaskAssigns[]) {
			this.tasks = newTasks;
		},
		addTask(task: TaskAssigns) {
			this.tasks.push(task);
		},
		removeTask(taskId: number) {
			this.tasks = this.tasks.filter((task) => task.id !== taskId);
		},
		updateTask(updatedTask: TaskAssigns) {
			const index = this.tasks.findIndex((task) => task.id === updatedTask.id);
			if (index !== -1) {
				this.tasks[index] = updatedTask;
			}
		},
		async fetchTasks() {
			try {
				const authStore = useAuthStore();
				const response = await fetchWrapper.get(
					`${baseUrl}/api/tasks/assigns`,
					authStore.user?.access_token,
				);
				this.setTasks(response);
			} catch (error) {
				alert(`Error fetching tasks: ${error}`);
			}
		},
		async myTasks() {
			try {
				const authStore = useAuthStore();
				const response = await fetchWrapper.get(
					`${baseUrl}/api/mytasks`,
					authStore.user?.access_token,
				);
				this.setTasks(response);
			} catch (error) {
				alert(`Error fetching tasks: ${error}`);
			}
		},
		async deleteTask(taskId: number) {
			try {
				const authStore = useAuthStore();
				await fetchWrapper.delete(`${baseUrl}/api/task/${taskId}`, authStore.user?.access_token);
				this.removeTask(taskId);
			} catch (error) {
				alert(`Error deleting task: error`);
			}
		},
		async createTask(newTask: TaskAssigns) {
			try {
				const authStore = useAuthStore();
				const createdTask = await fetchWrapper.post(
					`${baseUrl}/api/newtask`,
					newTask,
					authStore.user?.access_token,
				);
				this.addTask(createdTask);
			} catch (error) {
				alert(`Error creating task: ${error}`);
			}
		},
		async editTask(updatedTask: TaskAssigns) {
			try {
				const authStore = useAuthStore();
				const editedTask = await fetchWrapper.put(
					`${baseUrl}/api/task/${updatedTask.id}`,
					updatedTask,
					authStore.user?.access_token,
				);
				this.updateTask(editedTask);
			} catch (error) {
				alert(`Error updating task: ${error}`);
			}
		},
		async completeTask(taskId: number, taskState: boolean) {
			try {
				const authStore = useAuthStore();
				const editedTask = await fetchWrapper.put(
					`${baseUrl}/api/task/complete/${taskId}`,
					{ "completed": taskState },
					authStore.user?.access_token,
				);
				this.updateTask(editedTask);
			} catch (error) {
				alert(`Error updating task: ${error}`);
			}
		},
		async assignUsersToTask({ taskId, userIds }: { taskId: number; userIds: number[] }) {
			try {
				const authStore = useAuthStore();
				await fetchWrapper.post(
					`${baseUrl}/api/assign`,
					{
						task_id: taskId,
						user_ids: userIds,
					},
					authStore.user?.access_token,
				);
				alert("User Added succesfully!");
			} catch (error) {
				alert(`Error assigning users to task: ${error}`);
			}
		},
	},
	getters: {
		getTaskById: (state) => (id: number | string) => {
			return state.tasks.find((task) => task.id === id);
		},
		getTasksByCreator: (state) => (userId: number | string) => {
			return state.tasks.filter((task) => task.creator_id === userId);
		},
	},
});
