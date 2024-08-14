<script lang="ts">
import { defineComponent } from "vue";

const SIZE_OPTIONS = [
	"extra-large",
	"large",
	"medium",
	"small",
	"extra-small",
	"extra-small-skinny",
	"label",
];

const TYPE_OPTIONS = ["default", "primary", "light", "label"];

const HOVER_OPTIONS = ["hoverOn", ""];

export default defineComponent({
	name: "TaskTitle",
	props: {
		size: {
			type: String,
			default: "large",
			validator: (value: string) => SIZE_OPTIONS.includes(value),
		},
		types: {
			type: String,
			default: "default",
			validator: (value: string) => TYPE_OPTIONS.includes(value),
		},
		text: {
			type: String,
			default: "Title and Paragraph",
		},
		hover: {
			type: String,
			default: "",
			validator: (value: string) => HOVER_OPTIONS.includes(value),
		},
	},
	emits: ["onclick"],
	setup(_, { emit }) {
		const titleOnClick = () => {
			emit("onclick");
		};

		return {
			titleOnClick,
		};
	},
});
</script>

<template>
	<h1 class="type-text" :class="[size, types, hover]" @click="titleOnClick">
		{{ text }}
	</h1>
</template>

<style scoped lang="scss">
@mixin font-size($size, $line-height, $weight) {
	font-size: $size;
	line-height: $line-height;
	font-weight: $weight;
}

.type-text {
	width: auto;
	height: auto;
	display: flex;
	text-align: left;
	padding: 5px;
	transition: color 0.2s;

	&.extra-large {
		@include font-size(1.75rem, 1.8rem, 700);
	}

	&.large {
		@include font-size(1.625rem, 1.6rem, 600);
	}

	&.medium {
		@include font-size(1.5rem, 1.4rem, 600);
	}

	&.small {
		@include font-size(1.375rem, 1.7rem, 600);
	}

	&.extra-small {
		@include font-size(1rem, 1rem, 600);
	}

	&.extra-small-skinny {
		@include font-size(1rem, 1rem, 500);
	}

	&.label {
		@include font-size(0.75rem, 1.33rem, 700);
		text-transform: uppercase;
		letter-spacing: 0.05rem;
	}

	&.default {
		color: var(--text-light);

		&.hoverOn:hover,
		&.hoverOn:focus {
			color: var(--text-light-hover);
		}
	}

	&.primary {
		color: var(--text-lightblue);

		&.hoverOn:hover {
			color: var(--text-lightblue-lightest);
		}
	}

	&.light {
		color: var(--neutral-color-light-300);

		&.hoverOn:hover {
			color: var(--auxiliary-color-blue-300);
		}
	}
}
</style>
