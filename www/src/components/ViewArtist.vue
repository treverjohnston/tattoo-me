<template>
    <div class="viewartist">
        <div class="container-fluid">
            <div class="row">
                <div v-if="info.url">
                    <div class="col-xs-4">
                        <img :src="info.url" alt="profile picture">
                    </div>
                </div>
                <div v-else>
                    <div class="col-xs-offset-4 col-xs-4">
                        <button class="btn btn-default">
                            <h3>Contact Artist</h3>
                        </button>
                    </div>
                </div>
            </div>
            <hr>
            <div class="row">
                <div class="col-xs-12">
                    <h1>Designs by: {{info.name}}</h1>
                </div>
            </div>
            <hr>
            <div v-for="card in gallery">
                <artistgallery :cardProp="card"></artistgallery>
            </div>
        </div>
    </div>
</template>

<script>
    import Artistgallery from './ArtistGallery'
    export default {
        name: 'viewartist',
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
                return this.$store.state.tattoos
            }
        },
        components: {
            Artistgallery
        },
        mounted() {
            this.$store.commit('resetTattoos')
            this.$store.dispatch('getArtistGallery')
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    button {
        margin-top: 2rem;
    }

    .viewartist {
        padding-bottom: 15rem;
    }
</style>