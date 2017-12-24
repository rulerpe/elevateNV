export default{
  state: {
    loading: false,
    error: null,
    mobile: false
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    setMobile (state, payload) {
      state.mobile = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    clearError ({commit}) {
      commit('clearError')
    },
    setMobile ({commit}) {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        commit('setMobile', true)
      } else {
        commit('setMobile', false)
      }
    }
  },
  getters: {
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    },
    mobile (state) {
      return state.mobile
    }
  }
}
