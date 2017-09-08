<template>
    <div class="search">
        <div class="container-fluid">
            <hr>
            <div class="row">
                <div class="col-xs-12">
                    <form type="submit" @submit.prevent="search()">
                        <input type="text" placeholder="Search" v-model="query">
                    </form>
                </div>
            </div>
            <div class="row">
                <div class="res">
                    <div v-for="card in results">
                        <card :cardProp="card"></card>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">

                    <div v-if="!results.length > 0">

                        <h2>No Results</h2>
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
        name: 'search',
        data() {
            return {
                query: ''
            }
        },
        methods: {
            search() {
                this.$store.dispatch('search', this.query)
            }
        },
        computed: {
            results() {
                return this.$store.state.results
            }
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

    input[type=text] {
        width: 130px;
        box-sizing: border-box;
        border: 2px solid #ccc;
        border-radius: 4px;
        font-size: 16px;
        background-color: white;
        /* background-image: url(‘searchicon.png’); */
        background-position: 10px 10px;
        background-repeat: no-repeat;
        padding: 12px 20px 12px 40px;
        -webkit-transition: width 0.4s ease-in-out;
        transition: width 0.4s ease-in-out;
    }

    input[type=text]:focus {
        width: 100%;
    }
    .res{
        padding-top: 2rem;
    }
</style>