export default defineNuxtRouteMiddleware((to) => {
	// Check authentication status directly from local storage
	console.log("CHECKING IF UR GOOD");
	const isLoggedIn = !!localStorage.getItem("user");

	const publicPages = ["/login", "/", "/register"];
	const loginPage = ["/login"];
	const authRequired = !publicPages.includes(to.path);

	if (authRequired && !isLoggedIn) {
		// Save the return URL
		console.log("NAH,NOT GOOD, GO LOGIN");
		localStorage.setItem("returnUrl", to.fullPath);
		alert("You must login first!");
		return navigateTo("/login");
	}
	if (isLoggedIn && loginPage.includes(to.path)) {
		console.log("Already logged in! Leaving login page...");
		return navigateTo("/tasks");
	}
	console.log("ok ur good!");
});
