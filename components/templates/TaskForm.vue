<script lang="ts">
import { defineComponent, ref } from "vue";
import { useTaskStore } from "~/stores/taskStore";
import { useAlertError } from "~/composables/swalMixins";
import type { TaskAssigns } from "~/types/tasksAssigns";

export default defineComponent({
	name: "TaskForm",
	setup() {
		const taskId = Number(useRoute().params.id);
		const taskStore = useTaskStore();

		const newTask = ref<TaskAssigns>({
			id: 0,
			title: "",
			description: "",
			completed: false,
			creator_id: 0,
			assigned_users: [],
		});

		const createTask = async () => {
			try {
				await taskStore.createTask(newTask.value).then(() => {
					newTask.value = {
						id: 0,
						title: "",
						description: "",
						completed: false,
						creator_id: 0,
						assigned_users: [],
					};
				});
			} catch (error) {
				useAlertError.fire({
					text: "Error occurred while creating your task!",
					title: `${error}`,
				});
			}
		};

		return {
			taskId,
			newTask,
			createTask,
		};
	},
});
</script>

<template>
	<AtomsCenterContainer>
		<form class="formulario" @submit.prevent="createTask">
			<div class="formulario__header">
				<h2 class="formulario__header__titulo">New task!</h2>
				<h2 class="formulario__header__subtitulo">Create a task here</h2>
			</div>
			<div class="formulario__corpo">
				<div class="formulario__corpo__campo">
					<label class="formulario__corpo__campo__etiqueta" for="title">Task Title</label>

					<input
						v-model="newTask.title"
						name="title"
						class="formulario__corpo__campo__input"
						placeholder="Enter the Task Title"
						required
					/>
				</div>

				<div class="formulario__corpo__campo">
					<label class="formulario__corpo__campo__etiqueta" for="description">Description</label>
					<textarea
						v-model="newTask.description"
						name="description"
						class="formulario__corpo__campo__description"
						placeholder="Enter the Description"
					/>
				</div>
			</div>
			<AtomsSubmitButton>Create!</AtomsSubmitButton>
		</form>
	</AtomsCenterContainer>
</template>

<style lang="scss" scoped>
@mixin smallBold() {
	font-size: 12px;
	line-height: 1.33;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.02em;
}
.formulario {
	display: flex;
	flex-direction: column;
	width: 480px;
	background-color: var(--background-darkblue);
	color: var(--text-light);
	padding: 10px;
	border: 2px solid var(--border-dark);
	margin: 10px;

	&__header {
		display: flex;
		align-items: center;
		flex-direction: column;
		width: 100%;

		&__titulo {
			font-size: 24px;
			line-height: 1.25;
			font-weight: 600;
			margin-bottom: 8px;
		}
		&__subtitulo {
			color: var(--text-light-hover);
			font-size: 16px;
			line-height: 1.25;
			font-weight: 400;
		}
	}

	&__corpo {
		margin-top: 20px;
		&__campo {
			margin-bottom: 20px;
			display: flex;
			flex-direction: column;
			flex-grow: 1;
			&__etiqueta {
				@include smallBold;
			}
			&__input,
			&__description {
				border: 3px solid var(--background-darkblue);
				margin-top: 3px;
				border-radius: 0.5rem;
				padding: 6px 10px;
				font-size: 16px;
				line-height: 1.25;
				font-weight: 400;
				transition: 0.15s;
				&:focus {
					outline: none;
					border: 3px solid var(--ds-background-brand-bold-hovered);
					transition: 0.15s;
				}
			}
			&__description {
				height: 6rem;
				resize: none;
			}
		}
	}
}
</style>
