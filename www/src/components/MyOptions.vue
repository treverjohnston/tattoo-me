<template>
    <div class="options">
        <!-- <div v-if="!queue.length > 0"> -->
        <div class="container-fluid">
            <hr>
            <div class="row">
                <div class="col-xs-12">
                </div>
                <div class="col-xs-6">
                    <router-link :to="'home'">
                        <button @click="setCamera" class="panel">                                    
                        <div class="panel top">
                            <h2>Select Image From Gallery</h2>
                            <h2 class="icon home glyphicon glyphicon-th"></h2>
                        </div>
                        </button>
                    </router-link>
                </div>
                <div class="col-xs-6">
                    <router-link :to="'favorites'">
                        <button @click="setCamera" class="panel">
                            <div class="panel top">
                            <h2>Choose From Favorites</h2>
                            <h2 class="icon glyphicon fav glyphicon-heart"></h2>
                        </div>
                        </button>
                    </router-link>
                </div>
                <div v-if="info.accountType == 'artist'">
                    <div v-if="queue.length > 0">
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
                            <router-link :to="'add'">
                                <div class="panel bot">
                                    <h2>Upload Your Design</h2>
                                    <h2 class="icon glyphicon glyphicon-picture"></h2>
                                </div>
                            </router-link>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div v-if="queue.length > 0">
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
        </div>
    </div>
</template>

<script>
    import Card from './Card'
    import Camera from './Camera'
    export default {
        name: 'options',
        data() {
            return {

            }
        },
        methods: {
            setCamera() {
                console.log('about to commit')
                this.$store.commit('setCamera')
            }
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
            swal({
                title: 'Choose From These Options To Add To Your Active Queue',
                timer: 3000
            })
        },
        components: {
            Card,
            Camera
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .home{
        color: blue;
    }
    .fav{
        color: red;
    }
    .header {
        padding-bottom: 2rem;
        color: white;
    }

    .options {
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        margin-bottom: 10%;
    }

    .top {
        height: 30%;
        width: 45vw;
    }

    .bot {
        /* padding: 10rem 0 15rem 0; */
        height: 30%;
        /* width: 45vw; */
    }

    .panel {
        border-radius: 15px;
    }

    .icon {
        font-size: 15rem;
    }

    a {
        color: black;
    }
</style>