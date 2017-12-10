import * as firebase from 'firebase'
require('firebase/firestore')

export default{
  state: {

  },
  mutations: {
  },
  actions: {
    newPost ({commit}, payload) {
      let postId = ''
      commit('setLoading', true)
      console.log(payload)
      firebase.firestore().collection('posts').add(payload)
        .then((data) => {
          postId = data.id
          return firebase.firestore().collection('authors').doc(payload.author).get()
        })
        .then((data) => {
          let posts = data.data().posts
          posts.push(postId)
          return firebase.firestore().collection('authors').doc(payload.author).update({
            posts: posts
          })
        })
        .then(() => {
          console.log('postadded')
          commit('setLoading', false)
        })
        .catch((error) => {
          commit('setLoading', false)
          console.log(error)
        })
    }
  },
  getters: {
  }
}
