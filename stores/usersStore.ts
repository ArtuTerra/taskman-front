import { defineStore } from "pinia";
import { useRuntimeConfig } from "nuxt/app";

const config = useRuntimeConfig();
const baseUrl = `${config.public.apiBaseUrl}`;

export const useUsersStore = defineStore({
	id: "myUserStore",
	state: () => ({
		users: [] as Array<{
			id: number;
			name: string;
			email: string;
		}>,
		loaded: false,
	}),
	actions: {
		async fetchAllUsers() {
			if (!this.loaded) {
				this.loaded = true;
				const authStore = useAuthStore();
				const users = await fetchWrapper.get(`${baseUrl}/api/users`, authStore.returnToken());
				this.users = users;
			}
		},
	},
	getters: {
		getUserNameById: (state) => (id: number | string) => {
			const name = state.users.find((user) => user.id === id)?.name;
			if (name !== undefined) {
				return name;
			} else {
				return "";
			}
		},
	},
});
