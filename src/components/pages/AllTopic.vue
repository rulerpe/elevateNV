<template>
  <v-container grid-list-md class="custom-layout">
    <v-layout row class="mt-3">
      <v-flex sm8 offset-sm2>
        <ads-component size="long"></ads-component>
      </v-flex>
    </v-layout>
    <div style="margin-top:40px" v-for="(catposts, key) in sortedPosts" :key="key">
      <v-layout row>
        <v-flex xs12 sm6 text-xs-left>
          <h1 class="display-1 custom-a topic-title mt-2 mb-2">
            <router-link :to="{name: 'Topic', params: {category: allCategories[key].link}}">{{_.startCase(allCategories[key].text)}}</router-link>
            </h1>
        </v-flex>
        <v-flex hidden-xs-only sm6 text-sm-right>
          <h4 class="subheading custom-a mt-4 mr-4">
            <router-link :to="{name: 'Topic', params: {category: allCategories[key].link}}">more</router-link>
            </h4>
        </v-flex>
      </v-layout>
      <v-divider class="mb-2"></v-divider>
      <v-layout row wrap >
        <elevate-post-tile v-for="post in catposts" :key="post.id" :post="post" size="4" imageHeight="100" height="250"></elevate-post-tile>
      </v-layout>
    </div>
  </v-container>
</template>

<script>
export default {
  props: ['category'],
  metaInfo () {
    return {
      // eslint-disable-next-line
      title: 'More',
      meta: [
        {name: 'twitter:card', content: 'summary'},
        {name: 'twitter:title', content: 'More'},
        {name: 'twitter:description', content: 'More'}, {name: 'twitter:image', content: 'https://firebasestorage.googleapis.com/v0/b/elevatenv-dev.appspot.com/o/other%2Fdownload.png?alt=media&token=da4513f5-8808-4646-aae3-7ce8877f834f'},
        {name: 'twitter:site', content: '@elevateNV'},
        {name: 'twitter:creator', content: '@elevateNV'},
        {property: 'og:type', content: 'article'},
        // change url on production
        {property: 'og:url', content: 'https://elevatenv.com' + window.location.pathname},
        {property: 'og:title', content: 'More'},
        {property: 'og:description', content: 'More'},
        {property: 'og:image', content: 'https://firebasestorage.googleapis.com/v0/b/elevatenv-dev.appspot.com/o/other%2Fdownload.png?alt=media&token=da4513f5-8808-4646-aae3-7ce8877f834f'}
      ]
    }
  },
  computed: {
    allCategories () {
      return this.$store.getters.categories
    },
    posts () {
      return this.$store.getters.posts
    },
    sortedPosts () {
      var sortedList = {}
      this.posts.forEach(post => {
        let topicIndex = Object.keys(post.mainCategory)[0]
        if (sortedList[topicIndex]) {
          sortedList[topicIndex].push(post)
        } else {
          sortedList[topicIndex] = [post]
        }
      })
      return sortedList
    }
  },
  methods: {

  },
  mounted () {
    this.$store.dispatch('loadPostFromAllTopic', {limit: 3, feature: false})
  }
}
</script>

<style>

</style>
