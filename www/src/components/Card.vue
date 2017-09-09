<template>
    <!-- TODO -->
    <!-- Change card padding eventually -->
    <div class="card">
        <div class="col-xs-4">
            <div class="card main">
                <div class="card-block">
                    <div class="row">
                        <div class="col-xs-12">
                            <img :src="cardProp.url" alt="image">
                        </div>
                    </div>
                    <div class="row">
                        <!--  -->
                        <div v-if="!cardProp.favorite">
                            <div class="col-xs-2">
                                <button @click="addFav(cardProp)" class="btn btn-default glyphicon glyphicon-heart"></button>
                            </div>
                        </div>
                        <!--  -->
                        <div v-else>
                            <div class="col-xs-2">
                                <button @click="deleteFav(cardProp)" class="btn btn-default glyphicon glyphicon-remove"></button>
                            </div>
                        </div>
                        <!--  -->
                        <div class="col-xs-2">
                            <router-link :to="'/mobile'">
                                <button @click="zoomIn(cardProp)" class="btn btn-default glyphicon glyphicon-zoom-in"></button>
                            </router-link>
                        </div>
                        <div class="col-xs-4"><button class="btn btn-default">Buy {{cardProp.price}}</button></div>
                        <div class="col-xs-4">
                            <button @click="upvote(cardProp._id)" class="vote btn btn-default glyphicon glyphicon-thumbs-up"> {{cardProp.likes}}</button>
                        </div>
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

            }
        },
        mounted() {
            // return this.$store.dispatch('getFavs')
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
            upvote(id){
                this.$store.dispatch('upvote', id)
            }

        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .vote {
        color: black;
    }

    img {
        max-height: 15rem;
    }

    .card-block {
        /* border: 1px solid black; */
        height: 15vh;
        width: 20vw;
        
    }
</style>