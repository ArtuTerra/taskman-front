import { defineStore } from "pinia";
import { useRuntimeConfig } from "nuxt/app";
import { fetchWrapper } from "~/composables/fetchWrapper";
import type { UserInfo } from "~/types/users";

const config = useRuntimeConfig();
const baseUrl = `${config.public.apiBaseUrl}`;

interface UserToken {
	id: number;
	name: string;
	email: string;
	access_token: string;
}

interface UserRegister {
	name: string;
	email: string;
	password: string;
	password_confirmation: string;
}

interface AuthState {
	user: UserToken | null;
	returnUrl: string | null;
	authenticated: boolean;
}

export const useAuthStore = defineStore("useAuthStore", {
	state: (): AuthState => ({
		user: JSON.parse(localStorage.getItem("user") || "null"),
		returnUrl: null,
		authenticated: !!localStorage.getItem("user"),
	}),
	actions: {
		async login(email: string, password: string) {
			const response: UserToken = await fetchWrapper.post(`${baseUrl}/api/login`, {
				email,
				password,
			});

			this.user = response;

			localStorage.setItem("user", JSON.stringify(response));
			this.authenticated = true;
			this.returnUrl = localStorage.getItem("returnUrl") || "/tasks";
			localStorage.removeItem("returnUrl");
			alert("Login successful!");
			navigateTo(this.returnUrl, { redirectCode: 200 });
		},

		async registerUser(user: UserRegister) {
			const response: UserToken = await fetchWrapper.post(`${baseUrl}/api/register`, {
				...user,
			});

			this.user = response;
			this.authenticated = true;
			localStorage.setItem("user", JSON.stringify(response));
			this.returnUrl = localStorage.getItem("returnUrl") || "/tasks";
			localStorage.removeItem("returnUrl");
			alert("Login successful!");
			navigateTo(this.returnUrl, { redirectCode: 200 });
		},

		async me() {
			const response = await fetchWrapper.get(`${baseUrl}/api/me`);
			const data: UserInfo = await response.value;
			return data;
		},

		async logout() {
			try {
				await fetchWrapper.post(`${baseUrl}/api/logout`, {}, this.user?.access_token);
			} catch (error) {
				alert(`Logout failed, data will be cleared anyway. Error: ${error}`);
			} finally {
				this.user = null;
				this.authenticated = false;
				localStorage.removeItem("user");
				localStorage.removeItem("returnUrl");
				alert("logout done!");
				navigateTo("/login");
			}
		},
	},
});
