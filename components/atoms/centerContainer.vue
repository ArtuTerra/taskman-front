<template>
	<div class="container">
		<slot />
	</div>
</template>

<style lang="scss">
.container {
	display: flex;
	justify-content: center;
	padding-top: 10rem;
	@media screen and (max-height: 900px) {
		padding-top: 5%;
	}
}
</style>
