<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
	name: "OrganismDefaultHeader",
	setup() {
		const authStore = useAuthStore();
		const authUser = computed(() => authStore.authenticated);

		const logoutUser = async () => {
			try {
				await authStore.logout();
			} catch (error) {
				alert("logout failed");
			}
		};

		return { authUser, logoutUser };
	},
});
</script>

<template>
	<div>
		<header>
			<img src="~/assets/images/taskman.svg" />
			<ul>
				<li v-if="authUser"><nuxt-link to="/">Home</nuxt-link></li>
				<li v-if="authUser"><nuxt-link to="/tasks">Tasks</nuxt-link></li>
				<li v-if="authUser"><nuxt-link to="/new">New Task</nuxt-link></li>
				<li v-if="authUser"><nuxt-link to="/login" @click="logoutUser">Logout</nuxt-link></li>
				<li v-if="!authUser"><nuxt-link to="/login">Login</nuxt-link></li>
				<li v-if="!authUser"><nuxt-link to="/register">Register</nuxt-link></li>
			</ul>
		</header>
		<div class="mainContent">
			<slot />
		</div>
	</div>
</template>

<style lang="scss" scoped>
header {
	display: flex;
	align-content: flex-start;
}
img {
	width: 200px;
}
ul {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-around;
}
li {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	align-self: center;
	justify-content: space-around;
}
a {
	margin: 5px 20px;
	padding: 8px;
	border-radius: 20px;
	border: 3px solid var(--auxiliary-color-blue-700);
}
</style>
