<template>
	<div class="home">
		<div class="container-fluid">
			<hr>
			<div class="row">
				<div class="col-xs-offset-4 col-xs-4">
					<div v-if="sortType">
						<button @click="sort" class="btn btn-default">Viewing Newest Designs</button>
					</div>
					<div v-else>
						<button @click="sort" class="btn btn-default">Viewing Most Popular Designs</button>
					</div>
				</div>
			</div>
			<div class="row">
				<div>
					 <!-- v-if="sortType"> -->
					<div v-for="card in activeCards">
						<card :sortType="sortType" :cardProp="card"></card>
					</div>
				</div>
				<!-- <div v-else>
					<div v-for="card in activeCardsLikes">
						<card :sortType="sortType" :cardProp="card"></card>
					</div>
				</div> -->
			</div>
		</div>
	</div>
</template>

<script>
	import Card from './Card'
	import $ from 'jquery'
	export default {
		name: 'home',
		data() {
			return {
			}
		},
		methods: {
			sort() {
				this.$store.dispatch('sort')
			},
			compareLikes(a, b) {
				return b.numLikes - a.numLikes
			},
			compareDate(a, b) {
				return b.created - a.created
			},
			detectScrolling() {
				let _this = this;
				$(window).unbind('scroll')
				$(window).scroll(function () {
					if ($(window).scrollTop() + $(window).height() >= $(document).height()) {
						_this.$store.dispatch('getTattoos', { page: _this.$store.state.activeCardsPage + 1 })
					}
				});
			}
		},
		computed: {
			activeCards() {
				return this.$store.state.activeCards//.sort(this.compareDate)
			},
			activeCardsLikes() {
				return this.$store.state.activeCards.sort(this.compareLikes)
			},
			sortType() {
				return this.$store.state.sortType
			}
		},
		mounted() {
			this.$store.dispatch('getTattoos', { append: false, cb: this.detectScrolling })
		},
		components: {
			Card
		}
	}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.home {
		padding-bottom: 10rem;
	}

	.btn {
		background-color: transparent;
		font-size: 2rem;
		color: black;
	}
</style>