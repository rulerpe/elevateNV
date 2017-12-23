<template>
  <v-container grid-list-md class="custom-layout">
    <v-layout row class="mt-3">
      <v-flex sm8 offset-sm2>
        <img src="https://elevatenv.com/wp-content/uploads/2017/07/Elevate-elements-Web-banner-728x90.jpg" style="width:100%" alt="">
      </v-flex>
    </v-layout>
    <div style="margin-top:40px">
      <h1 class="display-1 mt-2 mb-2">Search: {{keyword}}</h1>
      <v-divider class="mb-2"></v-divider>
      <v-layout row wrap >
        <elevate-post-tile v-for="post in searchResult" :key="post.id" :post="post" size="4" imageHeight="100" height="250"></elevate-post-tile>
      </v-layout>
    </div>
  </v-container>
</template>

<script>
export default {
  props: ['keyword'],
  computed: {
    searchResult () {
      return this.$store.getters.posts
    }
  },
  mounted () {
    this.$store.dispatch('searchPost', this.keyword)
  }
}
</script>

<style>

</style>
