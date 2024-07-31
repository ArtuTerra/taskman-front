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
	<div class="header__container">
		<header>
			<h2 class="title">Task<span>man</span></h2>
			<ul v-if="authUser">
				<li><nuxt-link class="header__container__link" to="/">Home</nuxt-link></li>
				<div class="header__container__split" />
				<li><nuxt-link class="header__container__link" to="/tasks">Tasks</nuxt-link></li>
				<div class="header__container__split" />
				<li><nuxt-link class="header__container__link" to="/new">New Task</nuxt-link></li>
				<div class="header__container__split" />
				<li>
					<nuxt-link class="header__container__link" to="/login" @click="logoutUser"
						>Logout</nuxt-link
					>
				</li>
			</ul>
			<ul v-else>
				<li><nuxt-link class="header__container__link" to="/login">Login</nuxt-link></li>
				<div class="header__container__split" />
				<li><nuxt-link class="header__container__link" to="/register">Register</nuxt-link></li>
			</ul>
		</header>
		<div class="mainContent">
			<slot />
		</div>
	</div>
</template>

<style lang="scss" scoped>
header {
	padding: 0.2rem;
	background-color: var(--background-dark);
	border-bottom: 1px solid var(--border-dark);
	display: flex;
	align-content: flex-start;
}
.title {
	font-family: "Comfortaa", sans-serif;
	font-optical-sizing: auto;
	height: 30px;
	width: fit-content;
	background-color: var(--background-light);
	border: 3px;
	border-radius: 10px;
	margin: 5px 2px;
	padding: 3px 10px;
	span {
		padding: 0px 2px;
		background-color: var(--background-blue);
		border-radius: 0.5rem 0px 0.5rem 0px;
		font-family: "Comfortaa", sans-serif;
		font-optical-sizing: auto;
		color: #7e98f5;
	}
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
.header__container__link {
	font-size: 14px;
	font-weight: 500;
	color: rgb(182, 194, 207);
	margin: 5px 20px;
	padding: 8px;
	border-radius: 0.5rem;
	transition-property: background-color, border-color, color;
	transition-duration: 100ms;
	transition-timing-function: ease;
}
.header__container__link:hover {
	color: rgb(159, 173, 188);
	background-color: #a6c5e229;
}

.header__container__split {
	border-left: 2px solid var(--border-dark);
	width: 1px;
	height: 15px;
	align-self: center;
}
</style>
