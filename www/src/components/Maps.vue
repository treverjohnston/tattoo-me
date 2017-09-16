<template>
    <div>
        <div id="mapview" v-model="map">
            <!-- map loads here -->
        </div>
        <!-- <button type="button" @click="initMap">Load Map</button> -->

        <!-- <div id="iw-container">
            <div class="iw-title">${place.name}</div>
            <div class="iw-content">'
                <div class="iw-subTitle">History</div>
                <img src="${place.photos[0].getUrl({maxWidth:100, maxHeight:100})}" alt="Photo Time!"
                    height="auto" width="100">
                <p>Rating: ${place.rating}</p>
            </div>
            <div class="iw-bottom-gradient"></div>
        </div> -->

    </div>
</template>

<script>
    import $ from "jquery"
    export default {
        data() {
            return {
                map: {},
                infoWindow: 'hello',
                canvasHeight: '',
                service: ''
            }
        },
        mounted() {
            this.initMap()
        },
        methods: {
            initMap() {
                var _this = this
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


                        this.service = new google.maps.places.PlacesService(this.map)
                        var request = {
                            location: pos,
                            radius: 50000,
                            type: ['establishment'],
                            keyword: "tattoo"
                        }
                        this.service.nearbySearch(request, this.callback)
                    }, () => {
                        handleLocationError(true, this.infoWindow, this.map.getCenter());
                    });
                } else {
                    // Browser doesn't support Geolocation
                    handleLocationError(false, this.infoWindow, this.map.getCenter());
                }
                this.canvasHeight = window.innerHeight
                document.getElementById('mapview').style.height = this.canvasHeight - 320 + 'px'
            },

            callback(results, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    for (var i = 0; i < results.length; i++) {
                        this.createMarker(results[i])
                    }
                }
            },

            createMarker(place) {
                var _this = this
                var encodedVic = encodeURI(place.vicinity)
                var template = `        
                    <div id="iw-container">
                        <div class="iw-title">
                            <h3>${place.name}</h3>
                        </div>
                        <div class="iw-content">
                            <img src="${place.photos[0].getUrl({ maxWidth: 100, maxHeight: 100 })}" alt="Photo Time!" height="auto" width="100">
                            <h4>Rating: ${place.rating}</h4>
                        </div>
                        <div class="iw-bottom-gradient"></div>
                        <a href="https://google.com/maps/dir/?api=1&destination=${encodedVic}&destination_place_id=${place.place_id}">View in Maps</a>
                    </div>
                `
                var placeLoc = place.geometry.location;
                var marker = new google.maps.Marker({
                    map: this.map,
                    position: place.geometry.location
                })

                google.maps.event.addListener(marker, 'click', () => {
                    // console.log(place)
                    // console.log(place.photos[0].getUrl({ maxWidth: 100, maxHeight: 100 }))
                    _this.infoWindow.setContent(template)
                    _this.infoWindow.open(_this.map, marker)
                })
                
                
            },

            handleLocationError(browserHasGeolocation, infoWindow, pos) {
                infoWindow.setPos(pos);
                infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
                infoWindow.open(map)
            }
        }
    }

</script>

<style>
    #mapview {
        height: 100vh;
    }

    html,
    body {
        height: 100%;
        margin: 0;
        padding: 0;
    }


    /* .gm-style-iw {
        width: 350px !important;
        top: 15px !important;
        left: 0px !important;
        background-color: #fff;
        box-shadow: 0 1px 6px rgba(178, 178, 178, 0.6);
        border: 1px solid rgba(72, 181, 233, 0.6);
        border-radius: 2px 2px 10px 10px;
    }

    #iw-container {
        margin-bottom: 10px;
    }

    #iw-container .iw-title {
        font-family: 'Open Sans Condensed', sans-serif;
        font-size: 22px;
        font-weight: 400;
        padding: 10px;
        background-color: #48b5e9;
        color: white;
        margin: 0;
        border-radius: 2px 2px 0 0;
    }

    #iw-container .iw-content {
        font-size: 13px;
        line-height: 18px;
        font-weight: 400;
        margin-right: 1px;
        padding: 15px 5px 20px 15px;
        max-height: 140px;
        overflow-y: auto;
        overflow-x: hidden;
    }

    .iw-content img {
        float: right;
        margin: 0 5px 5px 10px;
    }

    .iw-subTitle {
        font-size: 16px;
        font-weight: 700;
        padding: 5px 0;
    }

    .iw-bottom-gradient {
        position: absolute;
        width: 326px;
        height: 25px;
        bottom: 10px;
        right: 18px;
        background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%);
        background: -webkit-linear-gradient(top, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%);
        background: -moz-linear-gradient(top, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%);
        background: -ms-linear-gradient(top, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%);
    } */
</style>