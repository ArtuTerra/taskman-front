<template>
	<form
		v-if="!authUser"
		class="container__formulario"
		@submit.prevent="loginUser"
	>
		<h2 class="formulario__titulo">Login to continue</h2>
		<div class="formulario__campo">
			<label class="campo__etiqueta" for="uemail">Email: </label>
			<input
				v-model="user.email"
				name="uemail"
				class="campo__escrita"
				placeholder="Enter your email"
				required
			/>
		</div>

		<div class="formulario__campo">
			<label class="campo__etiqueta" for="senha">Password: </label>
			<input
				v-model="user.password"
				type="password"
				class="campo__input"
				name="psw"
				placeholder="Enter password"
				required
			/>
		</div>

		<button id="loginButton" class="button" type="submit">Login</button>
	</form>
	<div v-else>
		<button id="logoutButton" class="button" @click.prevent="logoutUser()">
			LOGOUT
		</button>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useAuthStore } from "~/stores/authStore.js";

export default defineComponent({
	name: "TemplatesLoginForm",
	setup() {
		const user = ref({
			email: "",
			password: "",
		});

		const authStore = useAuthStore();

		const loginUser = async () => {
			try {
				await authStore.login(user.value.email, user.value.password);
			} catch (error) {
				alert("login failed");
			}
		};

		const logoutUser = async () => {
			try {
				await authStore.logout();
			} catch (error) {
				alert("logout failed");
			}
		};
		const authUser = computed(() => authStore.authenticated);

		return {
			user,
			loginUser,
			logoutUser,
			authUser,
		};
	},
});
</script>

<style lang="scss">
.container__formulario {
	padding: 10px;
	border: 2px solid gray;
	margin: 10px;
}
</style>
