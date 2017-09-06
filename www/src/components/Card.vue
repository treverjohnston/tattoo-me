<template>
    <div class="card">
        <div class="card main">
            <div class="card-block">
                <div class="row">
                    <div class="col-xs-12">
                        <img :src="cardProp.url" alt="image">
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-offset-7 col-xs-2">
                        <button class="btn btn-default glyphicon glyphicon-ok-circle"></button>
                    </div>
                    <div class="col-xs-2">
                        <router-link :to="'/mobile'">
                        <button @click="zoomIn(cardProp)" class="btn btn-default glyphicon glyphicon-zoom-in"></button>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'card',
        props: ["cardProp"],
        data() {
            return {

            }
        },
        methods:{
            zoomIn(card){
                this.$store.dispatch('zoomIn', card)
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    img {
        max-height: 15rem;
    }

    .card-block {
        border: 1px solid black;
        height: 25vh;
        width: 33vw;
    }
</style>