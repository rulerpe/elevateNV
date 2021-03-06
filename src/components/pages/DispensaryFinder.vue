<template>
  <v-container style="width: 100%; max-width: none;" class="pa-0 ma-0">
    <v-layout row>
      <v-flex v-show="listView" xs12 sm2 :style="listStyle">
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
      <v-flex v-show="mapView" xs12 sm10>
        <v-layout row class="mt-3" style="position: absolute; z-index: 999;">
          <v-flex sm8 offset-sm2>
            <ads-component size="long" :page="$route.name"></ads-component>
          </v-flex>
        </v-layout>
        <div id="mapid" :style="mapStyle"></div>
      </v-flex>
    </v-layout>
    <div v-if="mobile" :style="listToggleStyle">
      <v-layout row>
        <v-flex xs6 class="pa-2">
          <v-btn @click="listToggle('list')" block style="color: black" large color="primary">
            <v-icon class="mr-1">mdi-format-list-bulleted</v-icon>List View
          </v-btn>
        </v-flex>
        <v-flex xs6 class="pa-2">
          <v-btn @click="listToggle('map')" block style="color: black" large color="primary">
            <v-icon class="mr-1">mdi-map</v-icon>Map View
          </v-btn>
        </v-flex>
      </v-layout>
    </div>
  </v-container>
</template>

<script>
import Leaflet from 'leaflet'
import '../../../node_modules/leaflet/dist/leaflet.css'
export default {
  data () {
    return {
      mapStyle: {
        height: document.documentElement.clientHeight - 117 + 'px',
        'z-index': 0
      },
      listStyle: {
        'margin-top': '0',
        height: document.documentElement.clientHeight - 117 + 'px',
        overflow: 'scroll'
      },
      listToggleStyle: {
        position: 'absolute',
        bottom: '50px',
        width: document.documentElement.clientWidth + 'px'
      },
      mapView: true,
      listView: true,
      myMap: {},
      popup: {}
    }
  },
  metaInfo () {
    return {
      // eslint-disable-next-line
      title: 'Dispensary Finder',
      meta: [
        {name: 'twitter:card', content: 'summary'},
        {name: 'twitter:title', content: 'Dispensary Finder'},
        {name: 'twitter:description', content: 'Find dispensary in LasVegas'},
        {name: 'twitter:image', content: 'https://firebasestorage.googleapis.com/v0/b/elevatenv-dev.appspot.com/o/other%2Fdownload.png?alt=media&token=da4513f5-8808-4646-aae3-7ce8877f834f'},
        {name: 'twitter:site', content: '@elevateNV'},
        {name: 'twitter:creator', content: '@elevateNV'},
        {property: 'og:type', content: 'article'},
        // change url on production
        {property: 'og:url', content: 'https://elevatenv.com' + window.location.pathname},
        {property: 'og:title', content: 'Dispensary Finder'},
        {property: 'og:description', content: 'Find dispensary in LasVegas'},
        {property: 'og:image', content: 'https://firebasestorage.googleapis.com/v0/b/elevatenv-dev.appspot.com/o/other%2Fdownload.png?alt=media&token=da4513f5-8808-4646-aae3-7ce8877f834f'}
      ]
    }
  },
  methods: {
    getBackground (index) {
      return {'dispensaryListBackground': index % 2}
    },
    findOnMap (dispensary) {
      if (this.mobile) {
        if (dispensary.detailUrl) {
          this.$router.push(dispensary.detailUrl)
        } else {
          window.open(dispensary.website)
        }
      } else {
        var geo = dispensary.geo.split(',')
        this.popup[dispensary.id]
          .setLatLng([geo[0], geo[1]])
          .openOn(this.myMap)
        this.myMap.setView([geo[0], geo[1]], 11)
      }
    },
    listToggle (view) {
      if (view === 'map') {
        this.mapView = true
        this.listView = false
      } else {
        this.mapView = false
        this.listView = true
      }
    }
  },
  computed: {
    mobile () {
      return this.$store.getters.mobile
    },
    dispensaries () {
      var sortByName = (a, b) => {
        if (a.shortName.charAt(0) > b.shortName.charAt(0)) {
          return 1
        }
        if (a.shortName.charAt(0) < b.shortName.charAt(0)) {
          return -1
        }
        return 0
      }
      var dispensariesList = this.$store.getters.dispensaries
      dispensariesList = dispensariesList.sort(sortByName)
      var MarkerIcon = Leaflet.Icon.extend({
        options: {
          iconSize: [50, 50],
          iconAnchor: [25, 50],
          popupAnchor: [0, -50]
        }
      })
      dispensariesList.forEach(function (dispensary) {
        var geo = dispensary.geo.split(',')
        const url = dispensary.detailUrl || dispensary.website
        this.popup[dispensary.id] = Leaflet.popup({closeButton: false})
          .setContent(`<a style="text-decoration: none" target="_blank" href="${url}">
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
        var theicon = new MarkerIcon({iconUrl: require('../../assets/marker.svg')})
        Leaflet.marker([geo[0], geo[1]], {icon: theicon}).addTo(this.myMap).bindPopup(this.popup[dispensary.id])
      }, this)
      return dispensariesList
    }
  },
  mounted () {
    this.$store.dispatch('loadDispensaries')
    let mapSetting = {
      center: [36.153198, -115.174281],
      zoom: 11
    }
    let titleLayerSetting = {
      attribution: '© <a href="http://openstreetmap.org">OpenStreetMap</a>,© <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoiZWxldmF0ZW52IiwiYSI6ImNqYml6dnNnYjBhbHcyd2p2eXFvb2p1M2wifQ.50iom2BApYbuptk_SuiaEg'
    }
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      mapSetting.zoomControl = false
      this.mapStyle.height = document.documentElement.clientHeight - 56 + 'px'
      this.listStyle.height = document.documentElement.clientHeight - 56 + 'px'
      this.listStyle.overflow = 'heidden'
      this.listView = false
    }
    this.myMap = Leaflet.map('mapid', mapSetting)
    Leaflet.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', titleLayerSetting).addTo(this.myMap)
  }
}
</script>
<style>
</style>
