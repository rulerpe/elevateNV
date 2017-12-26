import * as firebase from 'firebase'
require('firebase/firestore')

export default{
  state: {
    subscribes: [],
    subscribeStatus: 'none'
  },
  mutations: {
    setLoadedsubscribes (state, payload) {
      state.subscribes = payload
    },
    newsubscribe (state, payload) {
      console.log('newsubscribe', payload)
      state.subscribes.push(payload)
    },
    deletesubscribe (state, payload) {
      var subscribes = state.subscribes
      subscribes.splice(subscribes.findIndex(subscribe => subscribe.id === payload.id), 1)
    },
    loadsubscribe (state, payload) {
      state.subscribes.push(payload)
    },
    setSubscribeStatus (state, payload) {
      state.subscribeStatus = payload
    }
  },
  actions: {
    newSubscribe ({commit}, payload) {
      console.log('action', payload)
      commit('setSubscribeStatus', 'start')
      commit('setLoading', true)
      payload.createAt = firebase.firestore.FieldValue.serverTimestamp()
      firebase.firestore().collection('subscriptions').add(payload)
        .then((data) => {
          commit('setSubscribeStatus', 'success')
          commit('setLoading', false)
        })
        .catch((error) => {
          console.log(error)
          commit('setSubscribeStatus', 'fail')
          commit('setLoading', false)
        })
    },
    setSubscribeStatus ({commit}, payload) {
      commit('setSubscribeStatus', payload)
    }
    // loadDispensaries ({commit, getters}) {
    //   commit('setLoading', true)
    //   if (getters.dispensaries.length <= 0) {
    //     firebase.firestore().collection('dispensaries').get()
    //       .then((snapshot) => {
    //         const dispensaries = []
    //         snapshot.forEach((doc) => {
    //           var obj = doc.data()
    //           dispensaries.push({
    //             id: doc.id,
    //             name: obj.name,
    //             shortName: obj.shortName,
    //             website: obj.website,
    //             phone: obj.phone,
    //             address: obj.address,
    //             geo: obj.geo,
    //             ads: obj.ads,
    //             detailUrl: obj.detailUrl,
    //             imageUrl: obj.imageUrl,
    //             imageName: obj.imageName
    //           })
    //         })
    //         commit('setLoadedDispensaries', dispensaries)
    //         commit('setLoading', false)
    //       })
    //       .catch((error) => {
    //         commit('setLoading', false)
    //         console.log(error)
    //       })
    //   }
    // },
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
    // updateDispensary ({commit, getters}, payload) {
    //   commit('setLoading', true)
    //   const uploadObj = payload.data
    //   uploadObj.shortName = payload.data.name.replace(/\s+/g, '-').toLowerCase()
    //   let imageUrl
    //   let ext
    //   firebase.firestore().collection('dispensaries').doc(payload.data.id).update(uploadObj)
    //     .then(() => {
    //       if (payload.image !== null) {
    //         const filename = payload.image.name
    //         ext = filename.slice(filename.lastIndexOf('.'))
    //         console.log(payload.image)
    //         return firebase.storage().ref().child('/dispensaries/' + payload.data.imageName).delete()
    //                 .then(() => {
    //                   return firebase.storage().ref().child('dispensaries/' + payload.data.id + ext).put(payload.image)
    //                 })
    //       } else {
    //         return null
    //       }
    //     })
    //     .then((fileData) => {
    //       if (fileData !== null) {
    //         imageUrl = fileData.downloadURL
    //         return firebase.firestore().collection('dispensaries').doc(payload.data.id).update({
    //           imageUrl: imageUrl,
    //           imageName: uploadObj.id + ext
    //         })
    //       }
    //     })
    //     .then(() => {
    //       if (imageUrl) {
    //         uploadObj.imageUrl = imageUrl
    //         uploadObj.imageName = payload.id + ext
    //       }
    //       commit('updateDispensary', uploadObj)
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //       commit('setLoading', false)
    //     })
    // },
    // deleteDispensary ({commit}, payload) {
    //   firebase.firestore().collection('dispensaries').doc(payload.id).delete()
    //     .then(() => {
    //       console.log('remove image')
    //       if (payload.imageName !== 'default.jpg') {
    //         return firebase.storage().ref().child('/dispensaries/' + payload.imageName).delete()
    //       }
    //     })
    //     .then(() => {
    //       commit('deleteDispensary', payload)
    //       console.log('deleted')
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //     })
    // }
  },
  getters: {
    subscribes (state) {
      return state.subscribes.sort((subscribeA, subscribeB) => {
        return subscribeA.name < subscribeB.name
      })
    },
    subscribeStatus (state) {
      return state.subscribeStatus
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
