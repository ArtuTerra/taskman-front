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
				<li><img src="~/assets/images/taskman.svg" /></li>
				<li><nuxt-link to="/">Home</nuxt-link></li>
				<li><nuxt-link to="/about">About</nuxt-link></li>
				<li><nuxt-link to="/login">Login</nuxt-link></li>
				<li><nuxt-link to="/tasks">All Tasks</nuxt-link></li>
				<li><nuxt-link to="/new">New Task</nuxt-link></li>
			</ul>
		</header>
		<div class="mainContent">
			<slot />
		</div>
	</div>
</template>

<style lang="scss" scoped>
img {
	width: 200px;
}
ul {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-around;
}
li {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	align-self: center;
	justify-content: space-around;
}
a {
	margin: 5px 20px;
	padding: 8px;
	border-radius: 20px;
	border: 3px solid var(--auxiliary-color-blue-700);
}
</style>
