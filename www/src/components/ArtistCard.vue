<template>
    <div class="artistcard">
        <div class="container-fluid">
            <div class="row">
                <div class="col-xs-12">
                    <router-link :artist="artist" :to="`/viewartist/${artist._id}`">
                        <button @click="setCurrentArtist(artist)" class="btn btn-default">
                            <h2>
                                {{artist.name}}
                            </h2>
                        </button>
                    </router-link>
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
            setCurrentArtist(id){
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
    button {
        margin-top: 2rem;
    }

    .viewartist {
        padding-bottom: 15rem;
    }
</style>