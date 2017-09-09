<template>
    <div class="artistgallery">
        <div class="col-xs-4">
            <div class="picture">
                <div class="row">
                    <div class="col-xs-2">
                        <div v-if="!showButtons">
                            <button @click="show" class="btn show glyphicon glyphicon-chevron-down"></button>
                        </div>
                        <div v-if="showButtons">
                            <button @click="show" class="btn show glyphicon glyphicon-chevron-up"></button>
                            <router-link :to="'/artistmobile'">
                                <button @click="zoomIn(cardProp)" class="btn glyphicon glyphicon-zoom-in"></button>
                            </router-link>
                            <button @click="upvote(cardProp)" class="vote btn glyphicon glyphicon-thumbs-up"> {{cardProp.numLikes}}</button>
                        </div>
                    </div>
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
        mounted() {
        },

        methods: {
            zoomIn(card) {
                // console.log('trying', card)
                this.$store.dispatch('zoomIn', card)
            },
            addFav(card) {
                this.$store.dispatch('addFav', card)
            },
            deleteFav(card) {
                this.$store.dispatch('deleteFav', card)
            },
            upvote(card) {
                this.$store.dispatch('upvote', card)
            },
            show() {
                this.showButtons = !this.showButtons
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
        max-height: 15rem;
    }

    .picture {
        padding-top: 5rem;
        margin-bottom: 5rem;
    }

    .btn {
        background-color: transparent;
        font-size: 2rem;
    }
</style>