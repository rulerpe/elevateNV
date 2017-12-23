<template>
  <v-container class="pa-0 custom-layout" v-if = "post">
    <v-layout row class="mt-4" id="content">
      <v-flex hidden-xs-only sm1 style="position:relative"> 
        <div  
          :class="reachBottomSocial">
          <social-sharing :url="currentUrl"
                      :title="post.title"
                      :description="post.subtitle"
                      quote="Vue is a progressive framework for building user interfaces."
                      hashtags="marijuana,cannabis,weed"
                      twitter-user="rulerpe"
                      inline-template>
            <div>
              <div style="cursor: pointer">
                <network network="facebook">
                  <v-icon>mdi-facebook</v-icon>
                </network>
              </div>
              <div class="mt-3 mb-3" style="cursor: pointer">
                <network network="twitter">
                  <v-icon>mdi-twitter</v-icon>
                </network>
              </div>
              <div style="cursor: pointer">
                <network network="googleplus">
                  <v-icon>mdi-google-plus</v-icon>
                </network>
              </div>
            </div>
          </social-sharing>
        </div>
      </v-flex>
      <v-flex xs12 sm10>
        <v-container>
          <v-layout row>
            <v-flex xs12 style="display: flex;">
              <v-avatar size="60px" slot="activator">
                <img :src="post.author.imageUrl" alt="">
              </v-avatar>
              <v-content style="margin-left:10px">
                <div class="subheading">{{post.author.name}}</div>
                <div class="body-1">{{post.postDate}} . {{post.readtime}} min read</div>
              </v-content>
            </v-flex>
          </v-layout>
          <v-layout row class="pt-2 pb-2 post-content" v-if="post.showFeatureImage">
            <v-flex xs12>
              <img :src="post.featureImageUrl" :alt="post.shortname">
            </v-flex>
          </v-layout>
          <v-layout row class="pt-2 pb-2">
            <h3 class="display-2 hidden-xs-only" style="font-weight:500">{{post.title}}</h3>
            <h3 class="custom-headline display-1 hidden-sm-and-up" style="font-weight:500">{{post.title}}</h3>
          </v-layout>
          <v-layout row class=" pb-2">
            <h6 class="headline grey--text lighten-1 hidden-xs-only">{{post.subtitle}}</h6>
            <h6 class="subheading grey--text lighten-1 hidden-sm-and-up">{{post.subtitle}}</h6>
          </v-layout>
          <v-layout>
            <v-flex xs12 v-html="post.content" class="post-content">
            </v-flex>
          </v-layout>
          <v-layout row class="pt-2 pb-2">
            <v-flex xs12>
              <v-chip v-if="showCategories(allCategories[key].value)" class="custom-a" v-for="(category, key) in post.categories" :key="category.value" label >
                <router-link :to="{name: 'Topic', params: {category:allCategories[key].link}}">{{allCategories[key].text}}</router-link>
              </v-chip>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
      <v-flex hidden-xs-only sm1 style="position:relative">
        <v-btn
          outline 
          fab 
          small
          bottom
          :class="reachBottom"
          href="#" v-scroll-to="'#content'">
          <v-icon>keyboard_arrow_up</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout row class="mt-3 mr-2 ml-2">
      <v-flex sm8 offset-sm2>
        <img src="https://elevatenv.com/wp-content/uploads/2015/05/Elevate_ConnorConnor_728x90_0515.jpeg" style="width:100%" alt="">
      </v-flex>
    </v-layout>
    <v-layout row class="mt-4 mr-2 ml-2">
      <div>
        <h1 class="headline mt-2 mb-2">Recommended</h1>
        <v-divider class="mb-2"></v-divider>
      </div>
    </v-layout>
    <v-layout row wrap >
      <v-flex xs12>
        <v-container fluid grid-list-md>
            <v-layout row wrap>
              <elevate-post-tile v-for="post in recommendedList" :key="post.id" :post="post" size="4" imageHeight="100" height="270"></elevate-post-tile>
            </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import * as firebase from 'firebase'
require('firebase/firestore')

export default {
  props: ['shortname', 'scrollPosition'],
  data () {
    return {
      postData: {
        title: '',
        subTitle: '',
        author: {},
        content: '',
        postDate: ''
      },
      currentUrl: ''
    }
  },
  computed: {
    reachBottom () {
      if (this.scrollPosition > window.innerHeight) {
        return {
          fixedPosition: true,
          absolutePosition: false
        }
      } else {
        return {
          absolutePosition: true,
          fixedPosition: false
        }
      }
    },
    reachBottomSocial () {
      if (this.scrollPosition > 404) {
        return {
          fixedPositionSocial: true,
          absolutePositionSocial: false
        }
      } else {
        return {
          absolutePositionSocial: true,
          fixedPositionSocial: false
        }
      }
    },
    allCategories () {
      return this.$store.getters.categories
    },
    recommendedList () {
      return this.$store.getters.posts.filter((post) => {
        console.log(post.mainCategory)
        const find = post.categories[Object.keys(this.post.mainCategory)[0]]
        return find && post.shortname !== this.shortname
      })
    },
    post () {
      var hasPost = this.$store.getters.posts.find(post => post.shortname === this.shortname)
      if (hasPost && typeof hasPost.author === 'string') {
        hasPost.author = this.$store.getters.author(hasPost.author)
        return hasPost
      } else {
        return hasPost
      }
    }
  },
  methods: {
    scrollTop () {
      var domRect = document.getElementById('content').getBoundingClientRect()
      console.log(domRect)
    },
    showCategories (categories) {
      return categories && categories !== '0' && categories !== '1'
    }
  },
  mounted () {
    this.$store.dispatch('loadCategories')
    this.currentUrl = window.location.href
    let hasPost = this.$store.getters.posts.find(post => post.shortname === this.shortname)
    if (!hasPost) {
      firebase.firestore().collection('posts').where('shortname', '==', this.shortname).get()
        .then((data) => {
          hasPost = data.docs[0].data()
          return firebase.firestore().collection('authors').doc(hasPost.author).get()
        })
        .then((data) => {
          hasPost.author = data.data()
          this.$store.dispatch('addPost', hasPost)
          this.$store.dispatch('getRecommendPost', {shortname: this.shortname, category: Object.keys(hasPost.mainCategory)[0]})
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style>

</style>
