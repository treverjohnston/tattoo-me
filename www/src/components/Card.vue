<template>
	<div class="card">
		<md-whiteframe md-elevation="24">
			<div @click="zoomIn(cardProp)" class="well picture">
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
						<div v-if="settingCamera">
							<div class="col-xs-2">
								<router-link :to="`camera`">
									<button @click="addToQueue(cardProp)" class="btn glyphicon glyphicon-plus"></button>
								</router-link>
							</div>
						</div>
						<div v-else>
							<div class="col-xs-2">
								<button @click="addToQueue(cardProp)" class="btn glyphicon glyphicon-plus"></button>
							</div>
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
							<md-button v-if="hasLiked" @click="like(cardProp._id)" class="vote btn"><span class="glyphicon glyphicon-thumbs-up liked"></span> {{cardProp.numLikes}}</md-button>
							<md-button v-else @click="like(cardProp._id)" class="vote btn"><span class="glyphicon glyphicon-thumbs-up"></span> {{cardProp.numLikes}}</md-button>
						</div>
					</div>
				</div>
				<router-link :to="'/mobile'">
					<div class="row">
						<div class="col-xs-12">
							<img :src="cardProp.url" alt="image">
						</div>
					</div>
					<div class="row">
						<div class="col-xs-12">
							<div class="artist">
								<md-ink-ripple />
								<router-link :to="`/viewartist/${cardProp.creatorId}`">
									<md-button class="btn btn-default">
										<h3>Design by:</h3>
										<h3>{{cardProp.artistName}}</h3>
									</md-button>
								</router-link>
							</div>
						</div>
					</div>
				</router-link>
			</div>
		</md-whiteframe>
	</div>
</template>

<script>
	import router from '../router'

	export default {
		name: 'card',
		props: ["cardProp"],
		data() {
			return {
				vertical: 'top',
				horizontal: 'center',
				duration: 4000,
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
				if (!this.$store.state.userInfo._id)
					return false;
				return this.cardProp.likes.includes(this.$store.state.userInfo._id)
			},
			hasFavorited() {
				if (!this.$store.state.userInfo.favorites)
					return false;
				return this.$store.state.userInfo.favorites.includes(this.cardProp._id)
			},
			settingCamera() {
				return this.$store.state.settingCamera
			}
		},

		methods: {
			setCamera() {
				this.$store.commit('setCameraFalse')
			},
			zoomIn(card) {
				this.$store.commit('zoomIn', card)
			},
			favorite() {
				if (this.signedIn()) {
					if (router.currentRoute.name == "Favorites")
						this.show()
					this.$store.dispatch('favorite', this.cardProp)
				}
			},
			like(id) {
				if (this.signedIn()) {
					var obj = {
						id: id
					}
					this.$store.dispatch('like', obj)
				}
			},
			show() {
				this.showButtons = !this.showButtons
				if (this.showButtons) {
					if (this.$store.state.cardOpenOptions)
						this.$store.state.cardOpenOptions.showButtons = false;
					this.$store.state.cardOpenOptions = this;
				} else if (this.$store.state.cardOpenOptions == this)
					this.$store.state.cardOpenOptions = null;
			},
			addToQueue(tat) {
				if (this.settingCamera) {
					this.$store.commit('addToQueue', tat)
					this.$store.commit('setCameraFalse')
				} else {
					this.$store.commit('setCameraFalse')
					this.$store.commit('addToQueue', tat)
					swal({
						title: 'Design added to your queue!',
						text: 'Check out the camera to see it on you!',
						timer: 1000
					}).then(
						function () { },
						// handling the promise rejection
						function (dismiss) {
							if (dismiss === 'timer') {
								console.log('I was closed by the timer')
							}
						}
						)
				}

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
		min-width: 20vw;
	}

	.btn {
		background-color: transparent;
		font-size: 5rem;
		color: black;
	}

	.liked {
		color: green
	}

	.favorited {
		color: red
	}

	.well {
		background-color: rgba(255, 255, 255, .8);
	}

	.artist {
		margin-top: 4rem;
	}

	.money {
		color: green;
	}
</style>