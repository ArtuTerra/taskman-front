<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "MoleculesButton",
	props: {
		buttonTitle: {
			type: String,
			default: "button",
		},
		name1: {
			type: String,
			default: "icon",
		},
		name2: {
			type: String,
			default: "icon",
		},
		isFilled1: {
			type: Boolean,
			default: false,
		},
		isFilled2: {
			type: Boolean,
			default: false,
		},
		iconWidth: {
			type: String || Number,
			default: "24px",
		},
		iconHeight: {
			type: String || Number,
			default: "24px",
		},
		color1: {
			type: String,
			default: "currentColor",
		},
		color2: {
			type: String,
			default: "currentColor",
		},
		buttonType: {
			type: String,
			default: "button",
		},
	},
});
</script>

<template>
	<button :title="buttonTitle" class="icon">
		<AtomsGetSVG
			class="icon__1"
			:name="name1"
			:width="iconWidth"
			:height="iconHeight"
			:filled="isFilled1"
			:current-color="color1"
		/>
		<AtomsGetSVG
			class="icon__2"
			:name="name2"
			:width="iconWidth"
			:height="iconHeight"
			:filled="isFilled2"
			:current-color="color2"
		/>
	</button>
</template>

<style lang="scss">
.icon {
	position: relative;
	cursor: pointer;
	color: currentColor;

	&__1 {
		position: absolute;
		opacity: 1;
	}

	&__2 {
		opacity: 0;
	}

	&:hover & {
		&__1 {
			opacity: 0;
			transition-property: opacity;
			transition-duration: 150ms;
			transition-timing-function: ease;
		}
		&__2 {
			opacity: 1;
			transition-property: opacity;
			transition-duration: 150ms;
			transition-timing-function: ease;
		}
	}
}
</style>
