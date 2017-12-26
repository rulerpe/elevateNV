<template>
  <v-container grid-list-md class="custom-layout">
    <v-layout row class="mt-3">
      <v-flex sm8 offset-sm2>
        <img src="https://elevatenv.com/wp-content/uploads/2017/07/Elevate-elements-Web-banner-728x90.jpg" style="width:100%" alt="">
      </v-flex>
    </v-layout>
    <div style="margin-top:40px">
      <h1 class="display-1 mt-2 mb-2">Contact Us</h1>
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
            <v-flex xs12 sm6>
              <v-text-field
                name="phone"
                label="Phone Number"
                id="phone"
                v-model="feedback.phone"
                ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
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
