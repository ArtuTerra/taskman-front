<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
	name: "OrganismDefaultHeader",
	setup() {
		const authStore = useAuthStore();
		const authUser = computed(() => authStore.authenticated);
		const userName = computed(() => authStore.user?.name);

		const logoutUser = async () => {
			await authStore.logout();
		};

		const test = ref(true);

		const toggle = () => {
			test.value = !test.value;
		};

		const fechar = () => {
			test.value = false;
		};

		onMounted(() => {
			return toggle();
		});

		return { toggle, fechar, test, authUser, logoutUser, userName };
	},
});
</script>

<template>
	<header class="header">
		<h2 class="header__title">Task<span>man</span></h2>
		<button type="button" href="javascript:void(0);" class="header__menu" @click="toggle">
			Menu
			<svg height="20" width="20" class="header__menu__icon">
				<polyline points="16 8 10 14 4 8"></polyline>
			</svg>
		</button>
		<div class="header__left" :class="{ 'responsive': test }" @mouseleave="fechar">
			<div v-if="authUser" class="header__left__list">
				<nuxt-link class="header__left__list__link" to="/"> Home </nuxt-link>
				<nuxt-link class="header__left__list__link" to="/tasks">Tasks</nuxt-link>
				<nuxt-link class="header__left__list__link" to="/new"> New Task </nuxt-link>
				<nuxt-link class="header__left__list__link" to="/login" @click="logoutUser">
					Logout
				</nuxt-link>
			</div>
			<div v-else class="header__left__list" @mouseleave="fechar">
				<nuxt-link class="header__left__list__link" to="/login">Login</nuxt-link>
				<nuxt-link class="header__left__list__link" to="/register">Register</nuxt-link>
			</div>
		</div>
		<div class="header__middle" />
		<div class="header__right">
			<div v-if="authUser" class="header__right__user">
				<div class="header__right__user__welcome">Welcome:</div>
				<span class="header__right__user__name">
					{{ userName }}
				</span>
			</div>
		</div>
	</header>
	<div class="mainContent">
		<slot />
	</div>
</template>

<style lang="scss" scoped>
@mixin fontLink {
	font-size: 0.875rem;
	font-weight: 500;
	color: rgb(182, 194, 207);
}
@mixin formatLink {
	margin: 0.3125rem 1.25rem;
	padding: 0.5rem;
	border-radius: 0.5rem;
	&:hover {
		color: rgb(159, 173, 188);
		background-color: var(--background-dark-highlight);
		transition:
			color 0.2s,
			background-color 0.2s;
	}
	&:active {
		background-color: var(--ds-background-neutral-pressed);
		color: var(--ds-background-selected-bold);
		transition:
			color 0s,
			background-color 0s;
	}
}
.mainContent {
	min-height: calc(100vh - 106px);
	background-color: var(--background-dark);
}
.header {
	height: 2.875rem;
	padding: 0px 0.5rem;
	background-color: var(--background-dark);
	border-bottom: 1px solid var(--border-dark);
	display: flex;
	&__title {
		font-size: 1.5rem;
		align-self: center;
		font-family: "Comfortaa", sans-serif;
		font-optical-sizing: auto;
		height: 1.875rem;
		width: fit-content;
		background-color: var(--background-light);
		border-radius: 0.5rem;
		margin: 0.125rem 0.3125rem 0.125rem 0.625rem;
		padding: 0.1875rem 0.625rem;
		span {
			padding: 0px 0.125rem;
			background-color: var(--background-blue);
			border-radius: 0.5rem 0px 0.5rem 0px;
			font-family: "Comfortaa", sans-serif;
			font-optical-sizing: auto;
			color: #7e98f5;
		}
	}
	&__menu {
		@include fontLink();
		@include formatLink();
		display: none;
		&__icon {
			align-self: center;
			stroke: var(--text-light);
			stroke-linecap: round;
			stroke-width: 0.1rem;
			border-radius: 0.1rem;
			fill: none;
			transition:
				background 0.4s,
				stroke-dashoffset 0.6s,
				0.2s;
		}
		&:hover &__icon {
			stroke: var(--text-lightblue);
			stroke-dasharray: 20;
			stroke-dashoffset: 40px;
			transition: 0.2s ease-in;
		}
		&:active &__icon {
			stroke: var(--ds-background-selected-bold);
			transition: 0.1s;
		}
	}
	&__left {
		align-self: center;
		&__list {
			&__link {
				@include fontLink();
				@include formatLink();
			}
			&__split {
				border-left: 2px solid var(--border-dark);
				width: 1px;
				height: 15px;
				align-self: center;
			}
		}
	}
	&__middle {
		flex: 1;
	}
	&__right {
		width: fit-content;
		min-width: 140px;
		align-content: center;
		&__user {
			height: 1.875rem;
			margin-right: 0.3125rem;
			padding: 0.125rem 0.625rem;
			background-color: var(--ds-background-neutral-subtle-hovered);
			border-radius: 0.5rem;
			&__welcome {
				color: var(--text-light);
				font-size: 0.75rem;
			}
			&__name {
				display: block;
				text-align: center;
				color: var(--text-lightblue);
				font-weight: 600;
				text-wrap: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				max-width: 20rem;
			}
		}
	}
}

@media only screen and (max-width: 59.375rem) {
	.header {
		&__menu {
			z-index: 1;
			display: flex;
			align-items: center;
		}
		&__middle {
			flex-grow: 3;
		}
		&__left {
			transform: scale(0);
			display: flex;
			position: relative;
			justify-content: space-evenly;
			left: -3.75rem;
			transition: 0.2s;
			&__list {
				display: flex;
				flex-direction: column;
				border-top-left-radius: 20rem;
				border-top-right-radius: 20rem;
				border-bottom-right-radius: 0.5rem;
				border-bottom-left-radius: 0.5rem;
				background-color: var(--background-blue);
				position: absolute;
				font-size: medium;
				z-index: 0;
				opacity: 0;
				transition:
					opacity 0.3s,
					padding 0.5s,
					margin 0.5s;
				&__link {
					opacity: 0;
					font-size: 0px;
					max-height: 0px;
					transition:
						font-size 1s,
						padding 1s,
						margin 1s;
				}
			}

			&.responsive {
				transform: scale(1);
				transition: 0.2s ease-in-out;
				align-self: self-end;
				& .header__left__list {
					border-top-left-radius: 0rem;
					border-top-right-radius: 0rem;
					height: fit-content;
					transition: 0.1s;
					opacity: 1;
					max-height: none;
					& .header__left__list__link {
						@include formatLink();
						opacity: 1;
						font-size: 0.875rem;
						transition: 0.2s;
						padding: 1rem 2rem;
						margin: 0.5rem;
						max-height: none;
						background-color: var(--border-dark);
					}
				}
			}
		}
	}
}
</style>
