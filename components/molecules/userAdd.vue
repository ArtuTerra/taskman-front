<template>
	<div class="adduser__container">
		<div class="adduser__container__search">
			<input
				v-model="searchQuery"
				type="text"
				placeholder="Search for a user..."
				class="adduser__container__search__input"
			/>
			<div class="adduser__container__search__list">
				<div v-for="user in filteredUsers" :key="user.id" class="adduser__container__list__item">
					<input
						v-model="selectedUserIds"
						class="adduser__container__list__item__checkbox"
						type="checkbox"
						:value="user.id"
					/>
					<label>{{ user.name }}</label>
				</div>
			</div>
		</div>
		<button
			type="button"
			class="adduser__container__button"
			title="Assign users"
			@click="handleSelect"
		>
			<AtomsTaskAddUserButton color="#FFF" />
		</button>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { useToastError } from "~/composables/swalMixins";
import type { UserInfo } from "~/types/users";
import { useTaskStore } from "~/stores/taskStore";
import { useUsersStore } from "~/stores/usersStore";

export default defineComponent({
	name: "UserAdd",
	props: {
		taskId: {
			type: Number,
			required: true,
		},
		assignedUsers: {
			type: Array,
			default: () => [],
		},
		color: {
			type: String,
			default: "#000000",
		},
	},
	emits: ["assign-users"],
	setup(props, { emit }) {
		const taskStore = useTaskStore();
		const userStore = useUsersStore();
		const searchQuery = ref("");
		const selectedUserIds = ref<number[]>([]);

		const searchUsers = async () => {
			try {
				await userStore.getAllUsers();
				const userData = userStore.users;
				return userData;
			} catch (error) {
				useToastError.fire({
					title: "Error while trying to fetch users!",
				});
			}
		};

		const filteredUsers = computed(() => {
			if (!searchQuery.value.trim()) return [];
			return userStore.users
				.filter((user: UserInfo) =>
					user.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
				)
				.filter(
					(user: UserInfo) =>
						!taskStore.tasks
							.find((task) => task.id === props.taskId)
							?.assigned_users?.some((assigned) => assigned.id === user.id),
				);
		});

		const handleSelect = () => {
			if (selectedUserIds.value.length === 0) {
				useToastError.fire({
					title: "Please select at least 1 user",
				});
				return;
			}

			emit("assign-users", { taskId: props.taskId, userIds: selectedUserIds.value });
		};

		onMounted(() => {
			const userData = searchUsers();
			return userData;
		});

		return {
			searchQuery,
			filteredUsers,
			selectedUserIds,
			handleSelect,
		};
	},
});
</script>

<style lang="scss" scoped>
@keyframes wiggle {
	0% {
		transform: rotate(10deg);
	}
	10% {
		transform: rotate(-10deg);
	}
	20% {
		transform: rotate(10deg);
	}
	30% {
		transform: rotate(-10deg);
	}
	40% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(0deg);
	}
}

.adduser__container {
	display: flex;
	justify-content: space-evenly;
	position: relative;

	&__search {
		margin-bottom: 10px;
		flex: 1;
		&__input {
			width: calc(100% - 2px);
			font-size: medium;
			padding: 0.3rem 0.2rem;
			border: 3px solid #d1d5db;
			border-radius: 0.5rem;

			&:focus {
				outline: none;
				border-color: #3b82f6;
			}
		}
		&__list {
			background-color: azure;
			position: absolute;
			font-size: medium;
			width: calc(100% - 32px);
			max-height: 100px;
			overflow-y: auto;
			z-index: 1;

			&__item {
				border-left: 1px solid #d1d5db;
				border-right: 1px solid #d1d5db;
				line-height: normal;
				display: flex;
				align-items: center;
				&__checkbox {
					margin: 1px 3px;
				}
			}
		}
	}

	&__button {
		svg {
			width: 1rem;
			height: 1rem;
		}
		height: 30px;
		width: 30px;
		padding: 0.35rem 0.35rem;
		background-color: #3b82f6;
		color: #fff;
		border-radius: 1rem;
		animation: none;
		&:hover {
			display: inline-block;
			animation: wiggle 1s;
			background-color: #2563eb;
		}
	}
}
</style>
