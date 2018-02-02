import * as firebase from 'firebase'
import * as moment from 'moment'
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
      payload.shortname = payload.title.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-').toLowerCase().substring(0, 50)
      payload.createAt = Date.now()
      payload.updateAt = []
      payload.postDate = moment(payload.postDate).format('x')
      var categories = {}
      payload.categories.forEach((value) => {
        categories[value] = payload.createAt
      })
      let mainCategory = {}
      mainCategory[payload.mainCategory] = payload.createAt
      payload.mainCategory = mainCategory
      payload.categories = categories
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
          commit('setLoading', false)
        })
        .catch((error) => {
          commit('setLoading', false)
          console.log(error)
        })
    },
    loadPosts ({commit, getters}) {
      commit('setLoading', true)
      if (getters.posts.length <= 0) {
        firebase.firestore().collection('posts')
        .orderBy('postDate', 'desc')
        .get()
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
      firebase.firestore().collection('posts')
        .where('categories.' + 0, '>', 0)
        .orderBy('categories.' + 0, 'desc')
        .limit(3)
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
            commit('addPost', posts)
          }
          const today = moment().format('x')
          console.log(today)
          return firebase.firestore().collection('posts')
                  .orderBy('postDate', 'desc')
                  .limit(12)
                  .get()
        })
        .then((snapshot) => {
          let posts = []
          if (snapshot.docs.length > 0) {
            snapshot.forEach((doc) => {
              let obj = doc.data()
              if (!Object.keys(obj.categories).includes('0')) {
                posts.push({
                  ...obj,
                  id: doc.id
                })
              }
            })
            commit('addPost', posts)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    loadTopicPosts ({commit}, payload) {
      commit('clearPosts')
      commit('setLoading', true)
      const category = payload.replace(/-/g, ' ')
      firebase.firestore().collection('categories')
        .where('label', '==', category)
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
          var dateOrder = function (a, b) {
            return b.postDate - a.postDate
          }
          if (snapshot.docs.length > 0) {
            snapshot.forEach((doc) => {
              let obj = doc.data()
              posts.push({
                ...obj,
                id: doc.id
              })
            })
            posts.sort(dateOrder)
            commit('setLoadedPosts', posts)
            commit('setLoading', false)
          }
        })
        .catch((error) => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    loadPostFromAllTopic ({commit, getters}, payload) {
      commit('setLoading', true)
      commit('clearPosts')
      firebase.firestore().collection('categories').orderBy('value').get()
          .then((snapshot) => {
            var categories = []
            snapshot.forEach((doc) => {
              let obj = doc.data()
              categories.push({
                text: obj.label,
                value: obj.value,
                link: obj.label.replace(/\s+/g, '-')
              })
            })
            commit('setLoadedCategories', categories)
            return categories
          })
          .then((categories) => {
            if (payload.feature) {
              return firebase.firestore().collection('posts')
                .where('categories.' + 0, '>', 0)
                .orderBy('categories.' + 0, 'desc')
                .limit(3)
                .get()
            } else {
              return categories
            }
          })
          .then((returnedData) => {
            var categories = []
            if (payload.topics) {
              categories = payload.topics
              let posts = []
              if (returnedData.docs.length > 0) {
                returnedData.forEach((doc) => {
                  let obj = doc.data()
                  posts.push({
                    ...obj,
                    id: doc.id
                  })
                })
                commit('addPost', posts)
              }
            } else {
              categories = returnedData
              categories = categories.slice(2)
            }
            categories.forEach((category) => {
              firebase.firestore().collection('posts')
              .where('mainCategory.' + category.value, '>', 0)
              .orderBy('mainCategory.' + category.value)
              .limit(payload.limit)
              .get()
              .then((snapshot) => {
                let posts = []
                if (snapshot.docs.length > 0) {
                  snapshot.forEach((doc) => {
                    let obj = doc.data()
                    // do not query post that already downloaded as feature post
                    if (!payload.feature || !Object.keys(obj.categories).includes('0')) {
                      posts.push({
                        ...obj,
                        id: doc.id
                      })
                    }
                  })
                  commit('addPost', posts)
                }
              })
              .catch((error) => {
                console.log(error)
              })
            })
          })
          .catch((error) => {
            console.log(error)
          })
    },
    searchPost ({commit}, payload) {
      commit('setLoading', true)
      firebase.firestore().collection('posts')
        .where('shortname', '>=', payload)
        .get()
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
    },
    addPost ({commit}, payload) {
      commit('addPost', payload)
    },
    getRecommendPost ({commit}, payload) {
      firebase.firestore().collection('posts')
        .where('categories.' + payload.category, '>', 0)
        .orderBy('categories.' + payload.category)
        .limit(4)
        .get()
        .then((snapshot) => {
          let posts = []
          snapshot.forEach((doc) => {
            let obj = doc.data()
            posts.push({
              ...obj,
              id: doc.id
            })
          })
          commit('addPost', posts)
        })
    },
    editPost ({commit}, payload) {
      payload.new.updateAt.push(new Date())
      payload.new.postDate = moment(payload.new.postDate).format('x')
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
      commit('setLoading', true)
      if (postData.title) {
        postData.shortname = postData.title.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-').toLowerCase().substring(0, 50)
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
          commit('setLoading', false)
        })
        .catch((error) => {
          commit('setLoading', false)
          console.log(error)
        })
    },
    deletePost ({commit}, payload) {
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
                value: obj.value,
                link: obj.label.replace(/\s+/g, '-')
              })
            })
            commit('setLoadedCategories', categories)
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    clearPosts ({commit}) {
      commit('clearPosts')
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
