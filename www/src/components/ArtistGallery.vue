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
                            <button @click="like(cardProp._id)" class="vote btn glyphicon glyphicon-thumbs-up"> {{cardProp.numLikes}}</button>
                            <button @click="removeTattoo(cardProp._id)" class="btn glyphicon glyphicon-remove"></button>
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
                this.$store.dispatch('zoomIn', card)
            },
            addFav(card) {
                this.$store.dispatch('addFav', card)
            },
            deleteFav(card) {
                this.$store.dispatch('deleteFav', card)
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
            removeTattoo(id){
                this.$store.dispatch('removeTattoo', id)
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
        margin: 5rem 0 5rem 0;
    }

    .btn {
        background-color: transparent;
        font-size: 4rem;
        color: black;
    }
</style>