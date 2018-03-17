<template>
  <v-container class="pa-0 custom-layout" v-if = "postData.title">
    <v-layout row class="mt-3">
      <v-flex sm8 offset-sm2>
        <ads-component size="long"></ads-component>
      </v-flex>
    </v-layout>
    <v-layout row class="mt-4" id="content">
      <v-flex hidden-xs-only sm1 style="position:relative"> 
        <div  
          :class="reachBottomSocial">
          <social-sharing :url="currentUrl"
                      :title="postData.title"
                      :description="postData.subtitle"
                      :quote="postData.subtitle"
                      hashtags="marijuana,cannabis,weed"
                      twitter-user="ElevateNV"
                      inline-template>
            <div class="social-size">
              <div class="social-facebook">
                <network network="facebook">
                  <v-icon>mdi-facebook</v-icon>
                </network>
              </div>
              <div class="mt-3 mb-3 social-twitter">
                <network network="twitter">
                  <v-icon>mdi-twitter</v-icon>
                </network>
              </div>
              <div class="social-google">
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
                <img :src="postData.author.imageUrl" alt="">
              </v-avatar>
              <v-content style="margin-left:10px">
                <div class="subheading">{{postData.author.name}}</div>
                <div class="body-1">{{postDate}} . {{postData.readtime}} min read</div>
              </v-content>
            </v-flex>
          </v-layout>
          <v-layout row class="pt-2 pb-2 post-content" v-if="postData.showFeatureImage">
            <v-flex xs12>
              <img :src="postData.featureImageUrl" :alt="postData.shortname">
            </v-flex>
          </v-layout>
          <v-layout row class="pt-2 pb-2">
            <h1 class="display-2 hidden-xs-only" style="font-weight:500">{{postData.title}}</h1>
            <h1 class="custom-headline display-1 hidden-sm-and-up" style="font-weight:500">{{postData.title}}</h1>
          </v-layout>
          <v-layout row class=" pb-2">
            <h2 class="headline grey--text lighten-1 hidden-xs-only">{{postData.subtitle}}</h2>
            <h2 class="subheading grey--text lighten-1 hidden-sm-and-up">{{postData.subtitle}}</h2>
          </v-layout>
          <v-layout>
            <v-flex xs12 v-html="postData.content" class="post-content">
            </v-flex>
          </v-layout>
          <v-layout row class="pt-2 pb-2">
            <v-flex xs-12 class="text-sm-right text-xs-left">
              <social-sharing :url="currentUrl"
                        :title="postData.title"
                        :description="postData.subtitle"
                        :quote="postData.subtitle"
                        hashtags="marijuana,cannabis,weed"
                        twitter-user="ElevateNV"
                        inline-template
                        style="display: inline-block">
              <div class="social-size">
                <div class="social-facebook bottom-social">
                  <network network="facebook">
                    <v-icon>mdi-facebook</v-icon>
                  </network>
                </div>
                <div class="mt-3 mb-3 social-twitter bottom-social">
                  <network network="twitter">
                    <v-icon>mdi-twitter</v-icon>
                  </network>
                </div>
                <div class="social-google bottom-social">
                  <network network="googleplus">
                    <v-icon>mdi-google-plus</v-icon>
                  </network>
                </div>
              </div>
            </social-sharing>
          </v-flex>
          </v-layout>
          <v-layout row class="pt-2 pb-2">
            <v-flex xs12>
              <v-chip v-show="showCategories(key)" class="custom-a" v-for="(category, key) in postData.categories" :key="category.value" label >
                <router-link :to="{name: 'Topic', params: {category:getCategory(key).link}}">{{getCategory(key).text}}</router-link>
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
import * as moment from 'moment'
require('firebase/firestore')

export default {
  props: ['shortname', 'scrollPosition'],
  data () {
    return {
      postData: {
        title: '',
        subtitle: '',
        author: {},
        content: '',
        postDate: '',
        featureImageUrl: '',
        thumbImage: '',
        metaDescription: ''
      },
      currentUrl: ''
    }
  },
  metaInfo () {
    return {
      // eslint-disable-next-line
      title: _.startCase(this.shortname.replace(/\-/g, ' ')),
      meta: [
        {name: 'description', content: this.postData.metaDescription},
        {name: 'twitter:card', content: 'summary'},
        {name: 'twitter:title', content: this.postData.title},
        {name: 'twitter:description', content: this.postData.subtitle},
        {name: 'twitter:image', content: this.postData.featureImageUrl},
        {name: 'twitter:site', content: '@elevateNV'},
        {name: 'twitter:creator', content: '@elevateNV'},
        {property: 'og:type', content: 'article'},
        // change url on production
        {property: 'og:url', content: 'https://elevatenv.com' + window.location.pathname},
        {property: 'og:title', content: this.postData.title},
        {property: 'og:description', content: this.postData.subtitle},
        {property: 'og:image', content: this.postData.featureImageUrl}
      ]
    }
  },
  computed: {
    postDate () {
      return moment(parseInt(this.postData.postDate)).format('MMM DD YYYY')
    },
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
        const find = post.categories[Object.keys(this.post.mainCategory)[0]]
        return find && post.shortname !== this.shortname
      }).slice(0, 3)
    },
    post () {
      var hasPost = this.$store.getters.posts.find(post => post.shortname === this.shortname)
      if (hasPost && typeof hasPost.author === 'string') {
        this.postData = hasPost
        hasPost.author = this.$store.getters.author(hasPost.author)
        return hasPost
      } else if (hasPost) {
        this.postData = hasPost
        return hasPost
      }
    }
  },
  methods: {
    scrollTop () {
      var domRect = document.getElementById('content').getBoundingClientRect()
      console.log(domRect)
    },
    showCategories (categoryIndex) {
      return categoryIndex !== '0' && categoryIndex.value !== '1'
    },
    getCategory (categoryIndex) {
      if (this.allCategories.length > 0) {
        return this.allCategories[categoryIndex]
      } else {
        return {link: null, text: null}
      }
    }
  },
  mounted () {
    this.$store.dispatch('loadCategories')
    this.currentUrl = window.location.href
    var hasPost = this.$store.getters.posts.find(post => post.shortname === this.shortname)
    if (!hasPost) {
      firebase.firestore().collection('posts').where('shortname', '==', this.shortname).get()
        .then((data) => {
          if (data.docs.length === 0) {
            throw new Error('post not exist')
          }
          hasPost = data.docs[0].data()
          return firebase.firestore().collection('authors').doc(hasPost.author).get()
        })
        .then((data) => {
          hasPost.author = data.data()
          this.postData = hasPost
          this.$store.dispatch('addPost', hasPost)
          this.$store.dispatch('getRecommendPost', {shortname: this.shortname, category: Object.keys(hasPost.mainCategory)[0]})
        })
        .catch((error) => {
          console.log(error)
          this.$router.push({name: 'Home'})
        })
    } else {
      if (typeof hasPost.author === 'string') {
        hasPost.author = this.$store.getters.author(hasPost.author)
        this.postData = hasPost
      }
    }
  }
}
</script>

<style>

</style>
