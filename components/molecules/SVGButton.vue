<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "MoleculesButton",
	props: {
		name1: {
			type: String,
			default: "icon",
		},
		name2: {
			type: String,
			default: "icon",
		},
	},
});
</script>

<template>
	<div>
		<button class="icon" title="icon">
			<AtomsGetSVG class="icon__1" :name="name1" />
			<AtomsGetSVG class="icon__2" :name="name2" />
		</button>
	</div>
</template>

<style lang="scss">
.icon {
	position: relative;
	cursor: pointer;

	&__1 {
		position: absolute;
		z-index: 1;
		opacity: 1;
	}

	&__2 {
		z-index: 2;
		opacity: 0;
	}

	&:hover & {
		&__1 {
			color: red;
			z-index: 1;
			opacity: 0;
			transition: 0.5s;
		}
		&__2 {
			z-index: 3;
			opacity: 1;
			transition: 0.5s;
		}
	}
}
</style>
