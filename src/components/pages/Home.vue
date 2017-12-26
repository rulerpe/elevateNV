<template>
  <v-container grid-list-md class="custom-layout">
    <v-layout row class="mt-3">
      <v-flex sm8 offset-sm2>
        <img src="https://elevatenv.com/wp-content/uploads/2017/07/Elevate-elements-Web-banner-728x90.jpg" style="width:100%" alt="">
      </v-flex>
    </v-layout>
    <div class="mt-3">
      <h1 class="display-1 mt-2 mb-2">Top Articles</h1>
      <v-divider class="mb-2"></v-divider>
      <v-layout row wrap>
        <elevate-post-tile v-if="featurePosts.length > 0" :post="featurePosts[0]" size="6" imageHeight="400" height="600"></elevate-post-tile>
        <v-flex d-flex xs12 sm6>
          <v-layout row wrap>
            <elevate-post-tile v-if="featurePosts.length > 0" :post="featurePosts[1]" size="12" imageHeight="150" height="300"></elevate-post-tile>
            <elevate-post-tile v-if="featurePosts.length > 0" :post="featurePosts[2]" size="12" imageHeight="150" height="300"></elevate-post-tile>
          </v-layout>
        </v-flex>
      </v-layout>
    </div>
    <div style="margin-top:40px" v-for="(posts, key) in sortedPosts" :key="key">
      <v-layout row>
        <v-flex xs12 sm6 text-xs-left>
          <h1 class="display-1 custom-a mt-2 mb-2">
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
        <elevate-post-tile v-for="post in posts" :key="post.id" :post="post" size="4" imageHeight="100" height="250"></elevate-post-tile>
      </v-layout>
    </div>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`,
    size: {
      sm5: true,
      sm6: false
    }
  }),
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
        if (!Object.keys(post.categories).includes('0')) {
          if (sortedList[topicIndex]) {
            sortedList[topicIndex].push(post)
          } else {
            sortedList[topicIndex] = [post]
          }
        }
      })
      return sortedList
    },
    featurePosts () {
      return this.posts.filter((post) => {
        return post.categories['0']
      })
    }
  },
  mounted () {
    this.$store.dispatch('clearPosts')
    this.$store.dispatch('loadPostFromAllTopic', {topics: [{value: 8}, {value: 6}], limit: 6, feature: true})
  }
}
</script>

<style>

</style>
