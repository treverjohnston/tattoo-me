<template>
        <div class="publicartistmobile">
            <div class="container-fluid">
                <hr>
                <div class="row">
                    <div v-if="!card.favorite">
                        <div class="col-xs-2">
                            <router-link :to="`/viewartist/${card._id}`">
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
                        <div class="col-xs-offset-5 col-xs-4">
                            <div v-if="!hasFavorited">
                                <button @click="favorite(card)" class="btn glyphicon glyphicon-heart"></button>
                                <router-link :to="'/purchase'">
                                    <button @click="confirm(card)" class="btn glyphicon glyphicon-usd"></button>
                                </router-link>
                                <a href="//instagram.com" target="_blank"><button class="btn glyphicon glyphicon-share"></button></a>
                            </div>
                            <div v-else>
                                <button @click="favorite(card)" class="btn glyphicon glyphicon-heart favorited"></button>
                                <router-link :to="'/purchase'">
                                    <button @click="confirm(card)" class="btn glyphicon glyphicon-usd"></button>
                                </router-link>
                                <a href="//instagram.com" target="_blank"><button class="btn glyphicon glyphicon-share"></button></a>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <div class="col-xs-offset-5 col-xs-4">
                            <button @click="deleteFav(card)" class="btn glyphicon glyphicon-remove"></button>
                            <router-link :to="'/purchasefav'">
                                <button @click="confirm(card)" class="btn glyphicon glyphicon-usd"></button>
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
                    <div class="col-xs-12">
                        <div class="panel tags">
                                <!-- <h2 class="text-left">Tags:</h2> -->
                            <div v-for="tag in card.tags">
                                <h4 class="tag-text">{{tag.name}}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>
    
    <script>
        export default {
            name: 'publicartistmobile',
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
        .panel{
            margin: 3rem 0 0 0;
            padding: 2rem 0 2rem 0;
        }
        .tag-text{
            font-size: 3rem;
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