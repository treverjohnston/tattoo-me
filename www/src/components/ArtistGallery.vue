<template>
    <div class="artistgallery">
        <div class="col-xs-6">
            <div class="well picture">
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
                            <router-link :to="'/artistmobile'">
                                <button @click="zoomIn(cardProp)" class="btn glyphicon glyphicon-resize-full"></button>
                            </router-link>
                        </div>
                        <div class="col-xs-4">
                            <button v-if="liked" @click="like(cardProp._id)" class="vote btn"><span class="glyphicon glyphicon-thumbs-up liked"></span> {{cardProp.numLikes}}</button>
                            <button v-else @click="like(cardProp._id)" class="vote btn"><span class="glyphicon glyphicon-thumbs-up"></span> {{cardProp.numLikes}}</button>
                        </div>
                        <div class="col-xs-2">
                            <button @click="removeTattoo(cardProp._id)" class="btn glyphicon glyphicon-remove"></button>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-10">
                        <img :src="cardProp.url" alt="image">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'artistgallery',
        props: ["cardProp"],
        data() {
            return {
                showButtons: false
            }
        },
        methods: {
            zoomIn(card) {
                this.$store.commit('zoomIn', card)
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
            removeTattoo(id) {
                this.$store.dispatch('removeTattoo', id)
            }
		},
		computed: {
			liked() {
				return this.cardProp.likes.includes(this.$store.state.userInfo._id)
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
        height: 25rem;
        /* width: 15vw; */
    }

    .picture {
        margin: 5rem 0 0rem 0;
    }

    .btn {
        background-color: transparent;
        font-size: 4rem;
        color: black;
    }

	.liked {
		color: green
	}
    .well{
		padding: 0 0 5em 0;
	}
</style>