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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
});
</script>

<template>
	<span v-html="icon"></span>
</template>

<style>
.icon-common {
	display: flex;
	background: none;
	svg {
		margin-bottom: 0;
		vertical-align: middle;
	}

	&.icon-common--stroke {
		stroke: currentColor !important;
	}
}
</style>
