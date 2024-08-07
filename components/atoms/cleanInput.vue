<template>
	<input class="clean-input" type="text" value="{{ text }}" />
</template>

<script lang="ts" setup></script>

<style>
.clean-input {
	border-color: var(--border-dark);
	border-width: 0px;
	padding-left: 0px;
	padding-bottom: 6px;
	padding-right: 10px;
	padding-top: 6px;
	border-bottom-width: 1px;
	border-bottom-style: solid;
	background-color: var(--ds-background-neutral);
	width: 100%;
	height: 36px;
	font-size: 16px;
	line-height: 1.25;
	font-weight: 400;
	max-width: 100%;
	margin: 0px;
	box-sizing: border-box;
}
</style>
