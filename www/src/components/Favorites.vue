<template>
	<div class="favorites">
		<div class="container-fluid">
			<hr>
			<div class="row">
				<div class="col-xs-12">
					<h1>Favorites</h1>
				</div>
			</div>
			<div class="row">
				<div v-masonry transition-duration="0.3s" item-selector=".item" class="tattoo">
					<div v-masonry-tile class="item" v-for="item in blocks">
						<card :cardProp="item"></card>
					</div>
				</div>
			</div>
		</div>
	</div>
	</div>
</template>

<script>
	import Card from './Card'
	export default {
		name: 'favorites',
		data() {
			return {
			}
		},
		methods: {

		},
		computed: {
			blocks() {
				return this.$store.state.tattoos
			}
		},
		mounted() {
			this.$store.commit('resetTattoos')
			return this.$store.dispatch('getFavs')
		},
		components: {
			Card
		}
	}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.favorites {
		padding-bottom: 15rem;
	}

	.tattoo {
		width: 90%;
		margin: 0 auto;
	}

	.item {
		margin: 0 1rem 0 1rem;
		width: 45%;
	}
</style>