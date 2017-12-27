import Vue from 'vue'
import Vuex from 'vuex'

import author from './author'
import post from './post'
import dispensary from './dispensary'
import shared from './shared'
import contact from './contact'
import subscribe from './subscribe'
import ads from './ads'
import auth from './auth'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    author: author,
    post: post,
    dispensary: dispensary,
    shared: shared,
    contact: contact,
    subscribe: subscribe,
    ads: ads,
    auth: auth
  }
})
