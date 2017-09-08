<template>
    <div class="camera">
        <div class="container-fluid">
            <hr>
            <div class="row">
                <div class="col-xs-12">
                    <div v-if="on">
                        <div class="screen">
                            <a-scene embedded arjs>
                                <a-assets>
                                    <img id="test-image" src="http://res.cloudinary.com/dvh7zccln/image/upload/v1504733715/14-tattoo-png-image_qd9leq.png" rotation="90 180 0">
                                </a-assets>
                                <a-image src="#test-image" rotation="90 180 0"></a-image>
                                <a-marker-camera id="cam" preset='hiro'></a-marker-camera>
                            </a-scene>
                        </div>
                        <button @click="turnOff()" class="btn btn-default">Off</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'camera',
        data() {
            return {
                on: true
            }
        },
        methods: {
            turnOff() {
                this.on = !this.on
                console.log('attempting to turn off')
                var camera = document.querySelector('#cam')
                console.log('cam', cam)
                cam.setAttribute('visible', false)
                console.log('cam2', cam)
            }
        },
        computed: {
        },
        mounted() {
        },
        components: {
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .camera {
        overflow: hidden;
        margin: 0px;
    }
</style>