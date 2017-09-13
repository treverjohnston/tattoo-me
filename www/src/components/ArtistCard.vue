<template>
    <div class="artistcard">
        <div class="container-fluid">
            <div class="row">
                <div class="col-xs-12">
                    <h2>
                        {{artist._id}}
                    </h2>
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
        },
        computed: {
        },

        components: {
        },
        mounted() {
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