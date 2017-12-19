import * as firebase from 'firebase'
require('firebase/firestore')

export default{
  state: {
    posts: [],
    categories: []
  },
  mutations: {
    setLoadedPosts (state, payload) {
      state.posts = payload
    },
    addPost (state, payload) {
      state.posts = state.posts.concat(payload)
    },
    deletePost (state, payload) {
      state.posts.splice(state.posts.indexOf(payload.id), 1)
    },
    setLoadedCategories (state, payload) {
      state.categories = payload
    },
    clearPosts (state) {
      state.posts = []
    }
  },
  actions: {
    newPost ({commit}, payload) {
      let postId = ''
      commit('setLoading', true)
      payload.shortname = payload.title.replace(/\s+/g, '-').toLowerCase()
      payload.createAt = Date.now()
      payload.updateAt = []
      var categories = {}
      payload.categories.forEach((value) => {
        categories[value] = payload.createAt
      })
      let mainCategory = {}
      mainCategory[payload.mainCategory] = payload.createAt
      payload.mainCategory = mainCategory
      payload.categories = categories
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
    },
    loadPosts ({commit, getters}) {
      console.log('start loading')
      commit('setLoading', true)
      if (getters.posts.length <= 0) {
        firebase.firestore().collection('posts').get()
          .then((snapshot) => {
            const posts = []
            snapshot.forEach((doc) => {
              var obj = doc.data()
              posts.push({
                ...obj,
                id: doc.id
              })
            })
            commit('setLoadedPosts', posts)
            commit('setLoading', false)
          })
          .catch((error) => {
            commit('setLoading', false)
            console.log(error)
          })
      }
    },
    loadHomePagePosts ({commit}, payload) {
      commit('setLoading', true)
      payload.forEach((category) => {
        firebase.firestore().collection('posts')
        .where('mainCategory.' + category, '>', 0)
        .orderBy('mainCategory.' + category)
        .get()
        .then((snapshot) => {
          let posts = []
          if (snapshot.docs.length > 0) {
            snapshot.forEach((doc) => {
              let obj = doc.data()
              posts.push({
                ...obj,
                id: doc.id
              })
            })
            console.log(posts)
            commit('addPost', posts)
          }
        })
        .catch((error) => {
          console.log(error)
        })
      })
    },
    loadTopicPosts ({commit}, payload) {
      commit('clearPosts')
      commit('setLoading', true)
      firebase.firestore().collection('categories')
        .where('label', '==', payload)
        .get()
        .then((snapshot) => {
          const topic = snapshot.docs[0].data().value
          return firebase.firestore().collection('posts')
            .where('categories.' + topic, '>', 0)
            .orderBy('categories.' + topic)
            .get()
        })
        .then((snapshot) => {
          let posts = []
          if (snapshot.docs.length > 0) {
            snapshot.forEach((doc) => {
              let obj = doc.data()
              posts.push({
                ...obj,
                id: doc.id
              })
            })
            console.log(posts)
            commit('setLoadedPosts', posts)
            commit('setLoading', false)
          }
        })
        .catch((error) => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    editPost ({commit}, payload) {
      payload.new.updateAt.push(new Date())
      console.log(payload)
      var categories = {}
      if (payload.new.categories) {
        payload.new.categories.forEach((value) => {
          categories[value] = payload.new.createAt
        })
        payload.new.categories = categories
      }
      let mainCategory = {}
      mainCategory[payload.new.mainCategory] = payload.new.createAt
      payload.new.mainCategory = mainCategory
      const postData = {}
      for (const key in payload.new) {
        if (payload.new[key] !== payload.orginal[key]) {
          postData[key] = payload.new[key]
        }
      }
      console.log(postData)
      commit('setLoading', true)
      if (postData.title) {
        postData.shortname = postData.title.replace(/\s+/g, '-').toLowerCase()
      }
      firebase.firestore().collection('posts').doc(payload.orginal.id).update(postData)
        .then(() => {
          if (postData.author) {
            return firebase.firestore().collection('authors').doc(payload.orginal.author).get()
                    .then((data) => {
                      let posts = data.data().posts
                      posts.splice(posts.indexOf(payload.orginal.id), 1)
                      return posts
                    })
                    .then((posts) => {
                      return firebase.firestore().collection('authors').doc(payload.orginal.author).update({
                        posts: posts
                      })
                    })
                    .then(() => {
                      return firebase.firestore().collection('authors').doc(postData.author).get()
                    })
                    .then((data) => {
                      let posts = data.data().posts
                      posts.push(payload.orginal.id)
                      return firebase.firestore().collection('authors').doc(postData.author).update({
                        posts: posts
                      })
                    })
          } else {
            return null
          }
        })
        .then(() => {
          console.log('post udpated')
          commit('setLoading', false)
        })
        .catch((error) => {
          commit('setLoading', false)
          console.log(error)
        })
    },
    deletePost ({commit}, payload) {
      console.log('delete', payload)
      firebase.firestore().collection('posts').doc(payload.id).delete()
        .then(() => {
          return firebase.firestore().collection('authors').doc(payload.author).get()
        })
        .then((data) => {
          let posts = data.data().posts
          posts.splice(posts.indexOf(payload.id), 1)
          return posts
        })
        .then((posts) => {
          return firebase.firestore().collection('authors').doc(payload.author).update({
            posts: posts
          })
        })
        .then(() => {
          console.log('deleted')
          commit('deletePost', payload)
          commit('setLoading', false)
        })
        .catch((error) => {
          commit('setLoading', false)
          console.log(error)
        })
    },
    loadCategories ({commit, getters}) {
      if (getters.categories.length <= 0) {
        firebase.firestore().collection('categories').orderBy('label').get()
          .then((snapshot) => {
            var categories = []
            snapshot.forEach((doc) => {
              let obj = doc.data()
              categories.push({
                text: obj.label,
                value: obj.value
              })
            })
            commit('setLoadedCategories', categories)
          })
          .catch((error) => {
            console.log(error)
          })
      }
    }
  },
  getters: {
    posts (state) {
      return state.posts
    },
    categories (state) {
      return state.categories
    }

  }
}
