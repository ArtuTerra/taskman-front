import { defineStore } from "pinia";
import { useToastSuccess, useAlertError, useAlertSuccess } from "~/composables/swalMixins";
import type { TaskAssigns } from "~/types/tasksAssigns";
import type { UserInfo } from "~/types/users";

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

		updateAssign(taskId: number, users: UserInfo[]) {
			const taskIndex = this.tasks.findIndex((task) => task.id === taskId);
			if (taskIndex !== -1) {
				this.tasks[taskIndex].assigned_users = users;
			}
		},

		async fetchTasks() {
			try {
				const authStore = useAuthStore();
				const response = await fetchWrapper.get(
					`${baseUrl}/api/tasks/assigns`,
					authStore.returnToken(),
				);
				this.setTasks(response);
			} catch (error) {
				useAlertError.fire({
					title: "Oops!",
					text: `Error occurred while loading all tasks! ${error}`,
				});
			}
		},

		async fetchTaskById(taskId: number) {
			try {
				const authStore = useAuthStore();
				const response = await fetchWrapper.get(
					`${baseUrl}/api/tasks/${taskId}`,
					authStore.returnToken(),
				);
				return response;
			} catch (error) {
				useAlertError.fire({
					title: "Oops!",
					text: `Error occurred while loading your task! ${error}`,
				});
			}
		},

		async fetchDeleteTask(taskId: number) {
			try {
				const authStore = useAuthStore();
				await fetchWrapper.delete(`${baseUrl}/api/tasks/${taskId}`, [], authStore.returnToken());
				this.removeTask(taskId);
				useToastSuccess.fire({
					title: "Success!",
					text: "Task was successfully deleted!",
				});
			} catch (error) {
				useAlertError.fire({
					title: "Oops!",
					text: `Error occurred while deleting your task! ${error}`,
				});
			}
		},

		async fetchCreateTask(newTask: TaskAssigns) {
			try {
				const authStore = useAuthStore();
				const createdTask = await fetchWrapper.post(
					`${baseUrl}/api/tasks`,
					newTask,
					authStore.returnToken(),
				);
				this.addTask(createdTask);
				useToastSuccess.fire({
					title: "Success!",
					text: "Task was created successfully!",
				});
			} catch (error) {
				useAlertError.fire({
					title: "Oops!",
					text: `Error occurred while creating your task! ${error}`,
				});
			}
		},

		async fetchEditTask(updatedTask: TaskAssigns) {
			try {
				const authStore = useAuthStore();
				const response = await fetchWrapper.put(
					`${baseUrl}/api/tasks/${updatedTask.id}`,
					{
						"title": updatedTask.title,
						"description": updatedTask.description,
					},
					authStore.returnToken(),
				);

				if (response.ok) {
					this.updateTask(updatedTask);
					useToastSuccess.fire({
						title: "Success!",
						text: "Task was updated successfully!",
					});
				}
			} catch (error) {
				useAlertError.fire({
					title: "Oops!",
					text: `Error occurred while updating your task! ${error}`,
				});
			}
		},

		async fetchCompleteTask(taskId: number, taskState: boolean) {
			try {
				const authStore = useAuthStore();
				const editedTask = await fetchWrapper.put(
					`${baseUrl}/api/tasks/${taskId}`,
					{ "completed": taskState },
					authStore.returnToken(),
				);
				this.updateTask(editedTask);
			} catch (error) {
				useAlertError.fire({
					title: "Oops!",
					text: `Error occurred while changing your task's status! ${error}`,
				});
			}
		},

		async fetchAssignUsersToTask({ taskId, userIds }: { taskId: number; userIds: number[] }) {
			try {
				const authStore = useAuthStore();
				const response = await fetchWrapper.post(
					`${baseUrl}/api/tasks/assign/${taskId}`,
					{
						user_ids: userIds,
					},
					authStore.returnToken(),
				);
				this.updateTask(response);
				useAlertSuccess.fire({
					title: "Success!",
					text: "User was successfully assigned to your task",
				});
			} catch (error) {
				useAlertError.fire({
					title: "Oops!",
					text: `Error occurred while assigning a user to your task! ${error}`,
				});
			}
		},

		async fetchRemoveUsersFromTask({ taskId, userIds }: { taskId: number; userIds: number[] }) {
			try {
				const authStore = useAuthStore();
				const response = await fetchWrapper.delete(
					`${baseUrl}/api/tasks/assign/${taskId}`,
					{
						user_ids: userIds,
					},
					authStore.returnToken(),
				);
				this.updateTask(await response);
				useAlertSuccess.fire({
					title: "Success!",
					text: "User was successfully removed from the task",
				});
			} catch (error) {
				useAlertError.fire({
					title: "Oops!",
					text: `Error occurred while removing the user from the task! ${error}`,
				});
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

		getTasksByAssigned: (state) => (userId: number | string) => {
			return state.tasks.filter((task) => task.assigned_users.some((user) => user.id === userId));
		},
	},
});
