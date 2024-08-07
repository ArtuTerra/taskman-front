<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
	name: "LayoutsDefault",
});
</script>
<template>
	<article>
		<OrganismsDefaultHeader>
			<slot />
		</OrganismsDefaultHeader>
		<OrganismsDefaultFooter />
	</article>
</template>
<style scoped lang="scss"></style>
