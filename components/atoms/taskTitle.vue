<template>
	<h4 class="task__list__box__title">{{ title }}</h4>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

export default defineComponent({
	name: "TaskTitle",
	props: {
		title: {
			type: String as PropType<string>,
			required: true,
		},
	},
});
</script>

<style scoped lang="scss">
.task__list__box__title {
	height: 32px;
	color: var(--brand-color-primary-900);
	background-color: var(--auxiliary-color-blue-400);
	text-overflow: ellipsis;

	display: -webkit-box;
	max-width: 400px;
	line-clamp: 2;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>
