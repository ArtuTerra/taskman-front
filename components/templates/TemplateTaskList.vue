<script lang="ts">
import { defineComponent } from "vue";
import OrganismsTaskList from "~/components/organisms/organismsTaskList.vue";

export default defineComponent({
	name: "TemplatesTaskList",
	components: {
		OrganismsTaskList,
	},
});
</script>

<template>
	<OrganismsTaskList />
</template>

<style scoped lang="scss">
@mixin color-red {
	color: red;
}
</style>
