<template>
    <!-- <div>
        <video autoplay id="videoElement" style="display: none"></video>
        <input type="button" value="Save" id="save" />
        <button type="button" onclick="captureImage()">Capture Image</button>
        <button type="button" onclick="showLive()">Show Live</button>

        <canvas id="canvas"></canvas>

        <img id="overlay" style="display: none" src="" alt="">
        <img id="imgtag" style="display: none" src="" alt="capture" />
    </div> -->


    <div id="vue-frame" class="camera">
        <vue-frame ref="vFrame" text="VueJS" url="../static/camera2.html" frame="myframe" type="button" class="vFrame form-control"></vue-frame>
        <br/>
        <iframe id="myframe"></iframe>
    </div>
</template>
<script>
    import VueFrame from 'vue-frame'
    import Hammerjs from 'hammerjs'
    import FileSaverjs from 'file-saver'
    export default {
        name: 'camera',
        data() {
            return {
                on: true,
                hammertime: '',
                video: '',
                localStream: '',
                run: true,
                canvas: '',
                context: '',
                v: '',
                w: '',
                h: '',
                navigator: {}
            }
        },
        methods: {
            check() {
                if (this.navigator.getUserMedia) {
                    this.navigator.getUserMedia({ video: true }, this.handleVideo, this.videoError);
                }
            },
            handleVideo(stream) {
                this.localStream = stream
                this.video.src = window.URL.createObjectURL(stream);
                this.update()
                this.insertImage()
            },
            videoError(e) {
                console.log(e)
            }
        },
        computed: {
        },
        mounted() {
            this.$refs.vFrame.loadIframe()
            // this.hammertime = new Hammer((document.getElementById('canvas')))
            // console.log(this.hammertime)
            // this.hammertime.get('pinch').set({ enable: true })
            // this.video = document.querySelector("#videoElement")
            // this.navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
            // this.check()
            // if (this.navigator.getUserMedia) {
            //     this.navigator.getUserMedia({ video: true }, this.handleVideo(), this.videoError());
            // }
        },
        components: {
            VueFrame
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