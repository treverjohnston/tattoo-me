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
                    <h1>Designs by: {{current.name}}</h1>
                </div>
            </div>
            <hr>

            <div v-masonry transition-duration="0.3s" item-selector=".item" class="tattoo">
                <div v-masonry-tile class="item" v-for="item in blocks">
                    <publicartistgallery :cardProp="item"></publicartistgallery>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Publicartistgallery from './PublicartistGallery'
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
            blocks() {
                return this.$store.state.tattoos
            },
            current() {
                return this.$store.state.artistProfile
            }
        },
        components: {
            Publicartistgallery
        },
        mounted() {
            this.$store.commit('resetTattoos')
            this.$store.dispatch('getArtistGallery')
            this.$store.dispatch('getArtistProfile', this.$route.params.artistId)
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

    .tattoo {
        width: 90%;
        margin: 0 auto;
    }

    .item {
        margin: 0 1rem 0 1rem;
        width: 45%;
    }
</style>