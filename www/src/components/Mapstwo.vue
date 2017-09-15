<template>
        <div id="mapview">
            
        </div>
    </template>
    
    <script>
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