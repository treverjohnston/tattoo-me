<template>
    <div class="options">
        <div class="container-fluid">
            <hr>
            <div class="row">
                <div class="col-xs-12">
                    <h1 class="header">Choose From These Options To Add To Your Active Queue</h1>
                </div>
                <div class="col-xs-6">
                    <router-link :to="'search'">
                        <div class="panel top">
                            <h2>Select Image From Gallery</h2>
                            <h2 class="icon glyphicon glyphicon-search"></h2>
                        </div>
                    </router-link>
                </div>
                <div class="col-xs-6">
                    <router-link :to="'favorites'">
                        <div class="panel top">
                            <h2>Choose From Your Favorites</h2>
                            <h2 class="icon glyphicon glyphicon-heart"></h2>
                        </div>
                    </router-link>
                </div>
                <!-- Links to phone camera/photos for upload -->
                <div class="col-xs-6">
                    <router-link :to="'camera'">
                        <div class="panel bot">
                            <h2>Use Your Camera</h2>
                            <h2 class="icon glyphicon glyphicon-camera"></h2>
                        </div>
                    </router-link>
                </div>
                <div class="col-xs-6">
                    <router-link :to="'add'">
                        <div class="panel bot">
                            <h2>Upload Your Design</h2>
                            <h2 class="icon glyphicon glyphicon-picture"></h2>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Card from './Card'
    // import Navbar from './Navbar'
    export default {
        name: 'options',
        data() {
            return {

            }
        },
        methods: {
        },
        computed: {
            activeCards() {
                return this.$store.state.activeCards
            }
        },
        mounted() {
            this.$store.dispatch('getTattoos')
        },
        components: {
            Card
            // Navbar
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .header{
        padding-bottom: 2rem;
        color: white;
    }
    .options {
        background-color: gray;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        padding-bottom: 100vh;
    }

    .top {
        padding: 5rem 0 20rem 0;
    }

    .bot {
        padding: 10rem 0 15rem 0;
    }

    .panel {
        border-radius: 15px;
    }

    .icon {
        font-size: 5rem;
    }
    a{
        color: black;
    }
</style>