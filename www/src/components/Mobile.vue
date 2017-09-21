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
                    <div class="col-xs-offset-4 col-xs-6">
                        <div v-if="!hasFavorited">
                            <button @click="favorite(card)" class="btn glyphicon glyphicon-heart"></button>
                            <router-link :to="'/stripe'">
                                <button @click="confirm(card)" class="btn glyphicon money glyphicon-usd"></button>
                            </router-link>
                            <a href="//instagram.com" target="_blank"><button class="btn glyphicon glyphicon-share"></button></a>
                        </div>
                        <div v-else>
                            <button @click="favorite(card)" class="btn glyphicon glyphicon-heart favorited"></button>
                            <router-link :to="'/stripe'">
                                <button @click="confirm(card)" class="btn glyphicon money glyphicon-usd"></button>
                            </router-link>
                            <a href="//instagram.com" target="_blank"><button class="btn glyphicon glyphicon-share"></button></a>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div class="col-xs-offset-4 col-xs-6">
                        <button @click="deleteFav(card)" class="btn glyphicon glyphicon-remove"></button>
                        <router-link :to="'/stripe'">
                            <button @click="confirm(card)" class="btn glyphicon money glyphicon-usd"></button>
                        </router-link>
                        <a href="//instagram.com" target="_blank"><button class="btn glyphicon glyphicon-share"></button></a>
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
                <div v-for="tag in card.tags">
                    <div class="col-xs-4">
                        <md-chip class="tag-text" disabled>{{tag.name}}</md-chip>
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
                if (!this.$store.state.userInfo.favorites)
                    return false;
                return this.$store.state.userInfo.favorites.includes(this.card._id)
            }
        },
        components: {
        },
        methods: {
            favorite(card) {
                if (this.signedIn()) {
                    this.$store.dispatch('favorite', card)
                }
            },
            addFav(card) {
                if (this.signedIn()) {
                    this.$store.dispatch('addFav', card)
                }
            },
            deleteFav(card) {
                if (this.signedIn()) {
                    this.$store.dispatch('deleteFav', card)
                }
            },
            confirm(card) {
                this.$store.commit('confirm', card)
            },
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .mobile{
        padding-bottom: 20vh;
    }
    .tag {
        margin: 3rem 0 0 0;
        padding: 2rem 0 2rem 0;
    }

    .tag-text {
        font-size: 4rem;
        padding: 2rem 2rem 4rem 2rem;
        margin-bottom: 1rem;
    }

    .picture {
        margin-top: 5vh;
    }

    a {
        color: black;
    }

    img {
        height: 40vh
    }

    .btn {
        background-color: transparent;
        font-size: 5em;
    }

    .liked {
        color: green
    }

    .favorited {
        color: red
    }
</style>