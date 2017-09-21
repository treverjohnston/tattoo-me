<template>
    <div class="options">
        <div class="container-fluid">
            <hr>
            <div class="row">
                <div class="col-xs-6">
                    <router-link :to="'home'">
                        <md-whiteframe md-elevation="24">
                            <button class="btn" @click="setCamera">                                    
                        <div class="top">
                            <h2>Select Image From Gallery</h2>
                            <h2 class="icon home glyphicon glyphicon-th"></h2>
                        </div>
                        </button>
                        </md-whiteframe>
                    </router-link>
                </div>
                <div class="col-xs-6">
                    <router-link :to="'favorites'">
                        <md-whiteframe md-elevation="24">
                            <button class="btn" @click="setCamera">
                            <div class="top">
                            <h2>Choose From Favorites</h2>
                            <h2 class="icon glyphicon fav glyphicon-heart"></h2>
                        </div>
                        </button>
                        </md-whiteframe>
                    </router-link>
                </div>
            </div>
            <div class="row">
                <div v-if="info.accountType == 'artist'">
                    <div v-if="queue.length > 0">
                        <div class="col-xs-6">
                            <router-link :to="'camera'">
                                <md-whiteframe md-elevation="24">
                                    <div class="bot">
                                        <h2>Use Your Camera</h2>
                                        <h2 class="icon glyphicon glyphicon-camera"></h2>
                                    </div>
                                </md-whiteframe>
                            </router-link>
                        </div>
                        <div class="col-xs-6">
                            <router-link :to="'add'">
                                <md-whiteframe md-elevation="24">
                                    <div class="bot">
                                        <h2>Upload Your Design</h2>
                                        <h2 class="icon glyphicon glyphicon-picture"></h2>
                                    </div>
                                </md-whiteframe>
                            </router-link>
                        </div>
                    </div>
                    <div v-else>
                        <div class="col-xs-12">
                            <router-link :to="'add'">
                                <md-whiteframe md-elevation="24">
                                    <div class="bot">
                                        <h2 class="temp">Upload Your Design</h2>
                                        <h2 class="temp icon glyphicon glyphicon-picture"></h2>
                                    </div>
                                </md-whiteframe>
                            </router-link>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div v-if="queue.length > 0">
                        <div class="col-xs-12">
                            <router-link :to="'camera'">
                                <md-whiteframe md-elevation="24">
                                    <div class="bot">
                                        <h2 class="temp">Use Your Camera</h2>
                                        <h2 class="temp icon glyphicon glyphicon-camera"></h2>
                                    </div>
                                </md-whiteframe>
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
            },
            settingCamera() {
                return this.$store.state.settingCamera
            }
        },
        mounted() {
            if (this.queue.length <= 0) {
                swal({
                    title: 'Choose From These Options To Add To Your Active Queue',
                    timer: 3000
                })
            }
        },
        components: {
            Card,
            Camera
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .btn {
        background-color: transparent;
    }

    .home {
        color: blue;
    }

    .fav {
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
        margin-bottom: 20%;
    }

    .top {
        height: 30%;
        width: 45vw;
        padding: 3rem 0 3rem 0;
    }

    .bot {
        padding: 3rem 0 3rem 0;
        margin-top: 5rem;
        height: 30%;
        width: 45vw;
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
    .temp{
        height: 100%;
        width: 100vw;
    }
</style>