<script lang="ts" setup>
import { ref, watchEffect, defineProps, defineComponent, withDefaults, onMounted } from "vue";

defineComponent({
	name: "AtomsGetSVG",
});

const props = withDefaults(
	defineProps<{
		name: string;
		filled?: boolean;
		width?: string | number;
		height?: string | number;
		currentColor?: string;
	}>(),
	{
		filled: false,
		width: "24px",
		height: "24px",
		currentColor: "currentColor",
	},
);

const icon = ref<string | Record<string, any>>("");

let hasStroke = false;

async function getIcon() {
	try {
		const iconsImport = import.meta.glob("assets/icons/**/**.svg", {
			as: "raw",
			eager: false,
		});

		const iconPath = `/assets/icons/${props.name}.svg`;

		const rawIcon = await iconsImport[iconPath]();

		if (rawIcon.includes("stroke")) {
			hasStroke = true;
		}
		icon.value = rawIcon;
	} catch {
		// eslint-disable-next-line no-console
		console.error(`[nuxt-icons] Icon '${props.name}' doesn't exist in 'assets/icons'`);
	}
}

onMounted(async () => {
	await getIcon();
});

watchEffect(getIcon);

watchSyncEffect(() => {
	if (props.filled) {
		icon.value = icon.value.replace(/ fill=".*?"/g, ` fill="${props.currentColor}"`);
	}

	if (props.width) {
		icon.value = icon.value.replace(/ width=".*?"/g, ` width="${props.width}"`);
	}

	if (props.height) {
		icon.value = icon.value.replace(/ height=".*?"/g, ` height="${props.height}"`);
	}

	if (hasStroke) {
		icon.value = icon.value.replace(/ stroke=".*?"/g, ` stroke="${props.currentColor}"`);
	}
});
</script>

<template>
	<span class="icon-common" :class="{ 'icon-common--stroke': hasStroke }" v-html="icon" />
</template>

<style lang="scss">
.icon-common {
	display: flex;
	background: none;
	width: v-bind(width);
	height: v-bind(height);
	svg {
		margin-bottom: 0;
		vertical-align: middle;
	}

	&.icon-common--stroke {
		& svg {
			stroke: currentColor !important;
		}
	}
}
</style>
