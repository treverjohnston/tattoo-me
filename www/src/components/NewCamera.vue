<template>
    <div class="newcamera">
        <canvas id="canvas" width="500" height="375">
            <video autoplay id="videoElement"></video>
        </canvas>

        <img id="overlay" style="display: none" src="logo.png" alt="">
        <!-- Used to capture frame from webcam video feed -->
        <input type="button" value="Save" id="save" />

        <!-- Or alternatively added to an img tag -->
        <img id="imgtag" src="" width="500" height="375" alt="capture" />
    </div>
</template>
<script>
    import VueFrame from 'vue-frame'
    import Camera from 'Camera.js'
    export default {
        name: 'camera',
        data() {
            return {
                on: true
            }
        },
        methods: {
        },
        computed: {
        },
        mounted() {
        },
        components: {
            VueFrame,
            Camera
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .camera {
        overflow: hidden;
        margin: 0px;
    }

    iframe {
        height: 80vh;
        width: 100vw;
    }

    .vFrame {
        display: none;
    }
</style>