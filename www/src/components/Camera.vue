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

		<img crossorigin="*" id="overlay" style="display: none" :src="currentTattoo" alt="">
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
				imgtag: '',
				aspectRatio: null,
				videoHeight: null,
				videoWidth: null,
			}
		},
		methods: {
			update() {
				if (this.run) {
					let canvasChanged = false;
					if (this.canvasWidth != window.innerWidth || this.canvasHeight != window.innerHeight - 320) {
						canvasChanged = true;
						this.setCanvasDimensions();
					}
					if (!this.aspectRatio && this.video.videoWidth) {
						this.aspectRatio = this.video.videoWidth / this.video.videoHeight
					}

					if (canvasChanged || (!this.videoHeight && this.aspectRatio)) {
						this.setVideoDimensions();
					}

					this.context.drawImage(this.video, (this.canvasWidth - this.videoWidth) / 2, (this.canvasHeight - this.videoHeight) / 2, this.videoWidth || this.canvasWidth, this.videoHeight || this.canvasHeight)
					requestAnimationFrame(this.update)
				}
			},
			setCanvasDimensions() {
				this.canvasWidth = window.innerWidth;
				this.canvasHeight = window.innerHeight - 320;
				this.canvas.setAttribute('width', this.canvasWidth)
				this.canvas.setAttribute('height', this.canvasHeight)
			},
			setVideoDimensions() {
				let canvasRatio = this.canvasWidth / this.canvasHeight;
				if (canvasRatio < this.aspectRatio) {
					this.videoWidth = this.canvasWidth;
					this.videoHeight = this.videoWidth / this.aspectRatio
				} else {
					this.videoHeight = this.canvasHeight;
					this.videoWidth = this.videoHeight * this.aspectRatio
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
			showLive() {
				this.run = true
				navigator.getUserMedia({ video: { facingMode: { exact: "environment" } } }, this.handleVideo, this.videoError)

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
			this.hammertime = new Hammer((document.getElementById('canvas')));
			this.pinch = new Hammer.Pinch()
			this.hammertime.get('pinch').set({ enable: true });
			this.video = document.querySelector("#videoElement");

			navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

			if (navigator.getUserMedia) {
				navigator.getUserMedia({ video: true }, this.handleVideo, this.videoError);
			}

			this.imgtag = document.getElementById('imgtag')

			this.canvas = document.getElementById('canvas')
			this.context = this.canvas.getContext("2d")
			// this.canvasWidth = document.body.clientWidth * .90
			// this.canvasHeight = this.canvasWidth * .75
			// this.canvasWidth = window.innerWidth;
			// this.canvasHeight = window.innerHeight - 320;
			// this.canvas.setAttribute('width', this.canvasWidth)
			// this.canvas.setAttribute('height', this.canvasHeight)
			this.setCanvasDimensions();
			this.x = this.canvasWidth * .45
			this.y = this.canvasHeight * .45
			this.sizeX = this.canvasWidth * .1
			this.sizeY = this.canvasHeight * .1

			this.hammertime.on('pinchout', (ev) => {
				_this.sizeX += 8
				_this.sizeY += 4
				_this.x -= 4
				_this.y -= 2
			})

			this.hammertime.on('pinchin', (ev) => {
				_this.sizeX -= 8
				_this.sizeY -= 4
				_this.x += 4
				_this.y += 2
			})
		},
		destroyed() {
			this.localStream.getVideoTracks()[0].stop();
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

	#controls {
		position: absolute
	}
</style>