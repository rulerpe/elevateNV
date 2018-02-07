<template>
  <v-container grid-list-md class="custom-layout">
    <v-layout row class="mt-3">
      <v-flex sm8 offset-sm2>
        <img src="https://elevatenv.com/wp-content/uploads/2017/07/Elevate-elements-Web-banner-728x90.jpg" style="width:100%" alt="">
      </v-flex>
    </v-layout>
    <div style="margin-top:40px">
      <h1 class="display-1 topic-title mt-2 mb-2">Contact Us</h1>
      <v-divider class="mb-2"></v-divider>
      <v-layout row>
        <v-flex xs12>
          <p class="subheading">Elevate Nevada is the state’s premier medicinal cannabis advocacy publication. Elevate’s objective is to provide factual content and information that highlights awareness, education, current events, patient health and wellness, medical breakthroughs, industry advancement, trending topics, and the movement as a whole. By bringing attention and action to the medicinal cannabis conversation, Elevate Nevada​ is rapidly and successfully becoming the channel connecting, educating and informing the cannabis industry as well as the entire community.</p>
        </v-flex>
      </v-layout>
      <v-layout row v-show="contactStatus === 'start'">
        <v-flex xs12 sm8 offset-sm2 class="pt-5 text-xs-center text-md-center text-md-center mt-5">
          <p class="headline">
          Submiting your feedback
          </p>
          <v-progress-circular indeterminate v-bind:width="7" v-bind:size="70" color="primary"></v-progress-circular>
        </v-flex>
      </v-layout>
      <v-layout row v-show="contactStatus === 'success'">
        <v-flex xs12 sm8 offset-sm2 class="pt-5 text-xs-center text-md-center text-md-center mt-5">
          <p class="display-1">Your feedback is submitted succeffuly</p>
        </v-flex>
      </v-layout>
      <v-layout row wrap v-show="contactStatus === 'none'">
        <v-flex xs12>
          <form @submit.prevent="onSubmitFeedback">
          <v-layout row>
            <v-flex xs12 sm12>
              <v-text-field
                name="name"
                label="Name"
                id="name"
                v-model="feedback.name"
                required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs6 sm6>
              <v-text-field
                name="phone"
                label="Phone Number"
                id="phone"
                v-model="feedback.phone"
                ></v-text-field>
            </v-flex>
            <v-flex xs6 sm6>
              <v-text-field
                name="email"
                label="Email"
                id="email"
                v-model="feedback.email"
                required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm12>
              <v-text-field
                name="comment"
                label="Write your comment here"
                id="comment"
                v-model="feedback.comment"
                textarea
                required></v-text-field>
            </v-flex>
          </v-layout>
           <v-layout row>
            <v-flex xs12 sm6>
              <v-btn class="error" :disabled="!formIsValid" type="submit">Submit</v-btn>
            </v-flex>
          </v-layout>
        </form>
        </v-flex>
      </v-layout>
      <v-divider class="mt-3 mb-3"></v-divider>
      <v-layout  class="mt-4 mb-5">
        <v-flex xs12 sm12>
          <h3 class="title">For more information or to speak to someone from the elevate team, please phone 702.855.3840</h3>
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
      title: 'Contact',
      meta: [
        {name: 'twitter:card', content: 'summary'},
        {name: 'twitter:title', content: 'Contact'},
        {name: 'twitter:description', content: 'Contact'}, {name: 'twitter:image', content: 'https://firebasestorage.googleapis.com/v0/b/elevatenv-dev.appspot.com/o/other%2Fdownload.png?alt=media&token=da4513f5-8808-4646-aae3-7ce8877f834f'},
        {name: 'twitter:site', content: '@elevateNV'},
        {name: 'twitter:creator', content: '@elevateNV'},
        {property: 'og:type', content: 'article'},
        // change url on production
        {property: 'og:url', content: window.location.href.replace('http://localhost:8002/', 'https://elevatenv-dev.firebaseapp.com/')},
        {property: 'og:title', content: 'Contact'},
        {property: 'og:description', content: 'Contact'},
        {property: 'og:image', content: 'https://firebasestorage.googleapis.com/v0/b/elevatenv-dev.appspot.com/o/other%2Fdownload.png?alt=media&token=da4513f5-8808-4646-aae3-7ce8877f834f'}
      ]
    }
  },
  computed: {
    formIsValid () {
      return this.feedback.name !== '' && this.feedback.email !== '' && this.feedback.comment !== ''
    },
    contactStatus () {
      return this.$store.getters.contactStatus
    }
  },
  methods: {
    onSubmitFeedback () {
      this.$store.dispatch('newFeedback', this.feedback)
    }
  },
  mounted () {
    this.$store.dispatch('setContactStatus', 'none')
  }
}
</script>

<style>

</style>
