import Vue from 'vue'
import Vuex from 'vuex'

import author from './author'
import post from './post'
import dispensary from './dispensary'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    author: author,
    post: post,
    dispensary: dispensary
  }
})
