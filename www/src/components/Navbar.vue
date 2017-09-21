<template>
    <div class="bar">
        <div class="container-fluid">
            <div class="row">
                <div class="col-xs-12">
                    <nav class="navbar navbar-inverse navbar-fixed-bottom">
                        <md-bottom-bar class="md-headline">
                            <md-bottom-bar-item href="#/home" md-active>
                                <md-icon class="md-size-5x">home</md-icon>
                            </md-bottom-bar-item>
                            <md-bottom-bar-item href="#/search">
                                <md-icon class="md-size-5x">search</md-icon>
                            </md-bottom-bar-item>
                            <md-bottom-bar-item href="#/options">
                                <md-icon class="md-size-5x">camera</md-icon>
                            </md-bottom-bar-item>
                            <md-bottom-bar-item href="#/favorites">
                                <md-icon class="md-size-5x">favorite</md-icon>
                            </md-bottom-bar-item>
                            <md-bottom-bar-item href="#/profile">
                                <md-icon class="md-size-5x">perm_identity</md-icon>
                            </md-bottom-bar-item>
                        </md-bottom-bar>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'navbar',
        data() {
            return {

            }
        },
        mounted() {
            this.$material.inkRipple = false

        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    /* .black{
     background-color: black;
 } */
    /* .md-icon {
        font-size: 10rem;
    } */

    .md-bottom-bar {
        padding: 0rem 0 13rem 0;
    }


    .bar {
        position: absolute;
        width: 100%;
        bottom: 0px;
        /* height: 10vh; */
    }

    a {
        color: rgb(128, 140, 163);
    }
</style>