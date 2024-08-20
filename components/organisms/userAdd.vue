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
				await userStore.fetchAllUsers();
				const userData = userStore.users;
				return userData;
			} catch (error) {
				useToastError.fire({
					title: "Error while trying to fetch users!",
					text: `${error}`,
				});
			}
		};

		const clearQuery = () => {
			searchQuery.value = "";
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

			emit("assign-users", {
				taskId: props.taskId,
				userIds: selectedUserIds.value,
			});
			selectedUserIds.value = [];
		};

		function handleClickOutside(event: any) {
			const container = document.querySelector("#container");
			if (container && !container.contains(event.target)) {
				clearQuery();
			}
		}

		onBeforeUnmount(() => {
			document.removeEventListener("click", handleClickOutside);
		});

		onMounted(() => {
			const userData = searchUsers();
			document.addEventListener("click", handleClickOutside);
			return userData;
		});

		return {
			clearQuery,
			searchQuery,
			filteredUsers,
			selectedUserIds,
			handleSelect,
		};
	},
});
</script>

<template>
	<div class="adduser__container">
		<div class="adduser__container__search">
			<input
				v-model="searchQuery"
				type="text"
				placeholder="Search for a user..."
				class="adduser__container__search__input"
			/>
			<div
				class="adduser__container__search__list"
				:class="{ 'hidden': !searchQuery.trim(), 'reveal': searchQuery.trim() }"
				@mouseleave="clearQuery"
			>
				<div
					v-for="user in filteredUsers"
					:key="user.id"
					class="adduser__container__search__list__item"
				>
					<input
						v-model="selectedUserIds"
						class="adduser__container__search__list__item__checkbox"
						type="checkbox"
						:value="user.id"
					/>
					<label>{{ user.name }}</label>
				</div>
			</div>
		</div>
		<MoleculesSVGButton
			type="button"
			name1="plus-full"
			name2="plus-empty"
			icon-height="2.1875rem"
			icon-width="2.1875rem"
			:is-filled1="true"
			:is-filled2="true"
			color1="#d7d7d790"
			color2="#2299ff"
			@click="handleSelect"
		/>
	</div>
</template>

<style lang="scss" scoped>
.adduser__container {
	margin-top: 0.4rem;
	display: flex;
	justify-content: space-evenly;
	position: relative;

	&__search {
		flex: 1;

		&__input {
			width: calc(100% - 5px);
			font-size: 1rem;
			padding: 0.3rem 0.2rem;
			border: 3px solid #d1d5db;
			border-radius: 0.5rem;

			&:focus {
				outline: none;
				border-color: #3b82f6;
			}
		}
		&__list {
			border-radius: 0.5rem;
			background-color: azure;
			position: absolute;
			font-size: 1rem;
			width: calc(100% - 2.5rem);
			max-height: 100px;
			overflow-y: auto;
			z-index: 1;

			&__item {
				border-left: 1px solid #d1d5db;
				border-right: 1px solid #d1d5db;
				line-height: normal;
				display: flex;
				align-items: center;

				& label {
					overflow: hidden;
					text-wrap: nowrap;
					text-overflow: ellipsis;
				}
				&__checkbox {
					margin: 1px 3px;
				}
			}
		}
	}
}
.hidden {
	opacity: 0;
	position: absolute;
	visibility: hidden;
	top: 0;
}
.formulario__corpo.hidden {
	top: 2.1875rem;
}
.reveal {
	opacity: 1;
	position: absolute;
	top: 2.5rem;
	transition: 0.2s;
}
</style>
