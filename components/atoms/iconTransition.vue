<template>
	<div class="icon">
		<slot></slot>
	</div>
</template>

<script lang="ts" setup></script>

<style lang="scss">
.icon {
	position: relative;
	margin: 5px;
	padding: 1px;
	width: 20px;
	height: 20px;
	cursor: pointer;
	align-items: center;
	justify-content: center;

	&__1,
	&__2 {
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		transition-property: opacity;
		transition-duration: 150ms;
		transition-timing-function: ease;
	}

	&__1 {
		fill: var(--brand-color-primary-700);
		z-index: 1;
		opacity: 1;
	}

	&__2 {
		fill: var(--brand-color-secondary-700);
		z-index: 2;
		opacity: 0;
	}

	&:hover .task__edit__button {
		&__1 {
			z-index: 1;
			opacity: 0;
			transition: 0.2s;
		}
		&__2 {
			z-index: 3;
			opacity: 1;
			transition: 0.2s;
		}
	}
}
</style>
