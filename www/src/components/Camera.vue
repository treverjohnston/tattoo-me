<template>
    <div id="vue-frame" class="camera">
        <vue-frame ref="vFrame" text="VueJS" url="static/camera.html" frame="myframe" type="button" class="vFrame form-control"></vue-frame>
        <br/>
        <iframe allowtransparency="true" style="background-image:url(http://res.cloudinary.com/dvh7zccln/image/upload/v1504733715/14-tattoo-png-image_qd9leq.png);background-repeat: no-repeat;"  id="myframe">
        </iframe>
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

    iframe {
        height: 80vh;
        width: 100vw;
    }

    .vFrame {
        display: none;
    }
</style>