<template>
    <div class="artistcard">
        <div class="container-fluid">
            <div class="row">
                <router-link :artist="artist" :to="`/viewartist/${artist._id}`">
                    <div class="col-xs-offset-3 col-xs-4">
                        <button class="btn btn-default" @click="setCurrentArtist(artist)">
                            <md-ink-ripple />
                            <h2>
                                {{artist.name}}
                            </h2>
                        </button>
                    </div>
                </router-link>
                <div class="col-xs-2">
                    <h2>
                        {{artist.numWeeklyLikes}}
                    </h2>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'artistcard',
        props: ["artist"],
        data() {
            return {
            }
        },
        methods: {
            setCurrentArtist(id) {
                this.$store.commit('setCurrentArtist', this.artist)
            }
        },
        computed: {
        },

        components: {
        },
        mounted() {
            // this.$store.dispatch('getArtistProfile', this.artist._id)
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .btn-default {
        background-color: transparent;
        border: none;
    }

    button {
        margin-top: 2rem;
    }

    .viewartist {
        padding-bottom: 15rem;
    }
</style>