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
          title: '2018',
          issues: [
            { title: 'February', code: '15520179/57952216' },
            { title: 'January', code: '15520179/57072307' }
          ]
        },
        {
          title: '2017',
          issues: [
            { title: 'December', code: '15520179/56734942' },
            { title: 'November', code: '15520179/56735321' },
            { title: 'October', code: '15520179/54021940' },
            { title: 'September', code: '15520179/52953347' },
            { title: 'August', code: '15520179/51854181' },
            { title: 'July', code: '15520179/50709871' },
            { title: 'June', code: '15520179/49611544' },
            { title: 'May', code: '15520179/47988864' },
            { title: 'April', code: '15520179/47187793' },
            { title: 'March', code: '15520179/45498517' },
            { title: 'February', code: '15520179/43889182' },
            { title: 'January', code: '15520179/42552068' }
          ]
        },
        {
          title: '2016',
          issues: [
            { title: 'December', code: '15520179/57000255' },
            { title: 'November', code: '15520179/40274380' },
            { title: 'October', code: '15520179/39353547' },
            { title: 'September', code: '15520179/38618073' },
            { title: 'August', code: '15520179/37617622' },
            { title: 'July', code: '15520179/37055425' },
            { title: 'June', code: '15520179/36198693' },
            { title: 'May', code: '15520179/35347239' },
            { title: 'April', code: '15520179/34596606' },
            { title: 'March', code: '15520179/33861239' },
            { title: 'February', code: '15520179/33123664' },
            { title: 'January', code: '15520179/32534653' }
          ]
        },
        {
          title: '2015',
          issues: [
            { title: 'December', code: '15520179/31845559' },
            { title: 'November', code: '15520179/31087117' },
            { title: 'October', code: '15520179/30514253' },
            { title: 'September/August', code: '15520179/14698093' },
            { title: 'July/June', code: '15520179/13387948' },
            { title: 'Inaugural Issue', code: '15520179/12888254' }
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
