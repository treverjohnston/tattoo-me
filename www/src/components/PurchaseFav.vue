<template>
        <div class="purchase">
            <hr>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-xs-2">
                        <router-link :to="'/mobile'">
                            <button class="btn glyphicon glyphicon-menu-left"></button>
                        </router-link>
                    </div>
                    <div class="col-xs-offset-2 col-xs-4">
                        <button class="btn btn-default">Purchase HD for ${{card.price}}</button>
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
            name: 'purchase',
            data() {
                return {
                }
            },
            methods: {
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