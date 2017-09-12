<template>
    <div class="options">
        <!-- <div v-if="!queue.length > 0"> -->
        <div class="container-fluid">
            <hr>
            <div class="row">
                <div class="col-xs-12">
                    <h1 class="header">Choose From These Options To Add To Your Active Queue</h1>
                </div>
                <div class="col-xs-6">
                    <router-link :to="'home'">
                        <div class="panel top">
                            <h2>Select Image From Gallery</h2>
                            <h2 class="icon glyphicon glyphicon-th"></h2>
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
                <div v-if="info.accountType == 'artist'">
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
                <div v-else>
                    <div class="col-xs-12">
                        <router-link :to="'camera'">
                            <div class="panel bot">
                                <h2>Use Your Camera</h2>
                                <h2 class="icon glyphicon glyphicon-camera"></h2>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <!-- </div> -->
        <!-- <div v-else>
            <camera></camera>
        </div> -->
    </div>
</template>

<script>
    import Card from './Card'
    import Camera from './Camera'
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
            info() {
                return this.$store.state.userInfo
            },
            tattoos() {
                return this.$store.state.tattoos
            },
            queue() {
                return this.$store.state.queue
            }
        },
        mounted() {
            this.$store.dispatch('getTattoos')
        },
        components: {
            Card,
            Camera
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .header {
        padding-bottom: 2rem;
        color: white;
    }

    .options {
        background-color: gray;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        padding-bottom: 10vh;
    }

    .top {
        padding: 10rem 0 10rem 0;
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

    a {
        color: black;
    }
</style>