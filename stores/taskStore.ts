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
		async fetchTasks() {
			console.log("Fetching tasks...");
			try {
				const response = await fetch("http://127.0.0.1:8000/api/tasks");
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
