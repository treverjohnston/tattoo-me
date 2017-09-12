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
					<div v-for="card in tattoos">
						<Card :query="query" :cardProp="card"></Card>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-xs-12">
					<div v-if="!tattoos.length > 0">
						<h2>No tattoos</h2>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Card from './Card'
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
			tattoos() {
				return this.$store.state.tattoos
			}
		},
		components: {
			Card
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

	.res {
		padding-top: 2rem;
	}

	.search {
		margin-bottom: 20rem;
	}
</style>