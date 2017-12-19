<template>
  <v-container class="pa-0 custom-layout">
    <v-layout row class="mt-4" id="content">
      <v-flex hidden-xs-only sm1 style="position:relative"> 
        <div  
          :class="reachBottomSocial">
          <div>
            <v-icon>mdi-twitter</v-icon>
          </div>
          <div class="mt-3 mb-3">
            <v-icon>mdi-facebook</v-icon>
          </div>
          <div>
            <v-icon>mdi-bookmark</v-icon>
          </div>
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
                <div class="body-1">{{postData.postDate}} . {{postData.readtime}} min read</div>
              </v-content>
            </v-flex>
          </v-layout>
          <v-layout row class="pt-2 pb-2 post-content" v-if="postData.showFeatureImage">
            <v-flex xs12>
              <img :src="postData.featureImageUrl" :alt="postData.shortname">
            </v-flex>
          </v-layout>
          <v-layout row class="pt-2 pb-2">
            <h3 class="display-2 hidden-xs-only" style="font-weight:500">{{postData.title}}</h3>
            <h3 class="custom-headline display-1 hidden-sm-and-up" style="font-weight:500">{{postData.title}}</h3>
          </v-layout>
          <v-layout row class=" pb-2">
            <h6 class="headline grey--text lighten-1 hidden-xs-only">{{postData.subtitle}}</h6>
            <h6 class="subheading grey--text lighten-1 hidden-sm-and-up">{{postData.subtitle}}</h6>
          </v-layout>
          <v-layout>
            <v-flex xs12 v-html="postData.content" class="post-content">
            </v-flex>
          </v-layout>
          <v-layout row class="pt-2 pb-2">
            <v-flex xs12>
              <v-chip label v-for="(category, key) in postData.categories" :key="category.value">{{allCategories[key].text}}</v-chip>
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
              <v-flex xs12 sm4>
                <v-card>
                  <v-card-media src="https://elevatenv.com/wp-content/uploads/2017/11/santa-letter-780x641.jpg" height="100px">
                  </v-card-media>
                  <v-card-title class="pb-0 customCardTitle">
                    <div>
                      <h4 class="custom-headline headline mb-0">Making your list and checking</h4>
                    </div>
                  </v-card-title>
                    <v-list two-line>
                        <v-list-tile avatar>
                          <v-list-tile-avatar>
                            <img src="https://elevatenv.com/wp-content/uploads/2015/04/Elevate-May-Issue_Page_04_Image_0001-150x150.jpg">
                          </v-list-tile-avatar>
                          <v-list-tile-content>
                            <v-list-tile-title>Beth Schwartz</v-list-tile-title>
                            <v-list-tile-sub-title>With an open mind</v-list-tile-sub-title>
                          </v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                </v-card>
              </v-flex>
              <v-flex xs12 sm4>
                <v-card>
                  <v-card-media src="https://elevatenv.com/wp-content/uploads/2017/11/Franklin.jpg" height="100px">
                  </v-card-media>
                  <v-card-title class="pb-0 customCardTitle">
                    <div>
                      <h4 class="custom-headline headline mb-0">A dog’s tale</h4>
                    </div>
                  </v-card-title>
                  <v-list two-line>
                    <v-list-tile avatar>
                      <v-list-tile-avatar>
                        <img src="https://elevatenv.com/wp-content/uploads/2015/04/Elevate-May-Issue_Page_04_Image_0001-150x150.jpg">
                      </v-list-tile-avatar>
                      <v-list-tile-content>
                        <v-list-tile-title>Beth Schwartz</v-list-tile-title>
                        <v-list-tile-sub-title>With an open mind</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                </v-list>
                </v-card>
              </v-flex>
              <v-flex xs12 sm4>
                <v-card>
                  <v-card-media src="https://elevatenv.com/wp-content/uploads/2017/11/trim-1-1140x641.jpg" height="100px">
                  </v-card-media>
                  <v-card-title class="pb-0 customCardTitle">
                    <div>
                      <h4 class="custom-headline headline mb-0">Trimming services: save money and time</h4>
                    </div>
                  </v-card-title>
                  <v-list two-line>
                    <v-list-tile avatar>
                      <v-list-tile-avatar>
                        <img src="https://elevatenv.com/wp-content/uploads/2015/04/Elevate-May-Issue_Page_04_Image_0001-150x150.jpg">
                      </v-list-tile-avatar>
                      <v-list-tile-content>
                        <v-list-tile-title>Beth Schwartz</v-list-tile-title>
                        <v-list-tile-sub-title>With an open mind</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                </v-list>
                </v-card>
              </v-flex>
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
      }
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
    }
  },
  methods: {
    scrollTop () {
      var domRect = document.getElementById('content').getBoundingClientRect()
      console.log(domRect)
    }
  },
  mounted () {
    this.$store.dispatch('loadCategories')
    firebase.firestore().collection('posts').where('shortname', '==', this.shortname).get()
      .then((data) => {
        this.postData = data.docs[0].data()
        console.log(this.postData)
        return firebase.firestore().collection('authors').doc(this.postData.author).get()
      })
      .then((data) => {
        this.postData.author = data.data()
        console.log(this.postData)
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
</script>

<style>

</style>
