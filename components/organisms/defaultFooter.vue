<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
	name: "OrganismDefaultFooter",
});
</script>

<template>
	<footer class="footer">
		<h3 class="footer__text">
			<span style="font-style: italic">Taskman</span> - no rights reserved.
		</h3>
	</footer>
</template>

<style lang="scss" scoped>
.footer {
	font-size: 1.17rem;
	width: 100%;
	background-color: var(--background-blue);
	color: var(--text-blue-saturated);
	text-align: center;
	&__text {
		max-height: 3.75rem;
		padding: 1.25rem;
	}
}
</style>
