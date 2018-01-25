<template>
  <v-container grid-list-md class="custom-layout">
    <v-layout row class="mt-3">
      <v-flex sm8 offset-sm2>
        <ads-component size="long"></ads-component>
      </v-flex>
    </v-layout>
    <div class="mt-3">
      <h1 class="display-1 topic-title mt-2 mb-2">Top Articles</h1>
      <v-divider class="mb-2"></v-divider>
      <v-layout row wrap v-if="featurePosts.length > 3">
        <elevate-post-tile :post="featurePosts[0]" size="6" imageHeight="400" height="600" tag="true"></elevate-post-tile>
        <v-flex d-flex xs12 sm6>
          <v-layout row wrap>
            <elevate-post-tile :post="featurePosts[1]" size="12" imageHeight="150" height="300" tag="true"></elevate-post-tile>
            <elevate-post-tile :post="featurePosts[2]" size="12" imageHeight="150" height="300" tag="true"></elevate-post-tile>
          </v-layout>
        </v-flex>
      </v-layout>
    </div>
    <div style="margin-top:40px">
      <v-layout row>
        <v-flex xs12 sm6 text-xs-left>
          <h1 class="display-1 topic-title custom-a mt-2 mb-0">Latest Articles</h1>
        </v-flex>
        <v-flex hidden-xs-only sm6 text-sm-right>
          
        </v-flex>
      </v-layout>
      <v-divider class="mb-1"></v-divider>
      <v-layout row wrap >
        <elevate-post-tile v-for="post in sortedPosts" :key="post.id" :post="post" size="4" imageHeight="100" height="250" tag="true"></elevate-post-tile>
      </v-layout>
    </div>
  </v-container>
</template>

<script>
export default {
  metaInfo () {
    return {
      // eslint-disable-next-line
      title: 'Home',
      meta: [
        {name: 'twitter:card', content: 'summary'},
        {name: 'twitter:title', content: 'Home'},
        {name: 'twitter:description', content: 'ElevateNV'},
        {name: 'twitter:image', content: 'https://firebasestorage.googleapis.com/v0/b/elevatenv-dev.appspot.com/o/other%2Fdownload.png?alt=media&token=da4513f5-8808-4646-aae3-7ce8877f834f'},
        {name: 'twitter:site', content: '@elevateNV'},
        {name: 'twitter:creator', content: '@elevateNV'},
        {property: 'og:type', content: 'article'},
        // change url on production
        {property: 'og:url', content: window.location.href.replace('http://localhost:8002/', 'https://elevatenv-dev.firebaseapp.com/')},
        {property: 'og:title', content: 'Home'},
        {property: 'og:description', content: 'ElevateNV'},
        {property: 'og:image', content: 'https://firebasestorage.googleapis.com/v0/b/elevatenv-dev.appspot.com/o/other%2Fdownload.png?alt=media&token=da4513f5-8808-4646-aae3-7ce8877f834f'}
      ]
    }
  },
  data: () => ({
    size: {
      sm5: true,
      sm6: false
    },
    featurePosts: []
  }),
  computed: {
    allCategories () {
      return this.$store.getters.categories
    },
    posts () {
      return this.$store.getters.posts
    },
    sortedPosts () {
      var sortedList = []
      this.posts.forEach(function (post) {
        post.tag = this.allCategories[Object.keys(post.mainCategory)[0]].text
        console.log('maincategory', post.mainCategory)
        if (!Object.keys(post.categories).includes('0')) {
          sortedList.push(post)
        } else {
          this.featurePosts.push(post)
        }
      }, this)
      return sortedList
    }
  },
  mounted () {
    this.$store.dispatch('clearPosts')
    this.$store.dispatch('loadCategories')
    // this.$store.dispatch('loadPostFromAllTopic', {topics: [{value: 8}, {value: 6}], limit: 6, feature: true})
    this.$store.dispatch('loadHomePagePosts')
  }
}
</script>

<style>

</style>
