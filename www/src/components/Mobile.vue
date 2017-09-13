<template>
    <div class="mobile">
        <div class="container-fluid">
            <hr>
            <div class="row">
                <div v-if="!card.favorite">
                    <div class="col-xs-2">
                        <router-link :to="'/home'">
                            <button class="btn glyphicon glyphicon-menu-left"></button>
                        </router-link>
                    </div>
                </div>
                <div v-else>
                    <div class="col-xs-2">
                        <router-link :to="'/favorites'">
                            <button class="btn glyphicon glyphicon-menu-left"></button>
                        </router-link>
                    </div>
                </div>
                <div v-if="!card.favorite">
                    <div class="col-xs-offset-7 col-xs-2">
                        <div v-if="!hasFavorited">
                            <button @click="favorite(card)" class="btn glyphicon glyphicon-heart"></button>
                            <router-link :to="'/purchase'">
                                <button @click="confirm(card)" class="btn glyphicon glyphicon-usd"></button>
                            </router-link>
                        </div>
                        <div v-else>
                            <button @click="favorite(card)" class="btn glyphicon glyphicon-heart favorited"></button>
                            <router-link :to="'/purchase'">
                                <button @click="confirm(card)" class="btn glyphicon glyphicon-usd"></button>
                            </router-link>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div class="col-xs-offset-7 col-xs-2">
                        <button @click="deleteFav(card)" class="btn glyphicon glyphicon-remove"></button>
                        <router-link :to="'/purchasefav'">
                            <button @click="confirm(card)" class="btn glyphicon glyphicon-usd"></button>
                        </router-link>
                    </div>
                </div>
            </div>
            <hr>
            <div class="row">
                <div class="col-xs-12">
                    <div class="picture">
                        <img :src="card.url" alt="image">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <div class="tags">
                        <div v-for="tag in card.tags">
                            <h4>{{tag}}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'mobile',
        data() {
            return {

            }
        },
        computed: {
            card() {
                return this.$store.state.mobileView
            },
            hasFavorited() {
                return this.$store.state.userInfo.favorites.includes(this.card._id)
            }
        },
        components: {
        },
        methods: {
            favorite(card) {
                this.$store.dispatch('favorite', card)
            },
            addFav(card) {
                this.$store.dispatch('addFav', card)
            },
            deleteFav(card) {
                this.$store.dispatch('deleteFav', card)
            },
            confirm(card) {
                this.$store.commit('confirm', card)
            },
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .picture {
        margin-top: 10vh;
    }

    a {
        color: black;
    }

    img {
        height: 40vh
    }

    .btn {
        background-color: transparent;
        font-size: 3rem;
    }

    .liked {
        color: green
    }

    .favorited {
        color: red
    }
</style>