import * as firebase from 'firebase'
require('firebase/firestore')

export default{
  state: {
    ads: []
  },
  mutations: {
    setLoadedAds (state, payload) {
      state.ads = payload
    },
    newAds (state, payload) {
      state.ads.push(payload)
    },
    updateAds (state, payload) {
      const ad = state.ads.find(ad => {
        return ad.id === payload.id
      })
      for (const prop in payload) {
        ad[prop] = payload[prop]
      }
    },
    deleteAds (state, payload) {
      var ads = state.ads
      ads.splice(ads.findIndex(ad => ad.id === payload.id), 1)
    },
    loadAds (state, payload) {
      state.ads.push(payload)
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
    newAds ({commit}, payload) {
      commit('setLoading', true)
      payload.data.createAt = firebase.firestore.FieldValue.serverTimestamp()
      const ads = {
        ...payload.data
      }
      var additionalData = {}
      let id
      let ext
      let defulatLogo = {
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/elevatenv-dev.appspot.com/o/authors%2Fdefault.jpg?alt=media&token=de254fb8-9b6e-48e0-953d-c8e3b60eeaa5',
        imageName: 'default.jpg'
      }
      firebase.firestore().collection('ads').add(ads)
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
          return firebase.storage().ref().child('ads/' + id + ext).put(payload.image)
        })
        .then(fileData => {
          if (fileData === null) {
            additionalData = defulatLogo
          } else {
            additionalData = {
              imageUrl: fileData.downloadURL,
              imageName: id + ext
            }
          }
          return firebase.firestore().collection('ads').doc(id).update({
            ...additionalData
          })
        })
        .then(() => {
          commit('newAds', {
            ...ads,
            ...additionalData,
            id: id
          })
          commit('setLoading', false)
        })
        .catch((error) => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    loadAds ({commit, getters}) {
      commit('setLoading', true)
      if (getters.ads.length <= 0) {
        firebase.firestore().collection('ads').get()
          .then((snapshot) => {
            const ads = []
            snapshot.forEach((doc) => {
              var obj = doc.data()
              ads.push({
                ...obj,
                id: doc.id
              })
            })
            commit('setLoadedAds', ads)
            commit('setLoading', false)
          })
          .catch((error) => {
            commit('setLoading', false)
            console.log(error)
          })
      }
    },
    // loadAuthor ({commit}, payload) {
    //   firebase.firestore().collection('authors').doc(payload).get()
    //     .then((doc) => {
    //       const obj = doc.data()
    //       const author = {
    //         id: doc.id,
    //         name: obj.name,
    //         bio: obj.bio,
    //         imageUrl: obj.imageUrl,
    //         imageName: obj.imageName,
    //         posts: obj.posts
    //       }
    //       commit('loadAuthor', author)
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //     })
    // },
    updateAds ({commit, getters}, payload) {
      commit('setLoading', true)
      const uploadObj = {
        title: payload.data.title,
        link: payload.data.link,
        type: payload.data.type
      }
      let imageUrl
      let ext
      firebase.firestore().collection('ads').doc(payload.data.id).update(uploadObj)
        .then(() => {
          if (payload.image !== null && payload.data.imageName !== 'default.jpg') {
            const filename = payload.image.name
            ext = filename.slice(filename.lastIndexOf('.'))
            return firebase.storage().ref().child('/ads/' + payload.data.imageName).delete()
                    .then(() => {
                      return firebase.storage().ref().child('/ads/' + payload.data.id + '.' + ext).put(payload.image)
                    })
          } else if (payload.data.imageName === 'default.jpg') {
            return firebase.storage().ref().child('/ads/' + payload.data.id + '.' + ext).put(payload.image)
          }
        })
        .then((fileData) => {
          if (fileData !== undefined) {
            imageUrl = fileData.downloadURL
            return firebase.firestore().collection('ads').doc(payload.data.id).update({
              imageUrl: imageUrl,
              imageName: payload.data.id + '.' + ext
            })
          }
        })
        .then(() => {
          uploadObj.id = payload.data.id
          if (imageUrl) {
            uploadObj.imageUrl = imageUrl
            uploadObj.imageName = payload.data.id + '.' + ext
          }
          commit('updateAuthor', uploadObj)
        })
        .catch((error) => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    deleteAds ({commit}, payload) {
      firebase.firestore().collection('ads').doc(payload.id).delete()
        .then(() => {
          if (payload.imageName !== 'default.jpg') {
            return firebase.storage().ref().child('/ads/' + payload.imageName).delete()
          }
        })
        .then(() => {
          commit('deleteAds', payload)
          console.log('deleted')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  getters: {
    ads (state) {
      return state.ads.sort((adA, adB) => {
        return adA.name < adB.name
      })
    }
    // author (state) {
    //   return (authorId) => {
    //     return state.authors.find((author) => {
    //       return author.id === authorId
    //     })
    //   }
    // }

  }
}
