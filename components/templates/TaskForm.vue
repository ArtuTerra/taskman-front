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
			creator_id: currentUser.id,
			assigned_users: [],
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
						creator_id: currentUser.id,
						assigned_users: [],
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
.submit-button {
	padding: 0px 10px;
	width: 100%;
	height: 40px;
	border-radius: 0.5rem;
	font-size: 16px;
	font-weight: 500;
	transition: 0.15s ease;
	background-color: #3b82f6;
	color: #fff;
	cursor: pointer;
	&:hover {
		background-color: #2563eb;
	}
}
</style>
