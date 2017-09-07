<template>
    <div class="camera">
        <div class="container-fluid">
            <hr>
            <div class="row">
                <div class="col-xs-12">
                    <div class="screen">
                        <a-scene embedded arjs='trackingMethod: best;'>
                            <a-anchor hit-testing-enabled='true'>
                                <a-box position='0 0.5 0' material='opacity: 0.5;'></a-box>
                            </a-anchor>
                            <a-camera-static/>
                        </a-scene>
                        <!-- <input type="file" capture="camera" accept="image/*" id="cameraInput" name="cameraInput"> -->
                        <button @click="turnOff()" class="btn btn-default">Off</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Card from './Card'
    export default {
        name: 'camera',
        data() {
            return {

            }
        },
        methods: {
            turnOff() {
                console.log('attempting to turn off')
                var camera = document.querySelector('#cam')
                console.log('cam', cam)
                cam.setAttribute('cam', 'active', false)
                console.log('cam2', cam)
            }
        },
        computed: {
            activeCards() {
                return this.$store.state.activeCards
            }
        },
        mounted() {
            this.$store.dispatch('getTattoos')
        },
        components: {
            Card
            // Navbar
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .camera {
        /* background-color: gray; */
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        padding-bottom: 100vh;
        overflow-x: hidden;
        overflow-y: hidden;
    }

    .screen {
        overflow: hidden;
    }
</style>