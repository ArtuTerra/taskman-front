<script lang="ts">
import { defineComponent } from "vue";
import { useAuthStore } from "~/stores/useAuthStore";

export default defineComponent({
	name: "TemplatesLoginForm",
	setup() {
		const user = ref({
			email: "",
			password: "",
		});

		const authStore = useAuthStore();

		const loginUser = async () => {
			await authStore.login(user.value.email, user.value.password);
		};

		const authUser = computed(() => authStore.authenticated);
		if (authUser.value === true) {
			navigateTo("/");
		}

		return {
			user,
			loginUser,
			authUser,
		};
	},
});
</script>
<template>
	<AtomsCenterContainer>
		<form class="formulario" @submit.prevent="loginUser">
			<div class="formulario__header">
				<h1 class="formulario__header__titulo">Welcome back!</h1>
				<h4 class="formulario__header__subtitulo">We are happy to see you again!</h4>
			</div>
			<div class="formulario__corpo">
				<div class="formulario__corpo__campo">
					<label class="formulario__corpo__campo__etiqueta" for="uemail"><h5>E-MAIL:</h5></label>
					<input
						v-model="user.email"
						name="uemail"
						class="formulario__corpo__campo__input"
						placeholder="Enter your email"
						required
					/>
				</div>

				<div class="formulario__corpo__campo">
					<label class="formulario__corpo__campo__etiqueta" for="senha"><h5>PASSWORD:</h5></label>
					<input
						v-model="user.password"
						type="password"
						class="formulario__corpo__campo__input"
						name="psw"
						placeholder="Enter password"
						required
					/>
				</div>
			</div>
			<AtomsSubmitButton>Login</AtomsSubmitButton>
		</form>
	</AtomsCenterContainer>
</template>

<style lang="scss" scoped>
.formulario {
	display: flex;
	flex-direction: column;
	width: 480px;
	background-color: var(--background-darkblue);
	color: var(--text-light);
	padding: 10px;
	border: 2px solid var(--border-dark);
	margin: 10px;

	&__corpo {
		margin-top: 20px;
		&__campo {
			margin-bottom: 20px;
			display: flex;
			flex-direction: column;
			flex-grow: 1;
			&__etiqueta {
				font-size: 12px;
				line-height: 1.33;
				font-weight: 700;
				text-transform: uppercase;
				letter-spacing: 0.02em;
			}
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
