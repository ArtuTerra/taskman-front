<script lang="ts">
import { defineComponent } from "vue";
import { useAuthStore } from "~/stores/useAuthStore";

export default defineComponent({
	name: "TemplatesRegisterForm",
	setup() {
		const user = ref({
			name: "",
			email: "",
			password: "",
			password_confirmation: "",
		});

		const authStore = useAuthStore();

		const registerUser = async () => {
			if (user.value.password !== user.value.password_confirmation) {
				alert("Passwords do not match!");
			} else {
				try {
					await authStore.registerUser(user.value);
				} catch (error) {
					alert(`Register failed! ${error}`);
				}
			}
		};

		const authUser = computed(() => authStore.authenticated);

		return {
			user,
			registerUser,
			authUser,
		};
	},
});
</script>
<template>
	<form v-if="!authUser" class="container__formulario" @submit.prevent="registerUser">
		<h2 class="formulario__titulo">Register to Taskman</h2>
		<div class="formulario__campo">
			<label class="campo__etiqueta" for="uname">Name: </label>
			<input
				v-model="user.name"
				name="uname"
				class="campo__escrita"
				placeholder="Enter your name"
				required
			/>
		</div>
		<div class="formulario__campo">
			<label class="campo__etiqueta" for="uemail">Email: </label>
			<input
				v-model="user.email"
				name="uemail"
				class="campo__escrita"
				placeholder="Enter your email"
				minlength="8"
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
				minlength="8"
				required
			/>
		</div>

		<div class="formulario__campo">
			<label class="campo__etiqueta" for="senha">Password: </label>
			<input
				v-model="user.password_confirmation"
				type="password"
				class="campo__input"
				name="psw"
				placeholder="Confirm password"
				minlength="8"
				required
			/>
		</div>

		<button id="loginButton" class="button" type="submit">Login</button>
	</form>
	<div v-else>
		<button id="logoutButton" class="button">ALREADY LOGGED IN</button>
	</div>
</template>

<style lang="scss">
.container__formulario {
	padding: 10px;
	border: 2px solid gray;
	margin: 10px;
}
</style>
