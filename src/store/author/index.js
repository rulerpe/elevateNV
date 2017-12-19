import * as firebase from 'firebase'
require('firebase/firestore')

export default{
  state: {
    authors: []
  },
  mutations: {
    setLoadedAuthors (state, payload) {
      state.authors = payload
    },
    addNewAuthor (state, payload) {
      console.log('addnewauthor', payload)
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
      authors.splice(authors.findIndex(author => author.id === payload.id), 1)
    },
    loadAuthor (state, payload) {
      state.authors.push(payload)
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
      var additionalData = {}
      let id
      let ext
      let defulatAvatar = {
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/elevatenv-dev.appspot.com/o/authors%2Fdefault.jpg?alt=media&token=de254fb8-9b6e-48e0-953d-c8e3b60eeaa5',
        imageName: 'default.jpg'
      }
      firebase.firestore().collection('authors').add(author)
        .then((data) => {
          id = data.id
          return id
        })
        .then(id => {
          if (payload.image === 'default') {
            return null
          }
          const filename = payload.image.name
          ext = filename.slice(filename.lastIndexOf('.'))
          console.log(payload.image)
          return firebase.storage().ref().child('authors/' + id + '.' + ext).put(payload.image)
        })
        .then(fileData => {
          console.log('filedata ', fileData)
          if (fileData === null) {
            additionalData = defulatAvatar
          } else {
            additionalData = {
              imageUrl: fileData.downloadURL,
              imageName: id + '.' + ext
            }
          }
          return firebase.firestore().collection('authors').doc(id).update({
            ...additionalData,
            posts: []
          })
        })
        .then(() => {
          commit('addNewAuthor', {
            ...author,
            ...additionalData,
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
    loadAuthors ({commit, getters}) {
      commit('setLoading', true)
      if (getters.authors.length <= 0) {
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
      }
    },
    loadAuthor ({commit}, payload) {
      firebase.firestore().collection('authors').doc(payload).get()
        .then((doc) => {
          const obj = doc.data()
          const author = {
            id: doc.id,
            name: obj.name,
            bio: obj.bio,
            imageUrl: obj.imageUrl,
            imageName: obj.imageName,
            posts: obj.posts
          }
          commit('loadAuthor', author)
        })
        .catch((error) => {
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
          if (payload.image !== null && payload.imageName !== 'default.jpg') {
            const filename = payload.image.name
            ext = filename.slice(filename.lastIndexOf('.'))
            console.log(payload.image)
            return firebase.storage().ref().child('/authors/' + payload.imageName).delete()
                    .then(() => {
                      return firebase.storage().ref().child('authors/' + payload.id + '.' + ext).put(payload.image)
                    })
          } else if (payload.imageName === 'default.jpg') {
            return firebase.storage().ref().child('authors/' + payload.id + '.' + ext).put(payload.image)
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
          if (payload.imageName !== 'default.jpg') {
            return firebase.storage().ref().child('/authors/' + payload.imageName).delete()
          }
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
      return (authorId) => {
        return state.authors.find((author) => {
          return author.id === authorId
        })
      }
    }

  }
}
