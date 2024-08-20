<template>
	<h1 class="header__title">Task<span>man</span></h1>
</template>

<style lang="scss" scoped>
.header__title {
	color: black;
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
		background-color: var(--background-darkblue);
		border-radius: 0.5rem 0px 0.5rem 0px;
		font-family: "Comfortaa", sans-serif;
		font-optical-sizing: auto;
		color: #7e98f5;
	}
}
</style>
