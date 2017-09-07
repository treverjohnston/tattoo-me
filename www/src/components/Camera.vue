<template>
    <div class="camera">
        <div class="container-fluid">
            <hr>
            <div class="row">
                <!-- <a-scene embedded arjs> -->
                    <!-- define the content to be displayed on top of the marker -->
                    <!-- <a-assets>
                        <img id="test-image" src="http://res.cloudinary.com/dvh7zccln/image/upload/v1504733715/14-tattoo-png-image_qd9leq.png" rotation="90 180 0">
                    </a-assets>
                    <a-image src="#test-image" rotation="90 180 0"></a-image> -->
                    <!-- define a simple camera -->
                    <!-- <a-camera id="cam" preset='hiro'></a-camera>
                </a-scene> -->
                <input type="file" capture="camera" accept="image/*" id="cameraInput" name="cameraInput">
                <button @click.stop="turnOff()" class="btn btn-default">Off</button>
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
</style>