<template>
	<div class="user-assignment">
		<input
			v-model="searchQuery"
			type="text"
			placeholder="Search for a user..."
			class="search-input"
		/>
		<div class="user-list">
			<div v-for="user in filteredUsers" :key="user.id" class="user-item">
				<input v-model="selectedUserIds" type="checkbox" :value="user.id" />
				<label>{{ user.name }}</label>
			</div>
		</div>
		<button type="button" class="submit-button" @click="handleSelect">Assign Users</button>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { useUsersStore } from "~/stores/usersStore";

export default defineComponent({
	name: "UserAdd",
	props: {
		taskId: {
			type: Number,
			required: true,
		},
	},
	emits: ["assign-users"],
	setup(props, { emit }) {
		const userStore = useUsersStore();
		const searchQuery = ref("");
		const selectedUserIds = ref<number[]>([]);

		const searchUsers = async () => {
			try {
				await userStore.getAllUsers();
			} catch (error) {
				alert(`Error fetching users: ${error}`);
			}
		};

		const filteredUsers = computed(() => {
			if (!searchQuery.value.trim()) return [];
			return userStore.users.filter((user) =>
				user.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
			);
		});

		const handleSelect = () => {
			if (selectedUserIds.value.length === 0) {
				alert("Please select at least one user.");
				return;
			}

			emit("assign-users", { taskId: props.taskId, userIds: selectedUserIds.value });
		};

		onMounted(() => {
			searchUsers();
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

<style scoped>
.user-assignment {
	position: relative;
	padding: 1rem;
	border: 1px solid #d1d5db;
	border-radius: 0.375rem;
	background-color: white;
	z-index: 1000;
}

.search-input {
	width: 100%;
	padding: 0.5rem 0.75rem;
	border: 1px solid #d1d5db;
	border-radius: 0.375rem;
	margin-bottom: 1rem;
	&:focus {
		outline: none;
		border-color: #3b82f6;
	}
}

.user-list {
	background-color: azure;
	position: absolute;
	min-width: 150px;
	max-height: 200px;
	overflow-y: auto;
	border: 1px solid #d1d5db;
	border-radius: 0.375rem;
	padding: 0.5px;
}

.user-item {
	display: flex;
	align-items: center;
	margin-bottom: 0.5rem;
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
