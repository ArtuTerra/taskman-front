import { useRuntimeConfig } from "nuxt/app";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("authStore", {
	state: () => ({
		token: "",
		user: [],
		authenticated: false,
	}),
	actions: {
		initialize() {
			if (typeof localStorage.getItem("access_token") === "undefined") {
				navigateTo("/login");
			}
		},

		async refreshToken() {
			const config = useRuntimeConfig();
			try {
				const token = localStorage.getItem("access_token");
				if (!token) {
					throw new Error("No token found");
				}

				const response = await fetch(
					`${config.public.apiBaseUrl}/api/refresh`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"Accept": "application/json",
							"Authorization": `Bearer ${token}`,
						},
					},
				);

				if (response.status === 401) {
					this.logout();
					navigateTo("/login", { redirectCode: 401 });
					throw new Error("Token expired");
				}

				if (!response.ok) {
					navigateTo("/login", { redirectCode: 400 });
					throw new Error("Failed to refresh token");
				}

				const data = await response.json();
				this.token = data.access_token;
				localStorage.setItem("access_token", this.token);
				this.authenticated = true;
			} catch (error) {
				this.logout();
				navigateTo("/login");
			}
		},

		async login(email: string, password: string) {
			const config = useRuntimeConfig();
			try {
				const response = await fetch(`${config.public.apiBaseUrl}/api/login`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"Accept": "application/json",
					},
					// credentials: "include",
					body: JSON.stringify({ email, password }),
				});

				if (!response.ok) {
					throw new Error("login failed");
				}

				const data = await response.json();
				this.token = data.access_token;
				localStorage.setItem("access_token", this.token);
				this.authenticated = true;
				this.user = data.info;
				console.log("this user: ", this.user);
				alert("Login successful!");
				// navigateTo("/", { redirectCode: 200 });
			} catch (error) {
				console.error("Login failed", error);
			}
		},

		async logout() {
			const config = useRuntimeConfig();
			await fetch(`${config.public.apiBaseUrl}/api/logout`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json",
					"Authorization": `Bearer ${this.token}`,
				},
			});
			this.token = "";
			this.authenticated = false;
			this.user = [];
			localStorage.removeItem("access_token");
			alert("Logout Successful!");
		},

		async me() {
			const config = useRuntimeConfig();
			try {
				const response = await fetch(`${config.public.apiBaseUrl}/api/me`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"Accept": "application/json",
						"Authorization": `Bearer ${this.token}`,
					},
				});

				if (!response.ok) {
					throw new Error("login failed");
				}

				const data = await response.json();
				const userName = data.name;
				const userEmail = data.email;
				const userId = data.id;
				return { userName, userEmail, userId };
			} catch (error) {
				alert("Login failed!");
			}
		},

		getAuthHeader() {
			return { Authorization: `Bearer ${this.token}` };
		},
	},
});
