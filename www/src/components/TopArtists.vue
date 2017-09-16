<template>
    <div class="topartists">
        <div class="container-fluid">
            <div class="row">
                <div class="col-xs-12">
                    <h2 class="heading">Top Artists Of The Week</h2>
                </div>
            </div>
            <hr>
            <div class="row">
                <div class="col-xs-12">
                    <div v-for="artist in topArtists">
                        <artistcard :artist="artist"></artistcard>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Artistcard from './ArtistCard'
    export default {
        name: 'topartists',
        data() {
            return {
            }
        },
        methods: {
        },
        computed: {
            topArtists() {
                return this.$store.state.topArtists
            }
        },

        components: {
            Artistcard
        },
        mounted() {
            this.$store.commit('resetTattoos')
            this.$store.dispatch('getTopArtist')
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .heading{
        color: white;
    }
    button {
        margin-top: 2rem;
    }

    .viewartist {
        padding-bottom: 15rem;
    }
</style>