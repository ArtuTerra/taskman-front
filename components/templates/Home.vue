<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
	name: "TemplatesHome",
});
</script>

<template>
	<div class="section">
		<h1 class="section__title"><p class="section__title__description"></p></h1>
		<h1 class="section__caption">Hello <span>World</span></h1>
		<h1 class="section__description">Hello <span>World</span></h1>
	</div>
</template>

<style scoped lang="scss">
.section {
	padding: 6rem 1rem;
	&__title {
		@include color-red;
	}
	&__caption {
		color: red;
	}
	&__description {
		@include color-red;
	}
}
</style>
