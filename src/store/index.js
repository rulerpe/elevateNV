import Vue from 'vue'
import Vuex from 'vuex'

import author from './author'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    author: author
  }
})
