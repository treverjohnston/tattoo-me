<template>
    <div class="navbar">
        <div class="container-fluid">
            <div class="row">
                <nav class="navbar navbar-inverse navbar-fixed-bottom">
                    <ul>
                        <div class="col-xs-offset-1 col-xs-2">
                        <router-link :to="'/home'">
                            <li><a href="#" class="glyphicon glyphicon-home"></a></li>
                        </router-link>
                        </div>
                        <div class="col-xs-2">
                            <li><a href="#" class="glyphicon glyphicon-search"></a></li>
                        </div>
                        <div class="col-xs-2">
                            <li><a href="#" class="glyphicon glyphicon-plus-sign"></a></li>
                        </div>
                        <div class="col-xs-2">
                            <li><a href="#" class="glyphicon glyphicon-heart"></a></li>
                        </div>
                        <div class="col-xs-2">
                            <li><a href="#" class="glyphicon glyphicon-user"></a></li>
                        </div>
                    </ul>
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
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #myNavbar {
        width: 350 px;
        padding: 5px;
    }
    li{
        list-style: none;
        font-size: 5rem;
    }

</style>
