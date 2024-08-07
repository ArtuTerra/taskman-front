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
	padding: 5px;
	font-size: 1rem;
	height: 2.625rem;
	width: 180px;
	font-weight: 600;
	color: var(--text-lightblue-lightest);
	text-overflow: ellipsis;

	max-width: 85%;
	display: -webkit-box;
	line-clamp: 2;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>
