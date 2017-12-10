import Vue from 'vue'
import Vuex from 'vuex'

import author from './author'
import post from './post'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    author: author,
    post: post
  }
})
