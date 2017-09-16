<template>
    <div class="logo">
        <div class="phone-viewport">
            <md-toolbar>
                <md-button class="md-icon-button" @click="toggleLeftSidenav">
                    <md-icon class="glyphicon glyphicon-th-list"></md-icon>
                </md-button>
                <h2 class="md-title"><img class="picture" src="../assets/Tattoo-me-logo-new.png"></h2>
            </md-toolbar>
            <md-sidenav class="md-left" ref="leftSidenav" @open="open('Left')" @close="close('Left')">
                <md-toolbar class="md-large">
                    <div class="md-toolbar-container">
                        <h3 class="md-title"><img class="sidePic" src="../assets/Tattoo-me-logo-new.png"></h3>
                    </div>
                </md-toolbar>
                <h3>
                    Welcome to Tattoo-Me
                </h3>
                <h4 class=" text text-justify">
                    This app is made for people who want to see what real tattoo designs would look like without any hassle. You can search through
                    designs on the home page, save your favorites, and add them to a queue to try them on yourself. If you
                    know what you're looking for, try searching by tags. If you just want to see what some tattoos look like
                    on you, then add to your queue and open up the phones camera to see what it looks like.
                </h4>
                <router-link :to="'/topartists'">
                    <button class="top-artists btn btn-default" @click="toggleLeftSidenav">Check out the top artists of the week!</button>
                </router-link>
                <router-link :to="'/maps'">
                    <button class="maps btn btn-default" @click="toggleLeftSidenav">Tattoo shops near me</button>
                </router-link>
            </md-sidenav>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'logo',
        data() {
            return {
            }
        },
        methods: {

            toggleLeftSidenav() {
                this.$refs.leftSidenav.toggle();
            },
            toggleRightSidenav() {
                this.$refs.rightSidenav.toggle();
            },
            closeRightSidenav() {
                this.$refs.rightSidenav.close();
            },
            open(ref) {
                console.log('Opened: ' + ref);
            },
            close(ref) {
                console.log('Closed: ' + ref);
            }
        },
        computed: {
        },
        components: {
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .top-artists {
        margin-top: 3rem;
    }

    .picture {
        height: 20rem;
        /* margin: 0 auto; */
    }

    .sidePic {
        height: 10rem;
    }

    .text {
        padding: 0 1rem 0 1rem;
    }
</style>