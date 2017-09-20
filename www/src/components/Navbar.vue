<template>
    <div class="bar">
        <!-- <div class="container-fluid">
            <div class="row"> -->
        <nav class="navbar navbar-inverse navbar-fixed-bottom">
            <md-bottom-bar class="md-headline">
                <md-bottom-bar-item href="#/home" md-active>
                    <md-icon>home</md-icon>
                </md-bottom-bar-item>
                <md-bottom-bar-item href="#/search" class="md-size-5x">
                    <md-icon>search</md-icon>
                </md-bottom-bar-item>
                <md-bottom-bar-item class="md-size-5x" href="#/options">
                    <md-icon>camera</md-icon>
                </md-bottom-bar-item>
                <md-bottom-bar-item href="#/favorites">
                    <md-icon>favorite</md-icon>
                </md-bottom-bar-item>
                <md-bottom-bar-item href="#/profile">
                    <md-icon>perm_identity</md-icon>
                </md-bottom-bar-item>
            </md-bottom-bar>
        </nav>
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

    .md-icon {
        font-size: 10rem;
    }

    .md-bottom-bar {
        padding: 4rem 0 8rem 0;
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