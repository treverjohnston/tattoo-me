<template>
    <div>
        <video autoplay id="videoElement" style="display: none"></video>
        <div id="controls">
            <button type="button" @click="captureImage">Capture Image</button>
            <button type="button" @click="showLive">Show Live</button>
        </div>

        <div id="stage">
            <canvas id="canvas"></canvas>
        </div>

        <img  crossorigin="*" id="overlay" style="display: none" :src="currentTattoo" alt="">
        <img id="imgtag" style="display: none" src="" alt="capture" />
    </div>


    <!-- <div id="vue-frame" class="camera">
        <vue-frame ref="vFrame" text="VueJS" url="../static/camera2.html" frame="myframe" type="button" class="vFrame form-control"></vue-frame>
        <br/>
        <iframe id="myframe"></iframe>
    </div> -->
</template>
<script>
    import VueFrame from 'vue-frame'
    import Hammerjs from 'hammerjs'
    import FileSaverjs from 'file-saver'
    export default {
        name: 'camera',
        data() {
            return {
                tattoo: '',
                hammertime: '',
                localStream: '',
                run: true,
                video: '',
                pinch: '',
                dragging: false,
                timeout: true,
                pinch: false,
                x: '',
                y: '',
                sizeX: '',
                sizeY: '',
                canvas: '',
                context: '',
                canvasWidth: '',
                canvasHeight: '',
                imgtag: ''
            }
        },
        methods: {
            update() {
                if (this.run) {
                    this.context.drawImage(this.video, 0, 0, this.canvasWidth, this.canvasHeight)
                    requestAnimationFrame(this.update)
                }
            },
            insertImage() {
                if (this.run) {
                    var overlay = document.getElementById('overlay')
                    this.context.drawImage(overlay, this.x, this.y, this.sizeX, this.sizeY)
                    requestAnimationFrame(this.insertImage)
                }
            },
            captureImage() {
                var _this = this
                var uri = this.canvas.toDataURL("image/png")
                this.imgtag.src = uri
                this.run = false
                this.localStream.getVideoTracks()[0].stop()
                var button = document.createElement("button")
                button.innerHTML = "Save Image"
                button.id = 'save-button'
                button.addEventListener('click', function () {
                    _this.canvas.toBlob((blob) => {
                        FileSaverjs.saveAs(blob, "test capture.png")
                    })
                    document.getElementById('save-button').remove()
                    _this.showLive()
                })
                var addTo = document.getElementById('controls')
                addTo.appendChild(button)
            },
            // saveImage() {
            //     this.canvas.toBlob((blob) => {
            //         saveAs(blob, "test save.png")
            //     })
            //     document.getElementById('save-button').remove()
            //     this.showLive()
            // },
            showLive() {
                this.run = true
                navigator.getUserMedia({ video: true }, this.handleVideo, this.videoError)
                var button = document.getElementById('save-button')
                if (button) {
                    document.getElementById('save-button').remove()
                }
            },
            handleVideo(stream) {
                this.localStream = stream
                this.video.src = window.URL.createObjectURL(stream);
                this.update()
                this.insertImage()
            },
            videoError(e) {
                // no webcam found - do something
            }
        },
        computed: {
            currentTattoo() {
                return this.$store.state.queue[0]
            }
        },
        mounted() {
            var _this = this
            // this.$refs.vFrame.loadIframe()

            this.hammertime = new Hammer((document.getElementById('canvas')));
            this.pinch = new Hammer.Pinch()
            this.hammertime.get('pinch').set({ enable: true });
            this.video = document.querySelector("#videoElement");

            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

            if (navigator.getUserMedia) {
                // get webcam feed if available
                navigator.getUserMedia({ video: true }, this.handleVideo, this.videoError);
            }

            // var v, canvas, context, w, h;
            this.imgtag = document.getElementById('imgtag')

            // document.addEventListener('DOMContentLoaded', function () {
            //     // when DOM loaded, get canvas 2D context and store width and height of element
            //     v = document.getElementById('videoElement');
            //     canvas = document.getElementById('canvas');
            //     context = canvas.getContext('2d');
            //     w = canvas.width;
            //     h = canvas.height;

            // }, false)

            // x: canvasWidth * .45,
            //     y: canvasHeight * .45,
            //         sizeX: canvasWidth * .1,
            //             sizeY: canvasHeight * .1,

            this.canvas = document.getElementById('canvas')
            this.context = this.canvas.getContext("2d")
            this.canvasWidth = document.body.clientWidth * .90
            this.canvasHeight = this.canvasWidth * .75
            this.x = this.canvasWidth * .45
            this.y = this.canvasHeight * .45
            this.sizeX = this.canvasWidth * .1
            this.sizeY = this.canvasHeight * .1
            this.canvas.setAttribute('width', this.canvasWidth)
            this.canvas.setAttribute('height', this.canvasHeight)

            this.hammertime.on('pinchin', (ev) => {
                console.log(ev)
                _this.sizeX += 4
                _this.sizeY += 2
                _this.x -= 4
                _this.y -= 2
            })

            this.hammertime.on('pinchout', (ev) => {
                console.log(ev)
                _this.sizeX -= 4
                _this.sizeY -= 2
                _this.x += 4
                _this.y += 2
            })
        },
        components: {
            VueFrame,
            FileSaverjs
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