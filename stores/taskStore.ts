import { defineStore } from "pinia";

export const useTaskStore = defineStore("taskStore", {
	state: () => ({
		tasks: [] as Array<{
			id: number;
			title: string;
			description: string;
			completed: boolean;
		}>,
	}),
	actions: {
		// TODO: Fazer API FETCH composable e remover console logs
		async fetchTasks() {
			const config = useRuntimeConfig();
			console.log("Fetching tasks...");
			try {
				const response = await fetch(
					`${config.public.apiBaseUrl}/api/public/tasks`,
				);
				const data = await response.json();
				if (response.status === 200) {
					console.log("Fetched tasks:", data.tasks);
					this.tasks = data.tasks;
				} else {
					console.log("Failed to fetch tasks");
				}
			} catch (err) {
				console.log("Error fetching tasks", err);
			}
		},
	},
});
