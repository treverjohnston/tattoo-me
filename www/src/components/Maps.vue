<template>
        <div>
            <div id="mapview" v-model="map">
                <!-- map loads here -->
            </div>
            <!-- <button type="button" @click="initMap">Load Map</button> -->
    
        </div>
    </template>
    
    <script>
        export default {
            data() {
                return {
                    map: {},
                    infoWindow: 'hell',
                    canvasHeight: ''
                }
            },
            mounted() {
                this.initMap()
            },
            methods: {
                initMap() {
                    this.map = new google.maps.Map(document.getElementById('mapview'), {
                        center: { lat: -34.397, lng: 150.644 },
                        zoom: 12
                    });
                    this.infoWindow = new google.maps.InfoWindow({ map: this.map });
    
    
                    // Try HTML5 geolocation.
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition((position) => {
                            var pos = {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude
                            };
                            this.$store.commit('setUserLocation', pos)
    
                            this.infoWindow.setPosition(pos);
                            this.infoWindow.setContent('You are here');
                            this.infoWindow.open(this.map);
                            this.map.setCenter(pos);
                        }, function () {
                            handleLocationError(true, this.infoWindow, this.map.getCenter());
                        });
                    } else {
                        // Browser doesn't support Geolocation
                        handleLocationError(false, this.infoWindow, this.map.getCenter());
                    }
                    this.canvasHeight = window.innerHeight
                    document.getElementById('mapview').style.height = this.canvasHeight - 320 + 'px'
                },
    
                handleLocationError(browserHasGeolocation, infoWindow, pos) {
                    infoWindow.setPos(pos);
                    infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
                    infoWindow.open(map)
                }
            }
        }
    
    </script>
    
    <style scoped>
        #mapview {
            height: 100vh;
        }
    
        html,
        body {
            height: 100%;
            margin: 0;
            padding: 0;
        }
    </style>