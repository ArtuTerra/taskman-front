<template>
	<h6 class="task__list__box__description">{{ description }}</h6>
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
	margin-top: 5px;
	height: 130px;
	max-width: 200;
	text-wrap: wrap;
	color: var(--brand-color-primary-400);
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>
