import Vue from 'vue'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'

import VueScrollTo from 'vue-scrollto'
import * as firebase from 'firebase'

import './assets/css/custom.css'
import '../node_modules/mdi/css/materialdesignicons.min.css'
import App from './App'
import router from './router'
import { store } from './store'

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
  }
})
