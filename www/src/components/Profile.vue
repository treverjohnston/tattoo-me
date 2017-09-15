<template>
	<div class="profile">
		<div v-if="info.accountType == 'regular'">
			<hr>
			<div class="container-fluid">
				<div class="row">
					<div class="col-xs-12">
						<h2>
							{{info.name}}
						</h2>
					</div>
					<div class="col-xs-12">
						<h2>
							{{info.email}}
						</h2>
					</div>
					<div v-show="!info.purchased == undefined">
						<div class="col-xs-12">
							{{info.purchased}}
						</div>
					</div>
					<div class="col-xs-12">
						<button @click="logout()" class="btn btn-default">Logout</button>
					</div>
				</div>
			</div>
		</div>
		<div v-else>
			<div class="container-fluid">
				<div class="row">
					<div v-if="info.url">
						<div class="col-xs-4">
							<img :src="info.url" alt="profile picture">
						</div>
					</div>
					<div v-else>
						<div class="col-xs-4">
							<button class="btn btn-default">
							<h3>Upload an Artist Image</h3>
						</button>
						</div>
					</div>
					<div class="col-xs-6">
						<div class="row">
							<div class="col-xs-4">
								<h2>
									{{info.name}}
								</h2>
							</div>
							<div class="col-xs-4">
								<h2>
									{{info.email}}
								</h2>
							</div>
						</div>
					</div>
					<div class="col-xs-2">
						<button @click="logout()" class="btn btn-default">Logout</button>
					</div>
				</div>
				<hr>
				<div class="row">
					<div class="col-xs-12">
						<h1>My Gallery</h1>
					</div>
				</div>
				<hr>
				<div v-masonry transition-duration="0.3s" item-selector=".item" class="tattoo">
					<div v-masonry-tile class="item" v-for="item in blocks">
						<artistgallery :cardProp="item"></artistgallery>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Artistgallery from './ArtistGallery'
	export default {
		name: 'profile',
		data() {
			return {
			}
		},
		methods: {
			logout() {
				return this.$store.dispatch('logout')
			}
		},
		computed: {
			info() {
				return this.$store.state.userInfo
			},
			blocks() {
				return this.$store.state.tattoos
			}
		},
		components: {
			Artistgallery
		},
		mounted() {
			this.$store.commit('resetTattoos')
			this.$store.dispatch('getArtistGallery')
		}
	}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	h2 {
		color: white;
	}

	h1 {
		color: white;
	}

	button {
		margin-top: 2rem;
	}

	.profile {
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