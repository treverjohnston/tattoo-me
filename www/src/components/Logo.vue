<template>
    <div class="logo">
        <div class="phone-viewport">
            
                <h2 class="md-title"><img class="picture" src="../assets/Tattoo-me-logo-new.png"></h2>
           
            <md-speed-dial md-open="hover" md-direction="bottom" class="md-fab-top-right" md-theme="light-blue">
                <md-button class="md-fab" md-fab-trigger>
                    <router-link :to="'/topartists'">
                        <md-icon md-icon-morph>whatshot</md-icon>
                        <md-icon>add</md-icon>
                    </router-link>
                </md-button>

                <md-button class="md-fab md-primary md-mini md-clean">
                    <router-link :to="'/maps'">
                        <md-icon>map</md-icon>
                    </router-link>
                </md-button>

                <md-button class="md-fab md-primary md-mini md-clean">
                    <router-link :to="'/info'">
                        <md-icon>info_outline</md-icon>
                    </router-link>
                </md-button>

            </md-speed-dial>
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
    /* .md-icon{
        font-size: 2.5rem;
        margin-left: .75rem;
    } */

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