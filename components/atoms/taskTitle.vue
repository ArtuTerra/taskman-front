<script lang="ts">
import { defineComponent } from "vue";

const SIZE_OPTIONS = ["extra-large", "large", "medium", "small", "extra-small"];
const TYPE_OPTIONS = ["default", "primary", "dark"];

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
			default: "dark",
			validator: (value: string) => TYPE_OPTIONS.includes(value),
		},
		text: {
			type: String,
			default: "Title and Paragraph",
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
	<h1 class="type-text" :class="[size, types]" @click="titleOnClick">
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

	&.default {
		color: var(--text-light);

		&:hover,
		&:focus {
			color: var(--text-light-hover);
		}
	}

	&.primary {
		color: var(--text-lightblue);

		&:hover {
			color: var(--text-lightblue-lightest);
		}
	}

	&.dark {
		color: var(--neutral-color-dark-900);

		&:hover {
			color: var(--text-blue-hover);
		}
	}
}
</style>
