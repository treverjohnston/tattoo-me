<template>
    <div class="info">
        <div class="container-fluid">
            <div class="row">
                <div class="col-xs-12">
                    <hr>
                    <md-whiteframe class="stuff" md-elevation="24">
                        <h3>
                            Welcome to Tattoo-Me
                        </h3>
                        <h4 class=" text text-justify">
                            This app is made for people who want to see what real tattoo designs would look like without any hassle. You can search through
                            designs on the home page, save your favorites, and add them to a queue to try them on yourself.
                            If you know what you're looking for, try searching by tags. If you just want to see what some
                            tattoos look like on you, then add to your queue and open up the phones camera to see what it
                            looks like.
                        </h4>
                    </md-whiteframe>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'info',
        data() {
            return {
            }
        },
        methods: {
        },
        components: {

        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.stuff{
    padding: 3rem 1rem 3rem 1rem;
}
</style>