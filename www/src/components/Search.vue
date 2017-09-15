<template>
	<div class="search">
		<div class="container-fluid">
			<hr>
			<div class="row">
				<div class="col-xs-12">
					<form class="form" type="submit" @submit.prevent="search()">
						<input type="text" placeholder="Search" v-model="query">
					</form>
				</div>
			</div>
			<div class="row">
				<!-- <div class="col-xs-12"> -->
					<div v-masonry transition-duration="0.3s" item-selector=".item" class="tattoo">
						<div v-masonry-tile class="item" v-for="item in blocks">
							<searchcard :query="query" :cardProp="item"></searchcard>
						</div>
					</div>
				<!-- </div> -->
			</div>
			<div class="row">
				<div class="col-xs-12">
					<div v-if="!blocks.length > 0">
						<h2>No tattoos</h2>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Searchcard from './SearchCard'
	import $ from 'jquery'
	export default {
		name: 'search',
		data() {
			return {
				query: ''
			}
		},
		mounted() {
			this.$store.commit('resetTattoos')
			// $(window).unbind('scroll')
		},
		beforeDestroy() {
			$(window).unbind('scroll')
		},
		methods: {
			search() {
				this.$store.dispatch('search', { tags: this.query, append: false, cb: this.detectScrolling })
			},
			detectScrolling() {
				let _this = this;
				$(window).unbind('scroll')
				$(window).scroll(() => {
					if ($(window).scrollTop() + $(window).height() >= $(document).height()) {
						_this.$store.dispatch('search', { tags: _this.$store.state.searchTags, page: _this.$store.state.tattoosPage + 1 })
					}
				});
			}
		},
		computed: {
			blocks() {
				return this.$store.state.tattoos
			}
		},
		components: {
			Searchcard
		}
	}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	input[type=text] {
		width: 130px;
		box-sizing: border-box;
		border: 2px solid #ccc;
		border-radius: 4px;
		font-size: 16px;
		background-color: white;
		background-position: 10px 10px;
		background-repeat: no-repeat;
		padding: 12px 20px 12px 40px;
		-webkit-transition: width 0.4s ease-in-out;
		transition: width 0.4s ease-in-out;
	}

	input[type=text]:focus {
		width: 100%;
	}
	.form{
		padding-bottom: 3rem;
	}
	.tattoo {
		width: 90%;
		margin: 0 auto;
	}

	.item {
		margin: 0 1rem 0 1rem;
		width: 45%;
	}

	.search {
		margin-bottom: 20rem;
	}
</style>