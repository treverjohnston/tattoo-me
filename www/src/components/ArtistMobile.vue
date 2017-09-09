<template>
    <div class="artistmobile">
        <div class="container-fluid">
            <hr>
            <div class="row">
                <div class="col-xs-2">
                    <router-link :to="'/profile'">
                        <button class="btn glyphicon glyphicon-menu-left"></button>
                    </router-link>
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
        </div>
    </div>
</template>

<script>
    export default {
        name: 'artistmobile',
        data() {
            return {

            }
        },
        computed: {
            card() {
                return this.$store.state.mobileView
            }
        },
        components: {
        },
        methods: {
            addFav(card) {
                this.$store.dispatch('addFav', card)
            },
            deleteFav(card) {
                this.$store.dispatch('deleteFav', card)
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .picture{
        margin-top: 10vh;
    }
    a{
        color: black;
    }
    .btn{
        background-color: transparent;
        font-size: 3rem;
    }
    img {
        height: 40vh
    }
</style>