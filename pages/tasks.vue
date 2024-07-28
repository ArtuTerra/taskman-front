<script>
import OrganismsTaskList from "~/components/organisms/organismsTaskList.vue";
export default defineComponent({
	name: "PageTaskList",
	components: {
		OrganismsTaskList,
	},
	middleware: ["auth"],
});
</script>

<template>
	<body>
		<OrganismsTaskList />
	</body>
</template>
