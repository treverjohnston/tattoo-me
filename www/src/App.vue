<template>
	<div id="app">
		<div v-if="this.$route.path == '/camera' || this.$route.path == '/'">
		</div>
		<div v-else>
			<logo></logo>
		</div>
		<router-view></router-view>
		<div v-if="this.$route.path == '/camera'">
		</div>
		<div v-else>
			<navbar></navbar>
		</div>
	</div>
</template>

<script>
	import Navbar from './Components/Navbar'
	import Logo from './Components/Logo'
	import Stripe from './Components/Stripe'

	export default {
		name: 'app',
		components: {
			Navbar,
			Logo,
			Stripe
		},
		beforeCreate() {
			this.$store.commit('setDefaultState')
		},
		mounted() {
			this.$store.dispatch('getAuth')
			console.log('path', this.$route.path)
		}
	}

</script>

<style>
	.md-tab-header-container{
		font-size: 4rem;
		text-transform: none;
	}
	.md-icon {
		font-size: 10rem;
		margin-left: 3rem;
	}

	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		/* margin-top: 60px; */
	}

	body {
		background-color: rgb(128, 140, 163);
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		/* padding-bottom: 80% */
	}

	.glyphicon-usd {
		color: green
	}
</style>