<template>
    <div class="bar">
        <!-- <div class="container-fluid">
            <div class="row"> -->
        <nav class="navbar navbar-inverse navbar-fixed-bottom">
            <ul>
                <div class="col-xs-offset-1 col-xs-2">
                    <router-link :to="'/home'">
                        <li><a href="#" class="glyphicon glyphicon-home"></a></li>
                    </router-link>
                </div>
                <div class="col-xs-2">
                    <router-link :to="'/search'">
                        <li><a href="#" class="glyphicon glyphicon-search"></a></li>
                    </router-link>
                </div>
                <div class="col-xs-2">
                    <li><a href="#" class="glyphicon glyphicon-plus-sign"></a></li>
                </div>
                <div class="col-xs-2">
                    <router-link :to="'/favorites'">
                        <li><a href="#" class="glyphicon glyphicon-heart"></a></li>
                    </router-link>
                </div>
                <div class="col-xs-2">
                        <router-link :to="'/profile'">                            
                    <li><a href="#" class="glyphicon glyphicon-user"></a></li>
                        </router-link>
                </div>
            </ul>
        </nav>
        <!-- </div>
        </div> -->
    </div>
</template>

<script>
    export default {
        name: 'navbar',
        data() {
            return {

            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    /* .black{
     background-color: black;
 } */

    li {
        list-style: none;
        font-size: 5rem;
    }

    .bar {
        position: absolute;
        width: 100%;
        bottom: 0px;
    }
</style>