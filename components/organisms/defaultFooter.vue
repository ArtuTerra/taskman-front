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
	background-color: rgb(0, 162, 255);
	color: rgb(0, 17, 255);
	text-align: center;
	&__text {
		max-height: 60px;
		padding: 20px;
	}
}
</style>
