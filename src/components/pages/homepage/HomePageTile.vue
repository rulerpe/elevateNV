<template>
  <v-flex d-flex xs12 :sm6="columeSize.sm6" :sm4="columeSize.sm4" v-if="post" :style="{height:cardHeight+'px'}">
    <v-card :to="{name: 'PostDetail', params: {shortname: post.shortname}}">
      <v-card-media :src="post.featureImageUrl" :height="carImgHeight">
        
      </v-card-media>
      <v-card-title primary-title class="pt-2">
        <div>
          <h4 class="custom-headline headline mb-0">{{post.title}}</h4>
          <div v-if="showSubtitle()" class="subheading">{{subHeading}}</div>
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
      <div v-if="tag" style="position: absolute; top:0">
        <v-spacer></v-spacer>
        <v-card-actions>
          <v-chip label small class="body-2">{{post.tag}}</v-chip>
        </v-card-actions>
      </div>
    </v-card>
  </v-flex>
</template>

<script>
import * as moment from 'moment'
export default {
  props: ['post', 'size', 'imageHeight', 'height', 'tag'],
  data () {
    return {
    }
  },
  computed: {
    subHeading () {
      if (this.mobile || this.height <= 300) {
        return this.post.subtitle.slice(0, 35) + ' ...'
      } else {
        return this.post.subtitle
      }
    },
    cardHeight () {
      return this.mobile ? '300' : this.height
    },
    carImgHeight () {
      return this.mobile ? '150' : this.imageHeight
    },
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
    },
    mobile () {
      return this.$store.getters.mobile
    }
  },
  methods: {
    showSubtitle () {
      if (this.post.title.length > 25 && this.mobile) {
        return false
      } else {
        return true
      }
    }
  },
  mounted () {
    if (this.post !== undefined && typeof this.post.author === 'string' && this.$store.getters.author(this.post.author) === undefined) {
      this.$store.dispatch('loadAuthor', this.post.author)
    }
  }
}
</script>

<style>

</style>
