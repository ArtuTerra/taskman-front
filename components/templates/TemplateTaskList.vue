<script lang="ts">
import { defineComponent } from "vue";
import OrganismsTaskList from "~/components/organisms/organismsTaskList.vue"; // Adjust the import path

export default defineComponent({
	name: "TemplatesTaskList",
	components: {
		OrganismsTaskList,
	},
});
</script>

<template>
	// exibindo tarefas em uma lista
	<OrganismsTaskList />
</template>

<style scoped lang="scss">
@mixin color-red {
	color: red;
}

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
