<template>
    <div class="bar">
        <!-- <div class="container-fluid">
            <div class="row"> -->
        <nav class="navbar navbar-inverse navbar-fixed-bottom">
            <md-bottom-bar class="md-headline">
                <md-bottom-bar-item href="#/home" md-icon="home" class="md-large" md-active></md-bottom-bar-item>
                <md-bottom-bar-item href="#/search" md-icon="search" class="md-size-5x"></md-bottom-bar-item>
                <md-bottom-bar-item class="md-size-5x" href="#/options" md-icon="camera"></md-bottom-bar-item>
                <md-bottom-bar-item href="#/favorites" md-icon="favorite"></md-bottom-bar-item>
                <md-bottom-bar-item href="#/profile" md-icon="perm_identity"></md-bottom-bar-item>
            </md-bottom-bar>
            <!-- <div class="col-xs-offset-1 col-xs-1">
                    <router-link :to="'/home'">
                        <li><a href="#" class="glyphicon glyphicon-home"></a></li>
                    </router-link>
                </div>
                <div class="col-xs-offset-1 col-xs-1">
                    <router-link :to="'/search'">
                        <li><a href="#" class="glyphicon glyphicon-search"></a></li>
                    </router-link>
                </div>
                <div class="col-xs-offset-1 col-xs-1">
                    <router-link :to="'/options'">
                        <li><a href="#" class="glyphicon glyphicon-plus-sign"></a></li>
                    </router-link>
                </div>
                <div class="col-xs-offset-1 col-xs-1">
                    <router-link :to="'/favorites'">
                        <li><a href="#" class="glyphicon glyphicon-heart"></a></li>
                    </router-link>
                </div>
                <div class="col-xs-offset-1 col-xs-1">
                    <router-link :to="'/profile'">
                        <li><a href="#" class="glyphicon glyphicon-user"></a></li>
                    </router-link>
                </div> -->
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
        mounted(){
            this.$material.inkRipple = false

        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    /* .black{
     background-color: black;
 } */

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