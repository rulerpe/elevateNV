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
        <elevate-post-tile :post="featurePosts[0]" size="6" imageHeight="400" height="600"></elevate-post-tile>
        <v-flex d-flex xs12 sm6>
          <v-layout row wrap>
            <elevate-post-tile :post="featurePosts[1]" size="12" imageHeight="150" height="300"></elevate-post-tile>
            <elevate-post-tile :post="featurePosts[2]" size="12" imageHeight="150" height="300"></elevate-post-tile>
          </v-layout>
        </v-flex>
      </v-layout>
    </div>
    <div style="margin-top:40px">
      <h1 class="display-1 mt-2 mb-2">Trends</h1>
      <v-divider class="mb-2"></v-divider>
      <v-layout row wrap >
        <elevate-post-tile v-for="post in trendPosts" :key="post.id" :post="post" size="4" imageHeight="100" height="250"></elevate-post-tile>
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
    posts () {
      return this.$store.getters.posts
    },
    featurePosts () {
      return this.posts.filter((post) => {
        return post.categories['9']
      })
    },
    trendPosts () {
      return this.posts.filter((post) => {
        return post.categories['6']
      })
    }
  },
  mounted () {
    if (this.$store.getters.posts.length === 0) {
      this.$store.dispatch('loadHomePagePosts', [9, 0, 1, 2, 3, 6])
    }
    // console.log('author', this.$store.getters.author('YVgHldSv3JLwuJiz24MP'))
  }
}
</script>

<style>

</style>
