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
		async getAllUsers() {
			if (this.loaded) return Promise.reject;

			const authStore = useAuthStore();
			const users = await fetchWrapper.get(`${baseUrl}/api/users`, authStore.user?.access_token);
			this.users = users;
			this.loaded = true;
		},
	},
});
