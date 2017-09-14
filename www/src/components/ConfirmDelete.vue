<template>
    <div class="confirmdelete">
        <hr>
        <div class="container-fluid">
            <div class="row">
                <div class="col-xs-2">
                    <router-link :to="'/profile'">
                        <button class="btn glyphicon glyphicon-menu-left"></button>
                    </router-link>
                </div>
                <div class="col-xs-8">
                    <button class="btn btn-default">Are you sure you want to delete this?</button>
                </div>
                <div class="col-xs-2">
                    <button @click="removeTattoo(card._id)" class="btn glyphicon glyphicon-remove"></button>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <div class="picture">
                        <img :src="card.url" alt="image">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'confirmdelete',
        data() {
            return {
            }
        },
        methods: {
            removeTattoo(id) {
                this.$store.dispatch('removeTattoo', id)
            }
        },
        computed: {
            card() {
                return this.$store.state.confirm
            }
        },
        components: {
        },
        mounted() {

        }

    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .picture {
        margin-top: 10vh;
    }

    a {
        color: black;
    }

    img {
        height: 40vh
    }

    .btn {
        background-color: transparent;
        font-size: 3rem;
    }
</style>