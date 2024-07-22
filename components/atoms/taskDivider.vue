<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
	name: "TaskDivider",
});
</script>

<template>
	<hr class="task__divider" />
</template>

<style scoped lang="scss">
.task__divider {
	width: 100%;
	border: 1px solid var(--neutral-color-light-1000); // (--neutral-color-dark-1000)
	border-radius: 50px;
}
</style>
