<script lang="ts">
import { defineComponent } from "vue";

const SIZE_OPTIONS = ["large", "medium", "small"];
const TYPE_OPTIONS = ["purple", "blue", "dark"];

export default defineComponent({
	name: "MoleculesButton",
	props: {
		size: {
			type: String,
			default: "small",
			validator: (value: string) => SIZE_OPTIONS.includes(value),
		},
		types: {
			type: String,
			default: "dark",
			validator: (value: string) => TYPE_OPTIONS.includes(value),
		},
		textSize: {
			type: String,
			default: "extra-small",
		},
		textType: {
			type: String,
			default: "dark",
		},
		text: {
			type: String,
			default: "Button Text",
		},
	},
	emits: ["onclick"],
	setup(_, { emit }) {
		const ButtonClick = () => {
			emit("onclick");
		};

		return {
			ButtonClick,
		};
	},
});
</script>

<template>
	<button class="type-button" :class="[size, types]" @click="ButtonClick">
		<AtomsTaskTitle :size="textSize" :types="textType" :text="text" />
	</button>
</template>

<style scoped lang="scss">
@mixin blue-button() {
	background-color: var(--button-blue);

	&:hover,
	&:focus {
		background: var(--button-blue-hover);
	}
}

@mixin dark-button() {
	background-color: transparent;

	&:hover,
	&:focus {
		background-color: var(--background-dark-highlight);
	}

	&:active {
		background-color: var(--ds-background-neutral-pressed);
	}
}

@mixin purple-button() {
	background-color: var(--ds-background-neutral);
	border: 1px solid var(--brand-color-primary-700);

	&:hover,
	&:focus {
		background-color: var(--background-dark-highlight);
		border: 1px solid var(--brand-color-primary-600);
	}
}

@mixin button() {
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 0.5rem;
	transition-property: background-color, border-color, color;
	transition-duration: 200ms;
	transition-timing-function: ease;
}

@mixin width($width, $lineHeight, $padding: 0) {
	width: $width;
	line-height: $lineHeight;
	padding: $padding;
}

.type-button {
	@include button();

	&.small {
		@include width(5rem, 10px);
	}

	&.medium {
		@include width(50%, 10.4px);
	}

	&.large {
		@include width(100%, 24.7px, 12px 14px);
	}

	&.purple {
		@include purple-button();
	}

	&.dark {
		@include dark-button();
	}

	&.blue {
		@include blue-button();
	}
}
</style>
