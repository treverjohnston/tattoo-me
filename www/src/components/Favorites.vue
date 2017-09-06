<template>
        <div class="favorites">
            <div class="container-fluid">
                <hr>
                <div class="row">
                    <div class="col-xs-12">
                        <h1>Favorites</h1>
                    </div>
                </div>
                <div class="row">
                    <div class="res">
                        <div v-for="card in favorites">
                            <card :cardProp="card"></card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>
    
    <script>
        import Card from './Card'
        // import Navbar from './Navbar'
        export default {
            name: 'favorites',
            data() {
                return {
                }
            },
            methods: {

            },
            computed: {
                favorites() {
                    return this.$store.state.favorites
                }
            },
            mounted(){
                return this.$store.dispatch('getFavs')
            },
            components: {
                Card
                // Navbar
            }
        }
    
    </script>
    
    <!-- Add "scoped" attribute to limit CSS to this component only -->
    <style scoped>
        .home {
            background-color: gray;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            padding-bottom: 100vh;
        }
    
        .res{
            padding-top: 2rem;
        }
    </style>