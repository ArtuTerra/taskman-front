<template>
	<header @mouseleave="fechar">
		<link
			rel="stylesheet"
			href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
		/>

		<div id="myTopnav" class="topnav" :class="{ 'responsive': test }">
			<a href="#home" class="active">Home</a>
			<a href="#news">News</a>
			<a href="#contact">Contact</a>
			<a href="#about">About</a>
			<a href="javascript:void(0);" class="icon" @click="toggle">
				<i class="fa fa-bars"></i>
			</a>
		</div>
	</header>
</template>

<script>
export default defineComponent({
	name: "TaskAssignedText",
	setup() {
		const test = ref(true);

		const toggle = () => {
			test.value = !test.value;
		};
		const fechar = () => {
			test.value = false;
		};
		onMounted(() => {
			return toggle();
		});

		return {
			fechar,
			toggle,
			test,
		};
	},
});
</script>

<style lang="scss" scoped>
header {
	transition: 6s;
}
/* Add a black background color to the top navigation */
.topnav {
	background-color: #333;
	overflow: hidden;
	transition: background 6s ease-in;
}

/* Style the links inside the navigation bar */
.topnav a {
	float: left;
	display: block;
	color: #f2f2f2;
	text-align: center;
	padding: 14px 16px;
	text-decoration: none;
	font-size: 17px;
}

/* Change the color of links on hover */
.topnav a:hover {
	background-color: #ddd;
	color: black;
}

/* Add an active class to highlight the current page */
.topnav a.active {
	background-color: #04aa6d;
	color: white;
}

/* Hide the link that should open and close the topnav on small screens */
.topnav .icon {
	display: none;
}

/* When the screen is less than 600 pixels wide, hide all links, except for the first one ("Home"). Show the link that contains should open and close the topnav (.icon) */
@media screen and (max-width: 600px) {
	.topnav a:not(:first-child) {
		display: none;
	}
	.topnav a.icon {
		float: right;
		display: block;
	}
}

/* The "responsive" class is added to the topnav with JavaScript when the user clicks on the icon. This class makes the topnav look good on small screens (display the links vertically instead of horizontally) */
@media screen and (max-width: 600px) {
	.topnav.responsive {
		transition: 0.5s;
		position: relative;
	}
	.topnav.responsive a.icon {
		position: absolute;
		right: 0;
		top: 0;
	}
	.topnav.responsive a {
		float: none;
		display: block;
		text-align: left;
	}
}
</style>
