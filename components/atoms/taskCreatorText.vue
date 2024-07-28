<template>
	<h2 class="task__title">Teste</h2>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
	name: "TaskTitle",
});
</script>

<style scoped lang="scss">
.task__title {
	color: var(--brand-color-primary-900);
}
</style>
