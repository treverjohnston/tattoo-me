<template>
	<div class="card">
		<!-- <div class="col-xs-6"> -->
		<div class="well picture">
			<!-- <div class="row"> -->
			<!-- <div class="col-xs-12"> -->
			<div class="row">
				<div v-if="!showButtons">
					<div class="col-xs-2">
						<button @click="show" class="btn show glyphicon glyphicon-chevron-right"></button>
					</div>
				</div>
				<div v-if="showButtons">
					<div class="col-xs-2">
						<button @click="show" class="btn show glyphicon glyphicon-chevron-left"></button>
					</div>
					<div class="col-xs-2">
						<button @click="addToQueue(cardProp)" class="btn glyphicon glyphicon-plus"></button>
					</div>
					<div class="col-xs-2">
						<div v-if="!hasFavorited">
							<button @click="favorite(cardProp)" class="btn glyphicon glyphicon-heart"></button>
						</div>
						<div v-else>
							<button @click="favorite(cardProp)" class="btn glyphicon glyphicon-heart favorited"></button>
						</div>
					</div>
					<div class="col-xs-2">
						<router-link :to="'/mobile'">
							<button @click="zoomIn(cardProp)" class="btn glyphicon glyphicon-resize-full"></button>
						</router-link>
					</div>
					<div class="col-xs-2">
						<router-link :to="'/stripe'">
							<button @click="confirm(cardProp)" class="btn glyphicon money glyphicon-usd"></button>
						</router-link>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-xs-2">
					<div>
						<button v-if="hasLiked" @click="like(cardProp._id)" class="vote btn"><span class="glyphicon glyphicon-thumbs-up liked"></span> {{cardProp.numLikes}}</button>
						<button v-else @click="like(cardProp._id)" class="vote btn"><span class="glyphicon glyphicon-thumbs-up"></span> {{cardProp.numLikes}}</button>
					</div>
				</div>
				<!-- </div> -->
				<!-- </div> -->
			</div>
			<div class="row">
				<div class="col-xs-12">
					<img :src="cardProp.url" alt="image">
				</div>
			</div>
			<div class="row">
				<div class="col-xs-12">
					<div class="artist">
						<router-link :to="`/viewartist/${cardProp.creatorId}`">
							<button class="btn btn-default">
									<h3>Design by:</h3>
									<h3>{{cardProp.artistName}}</h3>
								</button>
						</router-link>
					</div>
				</div>
			</div>
			<!-- </div> -->
		</div>
	</div>
</template>

<script>
	export default {
		name: 'card',
		props: ["cardProp"],
		data() {
			return {
				showButtons: false
			}
		},
		mounted() {
			if (this.showButtons == true) {
				this.showButtons = false
			}
		},
		computed: {
			info() {
				return this.$store.state.userInfo
			},
			hasLiked() {
				return this.cardProp.likes.includes(this.$store.state.userInfo._id)
			},
			hasFavorited() {
				return this.$store.state.userInfo.favorites.includes(this.cardProp._id)
			}
		},

		methods: {
			zoomIn(card) {
				this.$store.commit('zoomIn', card)
			},
			favorite() {
				this.$store.dispatch('favorite', this.cardProp)
			},
			like(id) {
				var obj = {
					id: id
				}
				this.$store.dispatch('like', obj)
			},
			show() {
				this.showButtons = !this.showButtons
			},
			addToQueue(tat) {
				this.$store.commit('addToQueue', tat)
			},
			confirm(card) {
				this.$store.commit('confirm', card)
			}
		}
	}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	a {
		color: black;
	}

	.vote {
		color: black;
	}

	img {
		/* min-height: 15rem; */
		min-width: 20vw;
		/* margin: 0 auto; */
	}

	.btn {
		background-color: transparent;
		font-size: 4rem;
		color: black;
	}

	.liked {
		color: green
	}

	.favorited {
		color: red
	}

	.well {
		/* padding: 0 0 5rem 0; */
		/* max-width: 20%; */
		background-color: rgba(255, 255, 255, .8);
		/* margin: 2rem 1rem 0rem 1rem; */
		/* display: inline-block;
		background: #FEFEFE;
		border: 2px solid #FAFAFA;
		box-shadow: 0 1px 2px rgba(34, 25, 25, 0.4);
		margin: 0 2px 15px;
		-webkit-column-break-inside: avoid;
		-moz-column-break-inside: avoid;
		padding: 15px;
		padding-bottom: 5px;
		background: -webkit-linear-gradient(45deg, #FFF, #F9F9F9);
		opacity: 1;

		-webkit-transition: all .2s ease;
		-moz-transition: all .2s ease;
		-o-transition: all .2s ease;
		transition: all .2s ease; */
	}

	.artist {
		margin-top: 4rem;
	}

	.money {
		color: green;
	}
</style>