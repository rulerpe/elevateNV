<template>
  <v-container grid-list-md class="custom-layout">
    <v-layout row class="mt-3">
      <v-flex sm8 offset-sm2>
        <img src="https://elevatenv.com/wp-content/uploads/2017/07/Elevate-elements-Web-banner-728x90.jpg" style="width:100%" alt="">
      </v-flex>
    </v-layout>
    <div style="margin-top:40px">
      <h1 class="display-1 topic-title mt-2 mb-2">Subscribe</h1>
      <v-divider class="mb-2"></v-divider>
      <v-layout row>
        <v-flex xs12>
          <p class="subheading">Subscribe to receive our latest ElevateNV Magazine</p>
        </v-flex>
      </v-layout>
      <v-layout row v-show="subscribeStatus === 'start'">
        <v-flex xs12 sm8 offset-sm2 class="pt-5 text-xs-center text-md-center text-md-center mt-5">
          <p class="headline">
          Submiting
          </p>
          <v-progress-circular indeterminate v-bind:width="7" v-bind:size="70" color="primary"></v-progress-circular>
        </v-flex>
      </v-layout>
      <v-layout row v-show="subscribeStatus === 'success'">
        <v-flex xs12 sm8 offset-sm2 class="pt-5 text-xs-center text-md-center text-md-center mt-5">
          <p class="display-1">Your request has submited successfully, our stuff will contact as soon as possible</p>
        </v-flex>
      </v-layout>
      <v-layout row wrap v-show="subscribeStatus === 'none'">
        <v-flex xs12>
          <form @submit.prevent="onSubmitSubscription">
          <v-layout row>
            <v-flex xs12 sm12>
              <v-text-field
                name="name"
                label="Name"
                id="name"
                v-model="Subscription.name"
                required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs6 sm6>
              <v-text-field
                name="phone"
                label="Phone Number"
                id="phone"
                v-model="Subscription.phone"
                ></v-text-field>
            </v-flex>
            <v-flex xs6 sm6>
              <v-text-field
                name="email"
                label="Email"
                id="email"
                v-model="Subscription.email"
                required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm12>
              <v-text-field
                name="address"
                label="Write your address here"
                id="address"
                v-model="Subscription.address"
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
      Subscription: {
        name: '',
        phone: '',
        email: '',
        address: ''
      }
    }
  },
  metaInfo () {
    return {
      // eslint-disable-next-line
      title: 'Subscribe',
      meta: [
        {name: 'twitter:card', content: 'summary'},
        {name: 'twitter:title', content: 'Subscribe'},
        {name: 'twitter:description', content: 'Subscribe'}, {name: 'twitter:image', content: 'https://firebasestorage.googleapis.com/v0/b/elevatenv-dev.appspot.com/o/other%2Fdownload.png?alt=media&token=da4513f5-8808-4646-aae3-7ce8877f834f'},
        {name: 'twitter:site', content: '@elevateNV'},
        {name: 'twitter:creator', content: '@elevateNV'},
        {property: 'og:type', content: 'article'},
        // change url on production
        {property: 'og:url', content: 'https://elevatenv.com' + window.location.pathname},
        {property: 'og:title', content: 'Subscribe'},
        {property: 'og:description', content: 'Subscribe'},
        {property: 'og:image', content: 'https://firebasestorage.googleapis.com/v0/b/elevatenv-dev.appspot.com/o/other%2Fdownload.png?alt=media&token=da4513f5-8808-4646-aae3-7ce8877f834f'}
      ]
    }
  },
  computed: {
    formIsValid () {
      return this.Subscription.name !== '' && this.Subscription.email !== '' && this.Subscription.comment !== ''
    },
    subscribeStatus () {
      return this.$store.getters.subscribeStatus
    }
  },
  methods: {
    onSubmitSubscription () {
      this.$store.dispatch('newSubscribe', this.Subscription)
    }
  },
  mounted () {
    this.$store.dispatch('setSubscribeStatus', 'none')
  }
}
</script>

<style>

</style>
