import * as firebase from 'firebase'
require('firebase/firestore')

export default{
  state: {
    dispensaries: []
  },
  mutations: {
    setLoadedDispensaries (state, payload) {
      state.dispensaries = payload
    },
    newDispensary (state, payload) {
      state.dispensaries.push(payload)
    },
    updateDispensary (state, payload) {
      const dispensary = state.dispensaries.find(dispensary => {
        return dispensary.id === payload.id
      })
      for (const prop in payload) {
        dispensary[prop] = payload[prop]
      }
    },
    deleteDispensary (state, payload) {
      var dispensaries = state.dispensaries
      dispensaries.splice(dispensaries.findIndex(dispensary => dispensary.id === payload.id), 1)
    },
    loadDispensary (state, payload) {
      state.dispensaries.push(payload)
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
    newDispensary ({commit}, payload) {
      commit('setLoading', true)
      payload.data.shortName = payload.data.name.replace(/\s+/g, '-').toLowerCase()
      const dispensary = {
        ...payload.data
      }
      var additionalData = {}
      let id
      let ext
      let defulatLogo = {
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/elevatenv-dev.appspot.com/o/authors%2Fdefault.jpg?alt=media&token=de254fb8-9b6e-48e0-953d-c8e3b60eeaa5',
        imageName: 'default.jpg'
      }
      firebase.firestore().collection('dispensaries').add(dispensary)
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
          return firebase.storage().ref().child('dispensaries/' + id + ext).put(payload.image)
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
          return firebase.firestore().collection('dispensaries').doc(id).update({
            ...additionalData
          })
        })
        .then(() => {
          commit('newDispensary', {
            ...dispensary,
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
    loadDispensaries ({commit, getters}) {
      commit('setLoading', true)
      if (getters.dispensaries.length <= 0) {
        firebase.firestore().collection('dispensaries').get()
          .then((snapshot) => {
            const dispensaries = []
            snapshot.forEach((doc) => {
              var obj = doc.data()
              dispensaries.push({
                id: doc.id,
                name: obj.name,
                shortName: obj.shortName,
                website: obj.website,
                phone: obj.phone,
                address: obj.address,
                geo: obj.geo,
                ads: obj.ads,
                detailUrl: obj.detailUrl,
                imageUrl: obj.imageUrl,
                imageName: obj.imageName
              })
            })
            commit('setLoadedDispensaries', dispensaries)
            commit('setLoading', false)
          })
          .catch((error) => {
            commit('setLoading', false)
            console.log(error)
          })
      }
    },
    updateDispensary ({commit, getters}, payload) {
      commit('setLoading', true)
      const uploadObj = {
        name: payload.data.name,
        website: payload.data.website,
        phone: payload.data.phone,
        address: payload.data.address,
        geo: payload.data.geo,
        detailUrl: payload.data.detailUrl
      }
      uploadObj.shortName = payload.data.name.replace(/\s+/g, '-').toLowerCase()
      let imageUrl
      let ext
      firebase.firestore().collection('dispensaries').doc(payload.data.id).update(uploadObj)
        .then(() => {
          if (payload.image !== null) {
            const filename = payload.image.name
            ext = filename.slice(filename.lastIndexOf('.'))
            if (payload.data.imageName) {
              return firebase.storage().ref().child('/dispensaries/' + payload.data.imageName).delete()
                    .then(() => {
                      return firebase.storage().ref().child('dispensaries/' + payload.data.id + ext).put(payload.image)
                    })
            } else {
              return firebase.storage().ref().child('dispensaries/' + payload.data.id + ext).put(payload.image)
            }
          } else {
            return null
          }
        })
        .then((fileData) => {
          if (fileData !== null) {
            imageUrl = fileData.downloadURL
            return firebase.firestore().collection('dispensaries').doc(payload.data.id).update({
              imageUrl: imageUrl,
              imageName: payload.data.id + ext
            })
          }
        })
        .then(() => {
          if (imageUrl) {
            uploadObj.imageUrl = imageUrl
            uploadObj.imageName = payload.id + ext
          }
          commit('updateDispensary', uploadObj)
        })
        .catch((error) => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    deleteDispensary ({commit}, payload) {
      firebase.firestore().collection('dispensaries').doc(payload.id).delete()
        .then(() => {
          if (payload.imageName !== 'default.jpg') {
            return firebase.storage().ref().child('/dispensaries/' + payload.imageName).delete()
          }
        })
        .then(() => {
          commit('deleteDispensary', payload)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  getters: {
    dispensaries (state) {
      return state.dispensaries.sort((dispensaryA, dispensaryB) => {
        return dispensaryA.name < dispensaryB.name
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
