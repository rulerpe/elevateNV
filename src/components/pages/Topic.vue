<template>
  <v-container grid-list-md class="custom-layout">
    <v-layout row class="mt-3">
      <v-flex sm8 offset-sm2>
        <img src="https://elevatenv.com/wp-content/uploads/2017/07/Elevate-elements-Web-banner-728x90.jpg" style="width:100%" alt="">
      </v-flex>
    </v-layout>
    <div style="margin-top:40px">
      <h1 class="display-1 topic-title mt-2 mb-2">{{topicTitle}}</h1>
      <v-divider class="mb-2"></v-divider>
      <v-layout row wrap >
        <elevate-post-tile v-for="post in trendPosts" :key="post.id" :post="post" size="4" imageHeight="100" height="250"></elevate-post-tile>
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
      title: this.category,
      meta: [
        {name: 'twitter:card', content: 'summary'},
        {name: 'twitter:title', content: this.category},
        {name: 'twitter:description', content: this.category}, {name: 'twitter:image', content: 'https://firebasestorage.googleapis.com/v0/b/elevatenv-dev.appspot.com/o/other%2Fdownload.png?alt=media&token=da4513f5-8808-4646-aae3-7ce8877f834f'},
        {name: 'twitter:site', content: '@elevateNV'},
        {name: 'twitter:creator', content: '@elevateNV'},
        {property: 'og:type', content: 'article'},
        // change url on production
        {property: 'og:url', content: 'https://elevatenv.com' + window.location.pathname},
        {property: 'og:title', content: this.category},
        {property: 'og:description', content: this.category},
        {property: 'og:image', content: 'https://firebasestorage.googleapis.com/v0/b/elevatenv-dev.appspot.com/o/other%2Fdownload.png?alt=media&token=da4513f5-8808-4646-aae3-7ce8877f834f'}
      ]
    }
  },
  computed: {
    topicTitle () {
      return this._.capitalize(this.category.replace(/-/g, ' '))
    },
    trendPosts () {
      return this.$store.getters.posts
    }
  },
  watch: {
    category: function () {
      this.$store.dispatch('loadTopicPosts', this.category)
    }
  },
  mounted () {
    this.$store.dispatch('loadTopicPosts', this.category)
  }
}
</script>

<style>

</style>
