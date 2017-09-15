<template>
    <div id="mapview">
        <gmap-map :center="center" :zoom="7" style="height: 100vh; width: 100vw">
            <gmap-marker :key="index" v-for="(m, index) in markers" :position="m.position" :clickable="true" :draggable="true" @click="center=m.position"></gmap-marker>
        </gmap-map>
    </div>
</template>

<script>
    /////////////////////////////////////////
    // New in 0.4.0
    import * as VueGoogleMaps from 'vue2-google-maps';
    import Vue from 'vue';

    Vue.use(VueGoogleMaps, {
        load: {
            key: 'AIzaSyDikewxaZ5Azkf-ynjTTOceRz8lJ0yte4o',
            v: 'OPTIONAL VERSION NUMBER',
            // libraries: 'places', //// If you need to use place input
        }
    });

    export default {
        data() {
            return {
                center: { lat: 10.0, lng: 10.0 },
                markers: [{
                    position: { lat: 10.0, lng: 10.0 }
                }, {
                    position: { lat: 11.0, lng: 11.0 }
                }]
            }
        }
    }

</script>

<style scoped>
</style>