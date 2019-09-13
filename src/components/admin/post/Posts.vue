<template>
  <v-container class="">
    <v-layout row>
      <v-flex xs6 sm6 offset-sm3>
        <h2>Posts List</h2>
      </v-flex>
      <v-flex xs4 sm 3>
        <v-btn raised :to="{name:'NewPost'}">New</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex sm12>
        <v-layout row v-for="post in posts" v-bind:key="post.title" class="primary pa-1 mb-1" >
          <v-flex sm3>{{parseDate(post.postDate)}}</v-flex>
          <v-flex sm5 style="cursor: pointer;" @click="editPost(post.shortname)">{{post.title}}</v-flex>
          <v-flex sm2>
            <v-btn color="error" raised @click="deletePost({id:post.id,author:post.author})" >
              Delete
            </v-btn>
          </v-flex>
          <v-flex sm2>
            <a :href="'/post/'+post.shortname" target="_blank">
              View</a>
          </v-flex>
        </v-layout>
        </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import * as moment from 'moment'
export default {
  computed: {
    posts () {
      return this.$store.getters.posts
    }
  },
  mounted () {
    this.$store.dispatch('loadPosts')
  },
  methods: {
    viewPost (shortname) {
      this.$router.push('/post/' + shortname)
    },
    editPost (shortname) {
      this.$router.push('/admin/post/edit/' + shortname)
    },
    deletePost (payload) {
      this.$store.dispatch('deletePost', payload)
    },
    parseDate (date) {
      return moment(parseInt(date)).format('MMM DD YYYY')
    }
  }
}
</script>

<style>

</style>
