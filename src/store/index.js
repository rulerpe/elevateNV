import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
require('firebase/firestore')

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    authors: [],
    loading: false,
    errot: null
  },
  mutations: {
    setLoadedAuthors (state, payload) {
      state.authors = payload
    },
    addNewAuthor (state, payload) {
      state.authors.push(payload)
    },
    updateAuthor (state, payload) {
      const author = state.authors.find(author => {
        return author.id === payload.id
      })
      for (const prop in payload) {
        author[prop] = payload[prop]
      }
    },
    deleteAuthor (state, payload) {
      var authors = state.authors
      authors.splice(authors.findIndex(author => author.id === payload), 1)
    },
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    addNewAuthor ({commit}, payload) {
      console.log('action', payload)
      commit('setLoading', true)
      const author = {
        name: payload.name,
        bio: payload.bio
      }
      let imageUrl
      let id
      let ext
      firebase.firestore().collection('authors').add(author)
        .then((data) => {
          id = data.id
          return id
        })
        .then(id => {
          const filename = payload.image.name
          ext = filename.slice(filename.lastIndexOf('.'))
          console.log(payload.image)
          return firebase.storage().ref().child('authors/' + id + '.' + ext).put(payload.image)
        })
        .then(fileData => {
          imageUrl = fileData.downloadURL
          return firebase.firestore().collection('authors').doc(id).update({
            imageUrl: imageUrl,
            imageName: id + '.' + ext,
            posts: []
          })
        })
        .then(() => {
          commit('addNewAuthor', {
            ...author,
            imageUrl: imageUrl,
            id: id,
            posts: []
          })
          commit('setLoading', false)
        })
        .catch((error) => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    loadAuthors ({commit}) {
      commit('setLoading', true)
      firebase.firestore().collection('authors').get()
        .then((snapshot) => {
          const authors = []
          snapshot.forEach((doc) => {
            var obj = doc.data()
            authors.push({
              id: doc.id,
              name: obj.name,
              bio: obj.bio,
              imageUrl: obj.imageUrl,
              imageName: obj.imageName,
              posts: obj.posts
            })
          })
          commit('setLoadedAuthors', authors)
          commit('setLoading', false)
        })
        .catch((error) => {
          commit('setLoading', false)
          console.log(error)
        })
    },
    updateAuthor ({commit, getters}, payload) {
      commit('setLoading', true)
      const uploadObj = {}
      uploadObj.name = payload.name
      uploadObj.bio = payload.bio
      let imageUrl
      let ext
      firebase.firestore().collection('authors').doc(payload.id).update(uploadObj)
        .then(() => {
          if (payload.image !== null) {
            const filename = payload.image.name
            ext = filename.slice(filename.lastIndexOf('.'))
            console.log(payload.image)
            return firebase.storage().ref().child('/authors/' + payload.imageName).delete()
                    .then(() => {
                      return firebase.storage().ref().child('authors/' + payload.id + '.' + ext).put(payload.image)
                    })
          }
        })
        .then((fileData) => {
          if (fileData !== undefined) {
            imageUrl = fileData.downloadURL
            return firebase.firestore().collection('authors').doc(payload.id).update({
              imageUrl: imageUrl,
              imageName: payload.id + '.' + ext
            })
          }
        })
        .then(() => {
          uploadObj.id = payload.id
          if (imageUrl) {
            uploadObj.imageUrl = imageUrl
            uploadObj.imageName = payload.id + '.' + ext
          }
          commit('updateAuthor', uploadObj)
        })
        .catch((error) => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    deleteAuthor ({commit}, payload) {
      firebase.firestore().collection('authors').doc(payload.id).delete()
        .then(() => {
          console.log('remove image')
          return firebase.storage().ref().child('/authors/' + payload.imageName).delete()
        })
        .then(() => {
          commit('deleteAuthor', payload)
          console.log('deleted')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  getters: {
    authors (state) {
      return state.authors.sort((authorA, authorB) => {
        return authorA.name < authorB.name
      })
    },
    author (state) {

    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }

  }
})
