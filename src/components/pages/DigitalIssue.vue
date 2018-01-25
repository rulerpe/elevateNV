<template>
  <v-container class="mt-0 mb-0 pa-0">
    <v-layout row class="mt-2 mb-1">
      <v-flex sm8 offset-sm2>
        <ads-component size="long" ></ads-component>
      </v-flex>
    </v-layout>
    <div v-if="mobile" :style="issuePicker">
      <v-layout row>
        <v-flex xs12 class="pa-3">
          <v-btn @click="listToggle = !listToggle" block style="color: black" large color="primary">
            <v-icon class="mr-1">mdi-format-list-bulleted</v-icon>Magazines
          </v-btn>
          <v-list v-show="listToggle">
            <v-list-group v-for="issue in issueList" :value="issue.active" v-bind:key="issue.title">
              <v-list-tile slot="item" >
                <v-list-tile-content>
                  <v-list-tile-title>{{ issue.title }}</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-icon>keyboard_arrow_down</v-icon>
                </v-list-tile-action>
              </v-list-tile>
              <v-list-tile v-for="subIssue in issue.issues" v-bind:key="subIssue.title" @click="changeIssue(subIssue.code)">
                <v-list-tile-content>
                  <v-list-tile-title>{{ subIssue.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list-group>
          </v-list>
        </v-flex>
      </v-layout>
    </div>
    <v-layout row>
      <v-flex v-if="!mobile" sm4>
        <v-toolbar style="color: black" color="primary" dark>
          <v-toolbar-title>Magazines</v-toolbar-title>
        </v-toolbar>
        <v-list>
          <v-list-group v-for="issue in issueList" :value="issue.active" v-bind:key="issue.title">
            <v-list-tile slot="item" >
              <v-list-tile-content>
                <v-list-tile-title>{{ issue.title }}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon>keyboard_arrow_down</v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <v-list-tile v-for="subIssue in issue.issues" v-bind:key="subIssue.title" @click="changeIssue(subIssue.code)">
              <v-list-tile-content>
                <v-list-tile-title>{{ subIssue.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </v-list>
      </v-flex>
      <v-flex xs12 sm8>
        <issuu-component v-if="resetIssue" :code="issuuCode"></issuu-component>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Vue from 'vue'
export default {
  metaInfo () {
    return {
      // eslint-disable-next-line
      title: 'Digital Issues',
      meta: [
        {name: 'twitter:card', content: 'summary'},
        {name: 'twitter:title', content: 'Digital Issues'},
        {name: 'twitter:description', content: 'ElevateNV digital magazines'},
        {name: 'twitter:image', content: 'https://firebasestorage.googleapis.com/v0/b/elevatenv-dev.appspot.com/o/other%2Fdownload.png?alt=media&token=da4513f5-8808-4646-aae3-7ce8877f834f'},
        {name: 'twitter:site', content: '@elevateNV'},
        {name: 'twitter:creator', content: '@elevateNV'},
        {property: 'og:type', content: 'article'},
        // change url on production
        {property: 'og:url', content: window.location.href.replace('http://localhost:8002/', 'https://elevatenv-dev.firebaseapp.com/')},
        {property: 'og:title', content: 'Digital Issues'},
        {property: 'og:description', content: 'ElevateNV digital magazines'},
        {property: 'og:image', content: 'https://firebasestorage.googleapis.com/v0/b/elevatenv-dev.appspot.com/o/other%2Fdownload.png?alt=media&token=da4513f5-8808-4646-aae3-7ce8877f834f'}
      ]
    }
  },
  data () {
    return {
      issueList: [
        {
          title: '2017',
          issues: [
            { title: 'December', code: '15520179/56734942' },
            { title: 'November', code: '15520179/56735321' }
          ]
        },
        {
          title: '2016',
          issues: [
            { title: 'December', code: '15520179/57000255' }
          ]
        }
      ],
      issuePicker: {
        position: 'absolute',
        top: '30px',
        width: document.documentElement.clientWidth + 'px'
      },
      issuuCode: '15520179/56734942',
      resetIssue: true,
      listToggle: false
    }
  },
  methods: {
    changeIssue (code) {
      this.issuuCode = code
      var vm = this
      vm.resetIssue = false
      Vue.nextTick(function () {
        vm.resetIssue = true
        vm.listToggle = false
      })
    }
  },
  computed: {
    mobile () {
      return this.$store.getters.mobile
    }
  }
}
</script>

<style>
</style>
