<template>
	<button id="submitButton" class="submit-button" type="submit">
		<slot></slot>
	</button>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.submit-button {
	padding: 0px 10px;
	width: 100%;
	height: 40px;
	border-radius: 0.5rem;
	font-size: 16px;
	font-weight: 500;
	transition-property: background-color, border-color, color;
	transition-duration: 100ms;
	transition-timing-function: ease;
	background-color: var(--text-blue-hover);
	color: var(--brand-color-primary-lightest);
	cursor: pointer;
}
.submit-button:hover {
	background: #0055cc;
	color: var(--brand-color-primary-200);
}
</style>
