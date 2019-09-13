import 'es6-promise/auto'
import Vue from 'vue'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'

import VueScrollTo from 'vue-scrollto'
import * as firebase from 'firebase'

import lodash from 'lodash'
import VueLodash from 'vue-lodash'

import SocialSharing from 'vue-social-sharing'

import Meta from 'vue-meta'

import './assets/css/custom.css'
import '../node_modules/mdi/css/materialdesignicons.min.css'
import App from './App'
import router from './router'
import { store } from './store'
import PostTile from './components/pages/homepage/HomePageTile.vue'
import IssuuComponent from './components/pages/IssuuComponent.vue'
import AdsComponent from './components/pages/AdsComponent.vue'

Vue.use(Vuetify, { theme: {
  primary: '#e0e0e0',
  secondary: '#81c784',
  accent: '#424242',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107'
}})
Vue.use(VueScrollTo)
Vue.use(VueLodash, lodash)
Vue.use(SocialSharing)
Vue.use(Meta)

Vue.component('elevate-post-tile', PostTile)
Vue.component('issuu-component', IssuuComponent)
Vue.component('ads-component', AdsComponent)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyAy3NuMC7MwTFmJdFW2TGERamlm3F3IFmM',
      authDomain: 'elevatenv-dev.firebaseapp.com',
      databaseURL: 'https://elevatenv-dev.firebaseio.com',
      projectId: 'elevatenv-dev',
      storageBucket: 'elevatenv-dev.appspot.com',
      messagingSenderId: '222851738472'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
  }
})
