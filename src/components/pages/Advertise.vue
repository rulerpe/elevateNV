<template>
  <v-container grid-list-md class="custom-layout">
    <v-layout row class="mt-3">
      <v-flex sm8 offset-sm2>
        <ads-component size="long"></ads-component>
      </v-flex>
    </v-layout>
    <div style="margin-top:40px">
      <h1 class="display-1 topic-title mt-2 mb-2">MEDIA KIT</h1>
      <v-divider class="mb-2"></v-divider>
      <v-layout row>
        <v-flex xs12>
          <p class="subheading">LV Medical Marijuana Assoc. members receive reduced advertising rates - For more information call 702.423.1135 or 702.280.0363</p>
        </v-flex>
      </v-layout>
      <v-layout row >
        <v-flex xs12>
          <iframe src="https://firebasestorage.googleapis.com/v0/b/elevatenv-dev.appspot.com/o/other%2Felevate_mediakit%202018.pdf?alt=media&token=faf2f783-f8a9-4e12-8ada-943b1b5444fb" style="width: 100%;height: 900px;border: none;"></iframe>
        </v-flex>
      </v-layout>
    </div>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      feedback: {
        name: '',
        phone: '',
        email: '',
        comment: ''
      }
    }
  },
  metaInfo () {
    return {
      // eslint-disable-next-line
      title: 'Advertise',
      meta: [
        {name: 'twitter:card', content: 'summary'},
        {name: 'twitter:title', content: 'Advertise'},
        {name: 'twitter:description', content: 'Advertise'}, {name: 'twitter:image', content: 'https://firebasestorage.googleapis.com/v0/b/elevatenv-dev.appspot.com/o/other%2Fdownload.png?alt=media&token=da4513f5-8808-4646-aae3-7ce8877f834f'},
        {name: 'twitter:site', content: '@elevateNV'},
        {name: 'twitter:creator', content: '@elevateNV'},
        {property: 'og:type', content: 'article'},
        // change url on production
        {property: 'og:url', content: 'https://elevatenv.com' + window.location.pathname},
        {property: 'og:title', content: 'Advertise'},
        {property: 'og:description', content: 'Advertise'},
        {property: 'og:image', content: 'https://firebasestorage.googleapis.com/v0/b/elevatenv-dev.appspot.com/o/other%2Fdownload.png?alt=media&token=da4513f5-8808-4646-aae3-7ce8877f834f'}
      ]
    }
  }
}
</script>

<style>

</style>
