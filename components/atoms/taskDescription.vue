<template>
	<p class="task__list__box__description">{{ description }}</p>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

export default defineComponent({
	name: "TaskDescription",
	props: {
		description: {
			type: String as PropType<string>,
			required: true,
		},
	},
});
</script>

<style scoped lang="scss">
.task__list__box__description {
	margin: 5px;
	height: 130px;
	text-wrap: wrap;
	color: var(--text-light);
	overflow: hidden;
	text-overflow: ellipsis;
	color: var(--text-light-hover);
	font-size: 0.85rem;
	line-height: 1.25;
	font-weight: 400;
}
</style>
