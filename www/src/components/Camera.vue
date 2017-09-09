<template>
    <div id="vue-frame" class="camera">
        <vue-frame ref="vFrame" text="VueJS" url="__dirname + /../static/camera.html" frame="myframe" type="button" class="vFrame form-control"></vue-frame>
        <br/>
        <iframe id="myframe"></iframe>
    </div>
</template>
<script>
    import VueFrame from 'vue-frame'
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
            },
            test() {
                debugger
                console.log('testing the interception')
            }
        },
        computed: {
        },
        mounted() {
            this.$refs.vFrame.loadIframe()
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
    iframe{
        height: 90vh;
        width: 100vw;
    }
    .vFrame{
        display: none;
    }
</style>