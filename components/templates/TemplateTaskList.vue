<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "TemplatesTaskList",
});
</script>

<template>
	<div class="main__container">
		<OrganismsTaskList />
	</div>
</template>

<style scoped lang="scss">
.main__container {
	display: flex;
	flex-direction: column;
	align-items: center;
}
</style>
