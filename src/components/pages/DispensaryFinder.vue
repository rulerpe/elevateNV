<template>
  <v-container style="width: 100%; max-width: none;" class="pa-0 ma-0">
    <v-layout row>
      <v-flex sm3></v-flex>
      <v-flex sm9>
        <div id="mapid" :style="mapStyle"></div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Leaflet from 'leaflet'
import '../../../node_modules/leaflet/dist/leaflet.css'
export default {
  data () {
    return {
      mapStyle: {
        height: document.documentElement.clientHeight - 117 - 36 + 'px'
      }
    }
  },
  mounted () {
    var mymap = Leaflet.map('mapid').setView([51.505, -0.09], 13)
    Leaflet.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoiZWxldmF0ZW52IiwiYSI6ImNqYml6dnNnYjBhbHcyd2p2eXFvb2p1M2wifQ.50iom2BApYbuptk_SuiaEg'
    }).addTo(mymap)
  }
}
</script>
<style>
</style>
