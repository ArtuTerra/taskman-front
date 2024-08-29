<script lang="ts">
import { defineComponent } from "vue";
import { useAuthStore } from "~/stores/useAuthStore";

export default defineComponent({
	name: "TemplatesLoginForm",
	setup() {
		const isEmailChecked = ref(false);

		const user = ref({
			email: "",
			password: "",
		});

		const passwordInput = ref();
		const emailInput = ref();

		const authStore = useAuthStore();

		const goBack = () => {
			isEmailChecked.value = false;
			setTimeout(() => {
				emailInput.value.focus();
			}, 20);
		};

		const checkEmail = async () => {
			const response = !!(await authStore.login(user.value.email));
			isEmailChecked.value = response;
			if (isEmailChecked.value) {
				setTimeout(() => {
					passwordInput.value.focus();
				}, 20);
			}
		};

		const loginUser = async () => {
			await authStore.login(user.value.email, user.value.password);
		};

		const authUser = computed(() => authStore.authenticated);
		if (authUser.value === true) {
			navigateTo("/");
		}

		return {
			emailInput,
			passwordInput,
			goBack,
			checkEmail,
			isEmailChecked,
			user,
			loginUser,
			authUser,
		};
	},
});
</script>

<template>
	<AtomsCenterContainer>
		<div class="formulario">
			<div class="formulario__top">
				<MoleculesSVGButton
					:class="{ 'hidden': !isEmailChecked, 'reveal': isEmailChecked }"
					button-title="Go back to change email"
					name1="left-arrow-nocircle"
					name2="left-arrow-circle"
					icon-width="30px"
					icon-height="30px"
					:is-filled1="true"
					:is-filled2="true"
					@click.prevent="goBack"
				/>
				<div class="formulario__header">
					<AtomsTaskmanLogo />
					<AtomsTaskTitle
						size="medium"
						type="light"
						text="Login to continue"
						style="text-align: center"
					/>
				</div>
			</div>
			<div class="formulario__corpo">
				<form @submit.prevent="checkEmail">
					<div class="formulario__corpo__campo">
						<AtomsTaskTitle size="label" type="label" text="e-mail:" />
						<input
							ref="emailInput"
							v-model="user.email"
							:disabled="isEmailChecked"
							name="uemail"
							class="formulario__corpo__campo__input"
							placeholder="Enter your email"
							type="email"
							autofocus
							required
						/>
					</div>
					<MoleculesButton
						size="large"
						types="blue"
						text-size="small"
						text-type="light"
						text="Continue"
						:class="{ 'hidden': isEmailChecked, 'reveal': !isEmailChecked }"
					/>
				</form>

				<form
					class="formulario__corpo"
					:class="{ 'hidden': !isEmailChecked, 'reveal': isEmailChecked }"
					@submit.prevent="loginUser"
				>
					<div class="formulario__corpo__campo">
						<AtomsTaskTitle size="label" type="label" text="password:" />
						<input v-model="user.email" name="uemail" type="hidden" />
						<input
							ref="passwordInput"
							v-model="user.password"
							type="password"
							class="formulario__corpo__campo__input"
							name="psw"
							placeholder="Enter password"
							required
						/>
					</div>
					<MoleculesButton
						size="large"
						types="blue"
						text-size="small"
						text-type="light"
						text="Login"
					/>
				</form>
			</div>
		</div>
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

	&__top {
		display: grid;
		grid-template-areas: "icon header .";
		grid-template-columns: 40px auto 40px;
	}

	&__corpo {
		margin-top: 20px;
		opacity: 1;
		position: relative;
		right: 0;
		transition:
			position 0.4s,
			opacity 1s;

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
				letter-spacing: 0.05rem;
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
		grid-area: header;

		&__titulo {
			margin-bottom: 8px;
		}

		&__subtitulo {
			margin-bottom: 10px;
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
		transition-duration: 500ms;
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

.hidden {
	width: 460px;
	opacity: 0;
	position: absolute;
	visibility: hidden;
	left: -30rem;
	transition: 0.5s;
}

.formulario__corpo.hidden {
	top: 3.2rem;
}

.reveal {
	opacity: 1;
	position: relative;
	left: 0rem;
	transition: 0.2s;
}
</style>
