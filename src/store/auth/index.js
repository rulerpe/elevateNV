import * as firebase from 'firebase'
require('firebase/firestore')

export default{
  state: {
    user: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    // signUserUp ({commit}, payload) {
    //   commit('setLoading', true)
    //   commit('clearError')
    //   console.log(DefaultUserProfile)
    //   firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
    //     .then(
    //       user => {
    //         firebase.firestore().collection('users').doc(user.uid).set(DefaultUserProfile)
    //           .then(() => {
    //             commit('setLoading', false)
    //             const newUser = {
    //               id: user.uid,
    //               registeredMeetups: [],
    //               userName: DefaultUserProfile.userName,
    //               avatar: DefaultUserProfile.avatar,
    //               fbKeys: {}
    //             }
    //             console.log(newUser)
    //             commit('setUser', newUser)
    //           })
    //           .catch(
    //             error => {
    //               console.log(error)
    //               commit('setLoading', false)
    //             }
    //           )
    //       }
    //     )
    //     .catch(
    //       error => {
    //         commit('setLoading', false)
    //         commit('setError', error)
    //         console.log(error)
    //       }
    //     )
    // },
    userLogin ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {
        id: payload.uid
      })
    },

    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    }

  },
  getters: {
    user (state) {
      return state.user
    }
  }
}
