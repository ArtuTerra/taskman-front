import { defineStore } from "pinia";
import { useRuntimeConfig } from "nuxt/app";
import {
	useToastSuccess,
	useAlertError,
	useAlertSuccess,
	useToast,
} from "~/composables/swalMixins";
import { fetchWrapper } from "~/composables/fetchWrapper";
import type { UserInfo } from "~/types/users";

const config = useRuntimeConfig();
const baseUrl = `${config.public.apiBaseUrl}`;

interface UserToken {
	id: number;
	name: string;
	email: string;
	access_token: string;
	expires_in: number;
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
		returnToken() {
			this.checkAndSetToken();
			return this.user?.access_token;
		},

		checkAndSetToken() {
			const localStore = JSON.parse(localStorage.getItem("user") || "null");
			if (!!localStore && this.user === localStore) {
				return;
			}
			this.user = localStore;
			this.authenticated = true;
		},

		async verifyEmail(email: string) {
			const response = await fetchWrapper.post(`${baseUrl}/api/login`, {
				email,
			});
			return response;
		},

		async login(email: string, password: string) {
			try {
				const response: UserToken = await fetchWrapper.post(`${baseUrl}/api/login`, {
					email,
					password,
				});

				const currentTime = Math.floor(Date.now() / 1000);

				this.user = response;
				this.user.expires_in += currentTime;
				localStorage.setItem("user", JSON.stringify(this.user));
				this.authenticated = true;

				this.returnUrl = localStorage.getItem("returnUrl") || "/tasks";
				localStorage.removeItem("returnUrl");

				useToastSuccess.fire({
					title: "Login successful!",
					text: "You are now logged in!",
				});

				navigateTo(this.returnUrl, { redirectCode: 200 });
			} catch (error) {
				useAlertError.fire({
					title: "Login Failed!",
					text: `Check your login details and try again!`,
				});
			}
		},

		async registerUser(user: UserRegister) {
			try {
				await fetchWrapper.post(`${baseUrl}/api/register`, {
					...user,
				});

				useAlertSuccess.fire({
					title: "Register Successful!",
					text: "Account has been created!",
				});
				navigateTo(this.returnUrl, { redirectCode: 200 });
			} catch (error) {
				useAlertError.fire({
					title: "Oops!",
					text: `Error occurred while creating your account! ${error}`,
				});
			}
		},

		async me() {
			const response = await fetchWrapper.get(`${baseUrl}/api/me`, this.returnToken());
			const data: UserInfo = await response.user;
			return data;
		},

		async logout(skipFetch?: boolean) {
			try {
				if (!skipFetch) {
					await fetchWrapper.post(`${baseUrl}/api/logout`, {}, this.returnToken());
				}
			} catch (error) {
				useToast.fire({
					title: "Logging out",
					text: "Please log in to continue",
				});
			} finally {
				this.user = null;
				this.authenticated = false;
				localStorage.clear();
				useToastSuccess.fire({
					title: "Logout successful!",
					text: "See you soon!",
				});
				navigateTo("/login");
			}
		},
	},
});
