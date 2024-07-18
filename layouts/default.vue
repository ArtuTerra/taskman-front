<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
	name: "LayoutsDefault",
});
</script>
<template>
	<main class="content">
		<OrganismsHeaderNav />
		<slot />
		<OrganismsFooterSection />
	</main>
</template>
<style scoped lang="scss">
.content {
	width: 100%;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
}
</style>
