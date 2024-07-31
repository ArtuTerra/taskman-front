<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
	name: "LayoutsDefault",
});
</script>
<template>
	<main class="content">
		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" />
		<link
			href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
			rel="stylesheet"
		/>
		<OrganismsDefaultHeader />
		<slot />
		<OrganismsDefaultFooter />
	</main>
</template>
<style scoped lang="scss"></style>
