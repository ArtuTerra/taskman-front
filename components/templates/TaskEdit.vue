<script lang="ts">
import { defineComponent, ref } from "vue";
import { useTaskStore } from "~/stores/taskStore";
import { useAlertSuccess, useAlertError, useToastError } from "~/composables/swalMixins";
import type { TaskAssigns } from "~/types/tasksAssigns";

export default defineComponent({
	name: "TaskEdit",
	setup() {
		const taskId = Number(useRoute().params.id);
		const taskStore = useTaskStore();
		const removingUserIds = ref<number[]>([]);

		const newTask = ref<TaskAssigns>({
			id: 0,
			title: "",
			description: "",
			completed: false,
			creator_id: 0,
			assigned_users: [],
		});

		const callFetchTasks = async () => {
			if (taskId) {
				const result = taskStore.getTaskById(Number(taskId));
				if (result) {
					newTask.value = result;
				} else {
					await taskStore.fetchTasks();
					const fetchedTask = taskStore.getTaskById(Number(taskId));
					if (fetchedTask) {
						newTask.value = fetchedTask;
						taskStore.fetchTasks();
						return;
					}
					useAlertError.fire({
						text: "Task was not found!",
					});
					navigateTo("/tasks");
				}
			}
		};

		onMounted(async () => {
			await callFetchTasks();
		});

		const editTask = async () => {
			try {
				await taskStore.fetchEditTask(newTask.value);
				useAlertSuccess.fire({
					title: "Success!",
					text: "Task edited successfully!",
				});
				navigateTo("/tasks");
			} catch (error) {
				useAlertError.fire({
					text: "Error occurred while creating your task!",
					title: `${error}`,
				});
			}
		};

		const assignedUsers = computed(() => {
			if (!newTask.value.assigned_users) return [];
			return newTask.value.assigned_users;
		});

		const handleAssignUsers = async ({
			taskId,
			userIds,
		}: {
			taskId: number;
			userIds: number[];
		}) => {
			await taskStore.fetchAssignUsersToTask({ taskId, userIds });
			await callFetchTasks();
		};

		const handleRemoveUsers = async (taskId: number, userIds: number[]) => {
			if (userIds.length === 0) {
				useToastError.fire({
					title: "Please select at least 1 user",
				});
				return;
			}
			await taskStore
				.fetchRemoveUsersFromTask({ taskId, userIds })
				.then(async () => await callFetchTasks());
			removingUserIds.value = [];
		};

		return {
			handleRemoveUsers,
			handleAssignUsers,
			assignedUsers,
			taskId,
			newTask,
			editTask,
			removingUserIds,
		};
	},
});
</script>

<template>
	<AtomsCenterContainer>
		<form class="formulario" @submit.prevent="editTask">
			<div class="formulario__header">
				<h2 class="formulario__header__titulo">Edit task</h2>
			</div>
			<div class="formulario__corpo">
				<div class="formulario__corpo__campo">
					<AtomsTaskTitle size="label" type="label" text="Task Title:" />
					<input
						v-model="newTask.title"
						name="title"
						class="formulario__corpo__campo__input"
						placeholder="Enter the Task Title"
						required
					/>
				</div>

				<div class="formulario__corpo__campo">
					<AtomsTaskTitle size="label" type="label" text="Description:" />
					<textarea
						v-model="newTask.description"
						name="description"
						class="formulario__corpo__campo__description"
						placeholder="Enter the Description"
					/>
				</div>

				<div v-if="assignedUsers.length" class="formulario__corpo__assigns">
					<AtomsTaskTitle size="label" type="label" text="Assigned users:" />
					<div
						v-for="user in assignedUsers"
						:key="user.id"
						class="formulario__corpo__assigns__list"
					>
						<AtomsTaskTitle size="extra-small" type="default" :text="user.name" />
						<input
							v-model="removingUserIds"
							class="formulario__corpo__assigns__list__checkbox"
							type="checkbox"
							:value="user.id"
						/>
					</div>
					<MoleculesButton
						:disabled="!!!removingUserIds.length"
						type="button"
						:class="{ 'fade': !removingUserIds.length, 'reveal': removingUserIds.length }"
						size="medium"
						types="purple"
						text-size="extra-small"
						text-type="light"
						text="Remove Assigned User(s)"
						@click="handleRemoveUsers(taskId, removingUserIds)"
					/>
				</div>
				<AtomsTaskTitle size="label" type="label" text="Add User(s):" />
				<OrganismsUserAdd
					:task-id="taskId"
					:assigned-users="newTask.assigned_users"
					@assign-users="handleAssignUsers"
				/>
			</div>
			<AtomsTaskDivider />
			<MoleculesButton
				size="large"
				types="blue"
				text-size="small"
				text-type="light"
				text="Edit task"
			/>
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
.task__divider {
	margin: 10px 0px;
}
.fade {
	opacity: 50%;
}
.reveal {
	opacity: 100%;
}
.assigns-vazio {
	@include smallBold();
	padding: 5px;
	color: var(--brand-color-primary-400);
}
.formulario {
	width: 480px;
	background-color: var(--background-darkblue);
	color: var(--text-light);
	padding: 10px;
	border: 2px solid var(--border-dark);

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
				min-height: 8rem;
				resize: none;
				field-sizing: content;
			}
		}
		&__assigns {
			padding: 2px;
			border-radius: 0.5rem;
			background-color: var(--ds-background-neutral);
			margin-bottom: 10px;
			&__titulo {
				@include smallBold;
				margin-left: 5px;
			}
			&__list {
				margin: 3px;
				padding: 3px;
				border-radius: 0.2rem;
				background-color: var(--background-dark-highlight);
				display: flex;
				&__name {
					padding: 2px 0px;
					margin: 2px 0px;
					flex: 9;
				}
				&__checkbox {
					opacity: 0;
					border: 3px solid blue;
					flex: 1;
					transition: 0.5s;
				}
				&:hover &__checkbox {
					opacity: 1;
					transition: 0.5s;
				}
				&__checkbox:checked {
					opacity: 1;
				}
			}
		}
	}

	&__button {
		padding: 0px 10px;
		width: 100%;
		height: 40px;
		border-radius: 0.5rem;
		font-size: 16px;
		font-weight: 500;
		transition-property: background-color, border-color, color;
		transition-duration: 100ms;
		transition-timing-function: ease;
		background: var(--text-blue-hover);
		color: var(--brand-color-primary-lightest);
		cursor: pointer;
	}
	&__button:hover {
		background: #0055cc;
		color: var(--brand-color-primary-200);
	}
}
</style>
