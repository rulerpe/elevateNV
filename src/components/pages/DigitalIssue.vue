<template>
  <v-container class="mt-0 mb-0 pa-0">
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
            { title: 'List Item', code: '15520179/56734942' }
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
