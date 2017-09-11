<template>
	<div class="search">
		<div class="container-fluid">
			<hr>
			<div class="row">
				<div class="col-xs-12">
					<form type="submit" @submit.prevent="search()">
						<input type="text" placeholder="Search" v-model="query">
					</form>
				</div>
			</div>
			<div class="row">
				<div class="res">
					<div v-for="card in results">
						<cardsearch :query="query" :cardProp="card"></cardsearch>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-xs-12">
					<div v-if="!results.length > 0">
						<h2>No Results</h2>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Card from './Card'
	import Cardsearch from './CardSearch'
	import $ from 'jquery'
	export default {
		name: 'search',
		data() {
			return {
				query: ''
			}
		},
		mounted() {
			$(window).unbind('scroll')
		},
		methods: {
			search() {
				this.$store.dispatch('search', { tags: this.query, append: false, cb: this.detectScrolling })
			},
			detectScrolling() {
				console.log('search detect scrolling')
				let _this = this;
				$(window).unbind('scroll')
				$(window).scroll(function () {
					if ($(window).scrollTop() + $(window).height() >= $(document).height()) {
						_this.$store.dispatch('search', { tags: _this.$store.state.searchTags, page: _this.$store.state.resultsPage + 1 })
					}
				});
			}
		},
		computed: {
			results() {
				return this.$store.state.results
			}
		},
		components: {
			Card,
			Cardsearch
		}
	}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.home {
		background-color: gray;
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		padding-bottom: 100vh;
	}

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

	.res {
		padding-top: 2rem;
	}
</style>