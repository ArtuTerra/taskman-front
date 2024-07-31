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
	<div class="container">
		<form class="container__formulario" @submit.prevent="registerUser">
			<div class="container__formulario__header">
				<h2 class="container__formulario__header__titulo">Register to Taskman</h2>
				<h4 class="container__formulario__header__subtitulo">
					Create your account to get started!
				</h4>
			</div>
			<div class="container__formulario__corpo">
				<div class="container__formulario__corpo__campo">
					<label class="campo__etiqueta" for="uname">Name: </label>
					<input
						v-model="user.name"
						name="uname"
						class="container__formulario__corpo__campo__input"
						placeholder="Enter your name"
						required
					/>
				</div>
				<div class="container__formulario__corpo__campo">
					<label class="campo__etiqueta" for="uemail">Email: </label>
					<input
						v-model="user.email"
						name="uemail"
						class="container__formulario__corpo__campo__input"
						placeholder="Enter your email"
						minlength="8"
						required
					/>
				</div>

				<div class="container__formulario__corpo__campo">
					<label class="campo__etiqueta" for="senha">Password: </label>
					<input
						v-model="user.password"
						type="password"
						class="container__formulario__corpo__campo__input"
						name="psw"
						placeholder="Enter password"
						minlength="8"
						required
					/>
				</div>

				<div class="container__formulario__corpo__campo">
					<label class="campo__etiqueta" for="senha">Password: </label>
					<input
						v-model="user.password_confirmation"
						type="password"
						class="container__formulario__corpo__campo__input"
						name="psw"
						placeholder="Confirm password"
						minlength="8"
						required
					/>
				</div>
			</div>
			<button id="loginButton" class="container__formulario__button" type="submit">Login</button>
		</form>
	</div>
</template>

<style lang="scss" scoped>
.container {
	display: flex;
	justify-content: center;
}
.container__formulario {
	width: 480px;
	padding: 10px;
	margin: 10px;
	color: var(--text-light);
	background-color: var(--background-darkblue);
	border: 2px solid var(--border-dark);
	display: flex;
	flex-direction: column;

	&__corpo {
		margin-top: 20px;
		&__campo {
			margin-bottom: 20px;
			display: flex;
			flex-direction: column;
			flex-grow: 1;
			&__input {
				margin-top: 3px;
				padding: 6px 10px;
				font-size: 16px;
				line-height: 1.25;
				font-weight: 400;
			}
		}
	}

	&__header {
		display: flex;
		align-items: center;
		flex-direction: column;
		width: 100%;

		&__titulo {
			font-size: 24px;
			line-height: 1.25;
			font-weight: 600;
			margin-bottom: 8px;
		}
		&__subtitulo {
			color: var(--text-light-hover);
			font-size: 16px;
			line-height: 1.25;
			font-weight: 400;
		}
	}

	&__button {
		padding: 0px 10px;
		width: 100%;
		height: 40px;
		border-radius: 0.5rem;
		font-size: 16px;
		font-weight: 500;
		transition-property: background-color, border-color, color;
		transition-duration: 100ms;
		transition-timing-function: ease;
		background: var(--text-blue-hover);
		color: var(--brand-color-primary-lightest);
		cursor: pointer;
	}
	&__button:hover {
		background: #0055cc;
		color: var(--brand-color-primary-200);
	}
}
</style>
