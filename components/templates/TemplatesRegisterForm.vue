<script lang="ts">
import { defineComponent } from "vue";
import { useToastError } from "~/composables/swalMixins";
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
				useToastError.fire({
					title: "Oops!",
					text: `Passwords do not match!`,
				});
			} else {
				await authStore.registerUser(user.value);
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
	<AtomsCenterContainer>
		<form class="formulario" @submit.prevent="registerUser">
			<div class="formulario__header">
				<AtomsTaskTitle
					size="medium"
					type="light"
					text="Register to Taskman"
					style="text-align: center"
				/>
				<AtomsTaskTitle
					size="extra-small-skinny"
					type="default"
					text="Create your account to get started!"
					style="text-align: center"
				/>
			</div>
			<div class="formulario__corpo">
				<div class="formulario__corpo__campo">
					<AtomsTaskTitle size="label" type="label" text="name:" />
					<input
						v-model="user.name"
						name="uname"
						class="formulario__corpo__campo__input"
						placeholder="Enter your name"
						required
					/>
				</div>
				<div class="formulario__corpo__campo">
					<AtomsTaskTitle size="label" type="label" text="e-mail:" />
					<input
						v-model="user.email"
						name="uemail"
						class="formulario__corpo__campo__input"
						placeholder="Enter your email"
						minlength="8"
						required
					/>
				</div>

				<div class="formulario__corpo__campo">
					<AtomsTaskTitle size="label" type="label" text="password:" />
					<input
						v-model="user.password"
						type="password"
						class="formulario__corpo__campo__input"
						name="psw"
						placeholder="Enter password"
						minlength="8"
						required
					/>
				</div>

				<div class="formulario__corpo__campo">
					<AtomsTaskTitle size="label" type="label" text="confirm password:" />
					<input
						v-model="user.password_confirmation"
						type="password"
						class="formulario__corpo__campo__input"
						name="psw"
						placeholder="Confirm password"
						minlength="8"
						required
					/>
				</div>
			</div>
			<MoleculesButton
				size="large"
				types="blue"
				text-size="small"
				text-type="light"
				text="Register"
			/>
		</form>
	</AtomsCenterContainer>
</template>

<style lang="scss" scoped>
.formulario {
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
