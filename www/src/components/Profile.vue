<template>
    <div class="profile">
        <div v-if="info.accountType == 'regular'">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-xs-12">
                        <h2>
                            {{info.name}}
                        </h2>
                    </div>
                    <div class="col-xs-12">
                        <h2>
                            {{info.email}}
                        </h2>
                    </div>
                    <div v-show="!info.purchased == undefined">
                        <div class="col-xs-12">
                            {{info.purchased}}
                        </div>
                    </div>
                    <div class="col-xs-12">
                        <button @click="logout()" class="btn btn-default">Logout</button>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-xs-4">
                        <img :src="info.url" alt="profile picture">
                    </div>
                    <div class="col-xs-6">
                        <div class="row">
                            <div class="col-xs-12">
                                {{info.name}}
                            </div>
                            <div class="col-xs-12">
                                {{info.email}}
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-2">
                        <button @click="logout()" class="btn btn-default">Logout</button>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-xs-12">
                        <h1>My Gallery</h1>
                    </div>
                </div>
                <hr>
                <div v-for="card in gallery">
                    <artistgallery :cardProp="card"></artistgallery>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Artistgallery from './ArtistGallery'
    export default {
        name: 'profile',
        data() {
            return {
            }
        },
        methods: {
            logout() {
                return this.$store.dispatch('logout')
            }
        },
        computed: {
            info() {
                return this.$store.state.userInfo
            },
            gallery() {
                return this.$store.state.gallery
            }
        },
        components: {
            Artistgallery
        },
        mounted(){
            return this.$store.dispatch('getArtistGallery')

        }

    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    button {
        margin-top: 2rem;
    }
    .profile{
        padding-bottom: 10rem;
    }
</style>