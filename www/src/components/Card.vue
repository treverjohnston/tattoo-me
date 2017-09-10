<template>
    <div class="card">
        <div class="col-xs-4">
            <div class="picture">
                <div class="row">
                    <div class="col-xs-2">
                        <div v-if="!showButtons">
                            <button @click="show" class="btn show glyphicon glyphicon-chevron-down"></button>
                        </div>
                        <div v-if="showButtons">
                            <button @click="show" class="btn show glyphicon glyphicon-chevron-up"></button>
                            <!-- if favorite -->
                            <button @click="addToQueue(cardProp)" class="btn glyphicon glyphicon-plus"></button>
                            <div v-if="!cardProp.favorite">
                                <button @click="addFav(cardProp)" class="btn glyphicon glyphicon-heart"></button>
                            </div>
                            <div v-else>
                                <button @click="deleteFav(cardProp)" class="btn glyphicon glyphicon-remove"></button>
                            </div>
                            <!--  -->
                            <router-link :to="'/mobile'">
                                <button @click="zoomIn(cardProp)" class="btn glyphicon glyphicon-zoom-in"></button>
                            </router-link>
                            <router-link :to="'/purchase'">
                                <button @click="confirm(cardProp)" class="btn">${{cardProp.price}}</button>
                            </router-link>
                            <button @click="like(cardProp._id)" class="vote btn glyphicon glyphicon-thumbs-up"> {{cardProp.numLikes}}</button>
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
        name: 'card',
        props: ["cardProp"],
        data() {
            return {
                showButtons: false
            }
        },
        mounted() {
            if(this.showButtons == true){
                this.showButtons = false
            }
        },
        computed:{

        },

        methods: {
            zoomIn(card) {
                this.$store.dispatch('zoomIn', card)
            },
            confirm(card) {
                this.$store.dispatch('confirm', card)
            },
            addFav(card) {
                this.$store.dispatch('addFav', card)
            },
            deleteFav(card) {
                this.$store.dispatch('deleteFav', card)
            },
            like(id) {
                this.$store.dispatch('like', id)
            },
            show() {
                this.showButtons = !this.showButtons
            },
            addToQueue(tat) {
                this.$store.dispatch('addToQueue', tat)
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
        height: 15rem;
    }

    .picture {
        padding-top: 5rem;
        margin-bottom: 5rem;
    }

    .btn {
        background-color: transparent;
        font-size: 2rem;
        color: black;
    }
</style>