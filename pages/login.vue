<script>
import TemplatesLoginForm from "~/components/templates/LoginForm.vue"; // Adjust the import path
export default defineComponent({
	name: "PageLogin",
	components: {
		TemplatesLoginForm,
	},
});
</script>

<template>
	<div id="app">
		<TemplatesLoginForm />
	</div>
</template>
