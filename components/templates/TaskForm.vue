<script lang="ts">
import { defineComponent, ref } from "vue";
import { useTaskStore } from "~/stores/taskStore";
import type { TaskAssigns } from "~/types/tasksAssigns";
import type { UserInfo } from "~/types/users";

export default defineComponent({
	name: "TaskForm",
	setup() {
		const taskId = useRoute().params.id;
		const taskStore = useTaskStore();

		const userFromLocalStorage = localStorage.getItem("user");
		const currentUser: UserInfo = userFromLocalStorage ? JSON.parse(userFromLocalStorage) : null;

		const newTask = ref<TaskAssigns>({
			id: 0,
			title: "",
			description: "",
			completed: false,
			creator: currentUser,
			assigns: [],
		});

		if (taskId) {
			const result = taskStore.getTaskById(Number(taskId));
			if (result) {
				newTask.value = result;
			} else {
				alert("Task not found!");
				navigateTo("/tasks");
			}
		}

		const createTask = async () => {
			try {
				if (taskId) {
					await taskStore.editTask(newTask.value);
					alert("Task updated succesfully!");
					navigateTo("/tasks");
				} else {
					await taskStore.createTask(newTask.value);
					alert("Task created successfully");
					newTask.value = {
						id: 0,
						title: "",
						description: "",
						completed: false,
						creator: currentUser,
						assigns: [],
					};
				}
			} catch (error) {
				alert("Task creation failed");
			}
		};

		return {
			newTask,
			createTask,
		};
	},
});
</script>

<template>
	<form class="container__formulario" @submit.prevent="createTask">
		<h2 class="formulario__titulo">Create a Task:</h2>
		<div class="formulario__campo">
			<label class="campo__etiqueta" for="title">Task Title</label>
			<input
				v-model="newTask.title"
				name="title"
				class="campo__escrita"
				placeholder="Enter the Task Title"
				required
			/>
		</div>

		<div class="formulario__campo">
			<label class="campo__etiqueta" for="description">Description</label>
			<input
				v-model="newTask.description"
				name="description"
				class="campo__escrita"
				placeholder="Enter the Description"
			/>
		</div>

		<button id="submitButton" class="submit-button" type="submit">Submit</button>
	</form>
</template>

<style lang="scss">
.container__formulario {
	padding: 10px;
	border: 2px solid gray;
	margin: 10px;
}
.submit-button {
	display: inline-block;
	margin-top: 1rem;
	padding: 0.5rem 1rem;
	background-color: #3b82f6;
	color: #fff;
	border: none;
	border-radius: 0.375rem;
	cursor: pointer;
	&:hover {
		background-color: #2563eb;
	}
}
</style>
