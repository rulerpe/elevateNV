<template>
  <v-container style="width: 100%; max-width: none;" class="pa-0 ma-0">
    <v-layout row>
      <v-flex hidden-xs-only sm2>
        <v-list two-line>
          <template v-for="(dispensary, index) in dispensaries">
            <v-list-tile avatar v-bind:key="dispensary.name" :class="getBackground(index)" @click="findOnMap(dispensary)">
              <v-list-tile-avatar>
                <img v-bind:src="dispensary.imageUrl" :alt="dispensary.name">
              </v-list-tile-avatar>
              <v-list-tile-content style="cursor: pointer;">
                <v-list-tile-title v-html="dispensary.name"></v-list-tile-title>
                <v-list-tile-sub-title v-html="dispensary.address"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-flex>
      <v-flex xs12 sm10>
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
      },
      myMap: {},
      popup: {}
    }
  },
  methods: {
    getBackground (index) {
      return {'dispensaryListBackground': index % 2}
    },
    findOnMap (dispensary) {
      var geo = dispensary.geo.split(',')
      this.popup[dispensary.id]
        .setLatLng([geo[0], geo[1]])
        .openOn(this.myMap)
      this.myMap.setView([geo[0], geo[1]], 11);
    }
  },
  computed: {
    dispensaries () {
      var dispensariesList = this.$store.getters.dispensaries
      var MarkerIcon = Leaflet.Icon.extend({
        options: {
          iconSize: [50, 50],
          iconAnchor: [25, 50],
          popupAnchor: [0, -50]
        }
      })
      dispensariesList.forEach(function (dispensary) {
        console.log(MarkerIcon)
        var geo = dispensary.geo.split(',')
        this.popup[dispensary.id] = Leaflet.popup({closeButton: false})
          .setContent(`<a style="text-decoration: none" href="${dispensary.website}">
          <div style="display: flex;align-items:center">
            <div style="flex-basis: 30%;align-self:center">
              <img style="width:100%" src="${dispensary.imageUrl}" alt="${dispensary.name}">
            </div>
            <div style="flex-basis: 70%; padding: 5px;align-self:center; display: flex;flex-direction: column">
              <div style="">
                <h3>${dispensary.name}</h3>
              </div>
              <div style="">
                <p style="margin:0">${dispensary.address}</p>
              </div>
            </div>
          </div>
        </a>`)
        console.log(geo)
        var theicon = new MarkerIcon({iconUrl: require('../../assets/marker.svg')})
        Leaflet.marker([geo[0], geo[1]], {icon: theicon}).addTo(this.myMap).bindPopup(this.popup[dispensary.id])
      }, this)
      return dispensariesList
    }
  },
  mounted () {
    this.$store.dispatch('loadDispensaries')
    this.myMap = Leaflet.map('mapid').setView([36.153198, -115.174281], 11)
    Leaflet.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoiZWxldmF0ZW52IiwiYSI6ImNqYml6dnNnYjBhbHcyd2p2eXFvb2p1M2wifQ.50iom2BApYbuptk_SuiaEg'
    }).addTo(this.myMap)
  }
}
</script>
<style>
</style>
