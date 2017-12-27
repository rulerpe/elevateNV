<template>
  <div class="pa-1 ma-1" style="width: 100% !important">
    <v-layout row>
      <v-flex sm3>
        <h2>Posts</h2>
        <router-link :to="{name:'Posts'}"><v-btn raised>All Posts</v-btn></router-link>
        <router-link :to="{name:'NewPost'}"><v-btn raised>New Post</v-btn></router-link>
        <h2>Authors</h2>
        <router-link :to="{name:'Authors'}"><v-btn raised>All Authors</v-btn></router-link>
        <router-link :to="{name:'NewAuthor'}"><v-btn raised>New Author</v-btn></router-link>
        <h2>Dispensaries</h2>
        <router-link :to="{name:'Dispensaries'}"><v-btn raised>All Dispensaries</v-btn></router-link>
        <router-link :to="{name:'NewDispensary'}"><v-btn raised>New Dispensary</v-btn></router-link>
        <h2>Ads</h2>
        <router-link :to="{name:'Ads'}"><v-btn raised>All Ads</v-btn></router-link>
        <router-link :to="{name:'NewAds'}"><v-btn raised>New Ads</v-btn></router-link>
        <h2>Log Out</h2>
        <v-btn color="error" raised @click="logout()" >
          Log Out
        </v-btn>
      </v-flex>
      <v-flex sm9>
        <router-view></router-view>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('logout')
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>
