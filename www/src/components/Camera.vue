<template>
	<div>
		<video autoplay id="videoElement" style="display: none"></video>
		<div id="controls">
			<!-- <button type="button" @click="captureImage">Capture Image</button> -->
			<!-- <button type="button" @click="changeCamera">Change Camera</button> -->
			<!-- <i id="" @click="changeCamera" class="md-size-4x material-icons">autorenew</i> -->
			<!-- <md-icon @click="changeCamera" class="md-size-4x">autorenew</md-icon> -->
			<md-button @click="changeCamera" class="md-fab md-clean">
				<md-icon>autorenew</md-icon>
			</md-button>
			<router-link :to="'/home'">
				<md-button class="md-raised">
					Back
				</md-button>
			</router-link>
		</div>

		<div id="stage">
			<canvas id="canvas"></canvas>
		</div>

		<img crossorigin="*" id="overlay" style="display: none" :src="activeTattoo" alt="">
		<img id="imgtag" style="display: none" src="" alt="capture" />
		<img id="temp" style="display: none" src="" alt="">
		<canvas id="tempCanvas" style="display: none"></canvas>
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
				tattoos: [],
				activeTattoo: '',
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
				paused: false,
				camera: 'rear',
				videoHeight: null,
				videoWidth: null,
				imageAspect: 1,
				dragging: false
			}
		},
		watch: {
			getTattoos: () => {
				debugger
				if (this.tattoos[0] != '') {
					console.log(this.tattoos)
					this.activeTattoo = this.tattoos[0]
				}
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
				var tempCanvas = document.getElementById('tempCanvas')
				tempCanvas.setAttribute('width', this.canvasWidth)
				tempCanvas.setAttribute('height', this.canvasHeight)
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
				button.innerHTML = "Save Image to Device"
				button.id = 'save-button'
				// button.className('btn btn-primary')
				button.addEventListener('click', function () {
					if (_this.signedIn()) {
						_this.canvas.toBlob((blob) => {
							FileSaverjs.saveAs(blob, "test capture.png")
						})
						document.getElementById('save-button').remove()
						_this.showLive()
					}
				})
				var addTo = document.getElementById('controls')
				addTo.appendChild(button)
			},
			showLive() {
				this.run = true
				navigator.getUserMedia({ video: true }, this.handleVideo, this.videoError)

				var button = document.getElementById('save-button')
				if (button) {
					document.getElementById('save-button').remove()
				}
			},
			changeCamera() {
				if (this.localStream)
					this.localStream.getVideoTracks()[0].stop();
				this.localStream = null;
				this.video.src = '';

				if (this.camera == 'front') {
					navigator.mediaDevices.getUserMedia({ video: { facingMode: { exact: "environment" } } }).then(this.handleVideo).catch(this.videoError)
					this.camera = 'rear'
				}
				else {
					this.camera = 'front'
					navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } }).then(this.handleVideo).catch(this.videoError)
				}
			},
			handleVideo(stream) {
				this.localStream = stream
				this.video.src = window.URL.createObjectURL(stream);
				this.update()
				this.insertImage()
			},
			videoError(e) {
				console.log('no rear camera dumby, Im pulling up the other camera')
				this.camera = 'front'
				navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } }).then(this.handleVideo).catch(this.videoError)
			},
			setTemp() {
				var canvas = document.getElementById('tempCanvas')
				var context = canvas.getContext("2d")
				var tempImg = document.getElementById('temp')
				context.drawImage(this.video, (this.canvasWidth - this.videoWidth) / 2, (this.canvasHeight - this.videoHeight) / 2, this.videoWidth || this.canvasWidth, this.videoHeight || this.canvasHeight)
				var uri = canvas.toDataURL('image/png')
				tempImg.src = uri
			}
		},
		computed: {
			getTattoos() {
				return this.$store.state.queue[0]
			},
			getTattoos() {
				return this.$store.state.queue
			}
		},
		mounted() {
			var _this = this
			this.hammertime = new Hammer((document.getElementById('canvas')));
			this.pinch = new Hammer.Pinch()
			this.hammertime.get('pinch').set({ enable: true })
			this.hammertime.get('rotate').set({ enable: true })
			this.video = document.querySelector("#videoElement");
			this.tattoos = this.$store.state.queue
			this.activeTattoo = this.$store.state.queue[0]

			// navigator.getUserMedia = navigator.mediaDevices.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

			// if (navigator.getUserMedia) {
			console.log(navigator.mediaDevices.enumerateDevices())
			navigator.mediaDevices.getUserMedia({ video: { facingMode: { exact: 'environment' } } }).then(this.handleVideo).catch(this.videoError);
			// }

			this.imgtag = document.getElementById('imgtag')

			this.canvas = document.getElementById('canvas')
			this.context = this.canvas.getContext("2d")
			this.setCanvasDimensions();
			this.x = this.canvasWidth * .45
			this.y = this.canvasHeight * .45
			this.sizeX = this.canvasWidth * .1
			this.sizeY = this.canvasHeight * .1
			this.imageAspect = this.sizeX / this.sizeY;

			this.hammertime.on('pinchout', (ev) => {
				_this.sizeX += 8
				_this.sizeY += 8 / this.imageAspect;
				_this.x -= 4
				_this.y -= 2 / this.imageAspect;
			})

			this.hammertime.on('pinchin', (ev) => {
				_this.sizeX -= 8
				_this.sizeY -= 8 / this.imageAspect;
				_this.x += 4
				_this.y += 2 / this.imageAspect;
			})

			this.hammertime.on('swipeleft', (ev) => {
				var index = _this.tattoos.indexOf(_this.activeTattoo)
				var nextIndex = index + 1
				if (_this.tattoos[nextIndex] != null) {
					_this.activeTattoo = _this.tattoos[nextIndex]
				}
			})

			this.hammertime.on('swiperight', (ev) => {
				var index = _this.tattoos.indexOf(_this.activeTattoo)
				var previousIndex = index - 1
				if (_this.tattoos[previousIndex] != null) {
					_this.activeTattoo = _this.tattoos[previousIndex]
				}
			})

			this.hammertime.on('tap', (ev) => {
				this.paused = !this.paused
				if (this.paused) {
					this.setTemp()
					this.captureImage()
				}
				else if (!this.paused && this.camera == 'front') {
					this.run = true
					navigator.getUserMedia({ video: { facingMode: 'user' } }, _this.handleVideo, _this.videoError)
					var button = document.getElementById('save-button')
					if (button) {
						document.getElementById('save-button').remove()
					}
				}
				else if (!this.paused && this.camera == 'rear') {
					this.run = true
					navigator.getUserMedia({ video: { facingMode: { exact: 'environment' } } }, _this.handleVideo, _this.videoError)
					var button = document.getElementById('save-button')
					if (button) {
						document.getElementById('save-button').remove()
					}
				}
			})

			this.hammertime.on('rotate', (ev) => {
				if (this.paused) {
					var overlay = document.getElementById('overlay')
					var liveScale = 1
					var currentRotation = 0
					var rotation = currentRotation + Math.round(liveScale * e.originalEvent.gesture.rotation)
					overlay.style('transform', `rotate(${rotation} + deg)`)
				}
			})

			this.canvas.addEventListener('mousedown', (e) => {
				if (this.paused) {
					this.dragging = true
				}
			})

			this.canvas.addEventListener('mousemove', (e) => {
				if (this.dragging) {
					this.x = e.offsetX - Math.floor(this.sizeX / 2)
					this.y = e.offsetY - Math.floor(this.sizeY / 2)
					var overlay = document.getElementById('overlay')
					var background = document.getElementById('temp')
					this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
					this.context.drawImage(background, 0, (this.canvasHeight - this.videoHeight) / 2, this.canvasWidth, this.videoHeight || this.canvasHeight)
					this.context.drawImage(overlay, this.x, this.y, this.sizeX, this.sizeY)
				}
			})

			this.canvas.addEventListener('mouseup', (e) => {
				this.dragging = false
				// this.video.play()
			})

			// this.canvas.addEventListener('click', () => {
			// 	this.paused = !this.paused
			// 	if (this.paused) {
			// 		this.captureImage()
			// 	}
			// 	else {
			// 		this.run = true
			// 		navigator.getUserMedia({ video: true }, this.handleVideo, this.videoError)
			// 		var button = document.getElementById('save-button')
			// 		if (button) {
			// 			document.getElementById('save-button').remove()
			// 		}
			// 	}
			// })
		},
		destroyed() {
			this.localStream.getVideoTracks()[0].stop();
			this.run = false;
		},
		components: {
			VueFrame,
			FileSaverjs
		}
	}

</script>

<style scoped>
	.md-icon{
        font-size: 4rem;
        margin: 1rem 0 0rem 1rem;
    }
	.camera {
		overflow: hidden;
		margin: 0px;
	}

	iframe {
		height: 100%;
		width: 100%;
	}

	.vFrame {
		display: none;
	}

	#controls {
		position: absolute
	}

	#save-button {
		width: 50vw;
		height: 10vh;
		font-size: 3rem;
	}
</style>