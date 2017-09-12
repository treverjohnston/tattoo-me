<template>
    <div class="logo">
        <div class="phone-viewport">
            <md-toolbar>
                <md-button class="md-icon-button" @click="toggleLeftSidenav">
                    <md-icon class="glyphicon glyphicon-th-list"></md-icon>
                </md-button>
                <h2 class="md-title"><img class="picture" src="../assets/Tattoo-me.png"></h2>
            </md-toolbar>
            <md-sidenav class="md-left" ref="leftSidenav" @open="open('Left')" @close="close('Left')">
                <md-toolbar class="md-large">
                    <div class="md-toolbar-container">
                        <h3 class="md-title"><img class="sidePic" src="../assets/Tattoo-me.png"></h3>
                    </div>
                </md-toolbar>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi cupiditate esse necessitatibus beatae nobis,
                    deserunt ut est fugit, tempora deleniti, eligendi commodi doloribus. Nemo, assumenda possimus, impedit
                    inventore perferendis iusto!</p>
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
    .picture{
        height: 20rem;
        /* margin: 0 auto; */
    }
    .sidePic{
        height: 10rem;
    }
    .logo {
        width: 100%;
        margin: 0 auto;
        /* position: absolute; */
        /* top: 0px; */
        /* height: 15vh; */
        /* background-position: center; */
        /* background-repeat: no-repeat; */
        /* background-size: cover; */
    }
</style>