<template>
  <v-flex d-flex xs12 :sm6="columeSize.sm6" :sm4="columeSize.sm4" v-if="post" :style="{height:height+'px'}">
    <v-card :to="{name: 'PostDetail', params: {shortname: post.shortname}}">
      <v-card-media :src="post.featureImageUrl" :height="imageHeight">
      </v-card-media>
      <v-card-title primary-title class="pt-2">
        <div>
          <h4 class="custom-headline headline mb-0">{{post.title}}</h4>
          <div v-if="showSubtitle()" class="subheading">{{post.subtitle.slice(0,35) + ' ...'}}</div>
        </div>
      </v-card-title>
        <v-list style="position: absolute; bottom:0" class="pa-0" two-line v-if="author">
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img :src="author.imageUrl">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{author.name}}</v-list-tile-title>
                <v-list-tile-sub-title>{{postDate}} · {{post.readtime}} min read</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-card>
  </v-flex>
</template>

<script>
import * as moment from 'moment'
export default {
  props: ['post', 'size', 'imageHeight', 'height'],
  data () {
    return {
    }
  },
  computed: {
    columeSize () {
      if (this.size === '6') {
        return {sm6: true, sm4: false, sm12: false}
      } else if (this.size === '4') {
        return {sm6: false, sm4: true, sm12: false}
      } else if (this.size === '12') {
        return {sm6: false, sm4: false, sm12: true}
      }
    },
    postDate () {
      return moment(this.post.postDate).format('MMM DD')
    },
    author () {
      return this.$store.getters.author(this.post.author)
    }
  },
  methods: {
    showSubtitle () {
      if (this.post.title.length < 25 || this.height > 260) {
        return true
      } else {
        return false
      }
    }
  },
  mounted () {
    if (this.post !== undefined && this.$store.getters.author(this.post.author) === undefined) {
      this.$store.dispatch('loadAuthor', this.post.author)
    }
  }
}
</script>

<style>

</style>
