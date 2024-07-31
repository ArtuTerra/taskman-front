<template>
	<div class="user-add">
		<div class="input-list-container">
			<input
				v-model="searchQuery"
				type="text"
				placeholder="Search for a user..."
				class="search-input"
			/>
			<div class="user-list">
				<div v-for="user in filteredUsers" :key="user.id" class="user-item">
					<input v-model="selectedUserIds" class="user-checkbox" type="checkbox" :value="user.id" />
					<label>{{ user.name }}</label>
				</div>
			</div>
		</div>
		<button type="button" class="submit-button" title="Assign users" @click="handleSelect">
			<svg
				fill="#000000"
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				viewBox="0 0 45.402 45.402"
				xml:space="preserve"
			>
				<g>
					<path
						d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141
		c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27
		c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435
		c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z"
					/>
				</g>
			</svg>
		</button>
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

@mixin search-input-width {
	width: 9.2rem;
}

.user-add {
	display: flex;
	justify-content: space-evenly;
	position: relative;
}

.search-input {
	@include search-input-width;
	font-size: medium;
	padding: 0.3rem 0.2rem;
	margin-right: 0.1rem;
	border: 1px solid #d1d5db;

	&:focus {
		outline: none;
		border-color: #3b82f6;
	}
}

.user-list {
	background-color: azure;
	border-bottom: 1px solid #d1d5db;
	position: absolute;
	font-size: medium;
	@include search-input-width;
	max-height: 100px;
	overflow-y: auto;
	z-index: 1;
}

.user-item {
	border-left: 1px solid #d1d5db;
	border-right: 1px solid #d1d5db;
	line-height: normal;
	display: flex;
	align-items: center;
}

.user-checkbox {
	margin: 1px 3px;
}

.submit-button {
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
</style>
