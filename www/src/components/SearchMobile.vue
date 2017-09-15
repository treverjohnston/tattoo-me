<template>
	<div class="mobile">
		<div class="container-fluid">
			<hr>
			<div class="row">
				<div v-if="!card.favorite">
					<div class="col-xs-2">
						<router-link :to="'/search'">
							<button class="btn glyphicon glyphicon-menu-left"></button>
						</router-link>
					</div>
				</div>
				<div v-else>
					<div class="col-xs-2">
						<router-link :to="'/favorites'">
							<button class="btn glyphicon glyphicon-menu-left"></button>
						</router-link>
					</div>
				</div>
				<div v-if="!card.favorite">
					<div class="col-xs-offset-5 col-xs-4">
						<div v-if="!hasFavorited">
							<button @click="favorite(card)" class="btn glyphicon glyphicon-heart"></button>
							<router-link :to="'/stripe'">
                                <button @click="confirm(card)" class="btn glyphicon money glyphicon-usd"></button>
                            </router-link>
							<a href="//instagram.com" target="_blank"><button class="btn glyphicon glyphicon-share"></button></a>
						</div>
						<div v-else>
							<button @click="favorite(card)" class="btn glyphicon glyphicon-heart favorited"></button>
							<router-link :to="'/stripe'">
                                <button @click="confirm(card)" class="btn glyphicon money glyphicon-usd"></button>
                            </router-link>
							<a href="//instagram.com" target="_blank"><button class="btn glyphicon glyphicon-share"></button></a>
						</div>
					</div>
				</div>
				<div v-else>
					<div class="col-xs-offset-5 col-xs-4">
						<button @click="deleteFav(card)" class="btn glyphicon glyphicon-remove"></button>
						<router-link :to="'/stripe'">
							<button @click="confirm(card)" class="btn glyphicon money glyphicon-usd"></button>
						</router-link>
						<a href="//instagram.com" target="_blank"><button class="btn glyphicon glyphicon-share"></button></a>
					</div>
				</div>
			</div>
			<hr>
			<div class="row">
				<div class="col-xs-12">
					<div class="picture">
						<img :src="card.url" alt="image">
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-xs-12">
					<div class="tags">
						<div v-for="tag in card.tags">
							<h4>{{tag.name}}</h4>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'mobile',
		data() {
			return {

			}
		},
		computed: {
			card() {
				return this.$store.state.mobileView
			},
			hasFavorited() {
				if (!this.$store.state.userInfo.favorites)
					return false;
				return this.$store.state.userInfo.favorites.includes(this.card._id)
			}
		},
		components: {
		},
		methods: {
			favorite(card) {
				this.$store.dispatch('favorite', card)
			},
			addFav(card) {
				this.$store.dispatch('addFav', card)
			},
			deleteFav(card) {
				this.$store.dispatch('deleteFav', card)
			},
			confirm(card) {
				this.$store.commit('confirm', card)
			},
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.picture {
		margin-top: 10vh;
	}

	a {
		color: black;
	}

	img {
		height: 40vh
	}

	.btn {
		background-color: transparent;
		font-size: 5em;
	}

	.liked {
		color: green
	}

	.favorited {
		color: red
	}
</style>