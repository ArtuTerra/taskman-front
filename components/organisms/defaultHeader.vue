<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
	name: "OrganismDefaultHeader",
});
</script>

<template>
	<div>
		<header>
			<ul>
				<li><nuxt-link to="/">Home</nuxt-link></li>
				<li><nuxt-link to="/about">About</nuxt-link></li>
				<li><nuxt-link to="/login">Login</nuxt-link></li>
				<li><nuxt-link to="/noauth/tasklist">All Tasks</nuxt-link></li>
			</ul>
		</header>
		<div class="mainContent">
			<slot />
		</div>
	</div>
</template>

<style lang="scss" scoped>
ul {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: flex-start;
}
li {
	margin: 5px 20px;
}
</style>
