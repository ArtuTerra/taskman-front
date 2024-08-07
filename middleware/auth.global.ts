import { useRuntimeConfig } from "nuxt/app";
import { useAlertError } from "~/composables/swalMixins";

export default defineNuxtRouteMiddleware((to) => {
	const isLoggedIn = !!localStorage.getItem("user");

	const publicPages = ["/login", "/", "/register"];
	const loginPage = ["/login"];
	const authRequired = !publicPages.includes(to.path);

	if (isLoggedIn) {
		const localStore = JSON.parse(localStorage.getItem("user") || "null");
		const currentTimeMinutes = Math.floor(Date.now() / (1000 * 60));

		if (localStore.expires_in !== null && localStore.expires_in - currentTimeMinutes < 5) {
			useAlertError.fire({
				title: "Refreshing data!",
				text: `Doing a refresh: ${localStore.expires_in - currentTimeMinutes}}`,
			});
			async function refresh() {
				try {
					const config = useRuntimeConfig();
					const options = {
						method: "POST",
						headers: {
							Accept: "application/json",
							Authorization: `Bearer ${localStore.access_token}`,
						},
					};
					const response = await fetch(`${config.public.apiBaseUrl}/api/refresh`, options);
					const data = await response.json();

					data.expires_in += currentTimeMinutes;
					localStorage.setItem("user", JSON.stringify(data));
				} catch (error) {
					useAlertError.fire({
						title: `Failed to refresh token: ${error}`,
						text: "Please login to continue",
					});
					localStorage.clear();
					return navigateTo("/login");
				}
			}
			refresh();
		}
	}

	if (authRequired && !isLoggedIn) {
		localStorage.setItem("returnUrl", to.fullPath);
		useAlertError.fire({
			title: "You need login first!",
			text: "Login to continue",
		});
		return navigateTo("/login");
	}

	if (isLoggedIn && loginPage.includes(to.path)) {
		return navigateTo("/tasks");
	}
});
