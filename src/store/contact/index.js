import * as firebase from 'firebase'
require('firebase/firestore')

export default{
  state: {
    feedbacks: [],
    contactStatus: 'none'
  },
  mutations: {
    setLoadedFeedbacks (state, payload) {
      state.feedbacks = payload
    },
    newFeedback (state, payload) {
      console.log('newFeedback', payload)
      state.feedbacks.push(payload)
    },
    deleteFeedback (state, payload) {
      var feedbacks = state.feedbacks
      feedbacks.splice(feedbacks.findIndex(feedback => feedback.id === payload.id), 1)
    },
    loadFeedback (state, payload) {
      state.feedbacks.push(payload)
    },
    setContactStatus (state, payload) {
      state.contactStatus = payload
    }
  },
  actions: {
    newFeedback ({commit}, payload) {
      commit('setContactStatus', 'start')
      commit('setLoading', true)
      payload.createAt = firebase.firestore.FieldValue.serverTimestamp()
      firebase.firestore().collection('feedbacks').add(payload)
        .then((data) => {
          commit('setContactStatus', 'success')
          commit('setLoading', false)
        })
        .catch((error) => {
          console.log(error)
          commit('setContactStatus', 'fail')
          commit('setLoading', false)
        })
    },
    setContactStatus ({commit}, payload) {
      commit('setContactStatus', payload)
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
    feedbacks (state) {
      return state.feedbacks.sort((feedbackA, feedbackB) => {
        return feedbackA.name < feedbackB.name
      })
    },
    contactStatus (state) {
      return state.contactStatus
    }
  }
}
