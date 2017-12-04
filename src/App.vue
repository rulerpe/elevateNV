<template>
  <v-app light>
    <v-navigation-drawer fixed app temporary v-model="sideNav">
      <v-list>
        <v-list-tile v-for="item in menuItems" :key="item.title" :to="item.link">
          <v-list-tile-content  class="accent--text">{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <div :style="{height: navHeight}">
      <div class="primary accent--text elevation-2 mainNav" :class="{ mainNavFixed: mainNavFixed ,mobileNavFixed:mobileNavFixed}" :style="{height: navHeight}">
        <v-layout row class="custom-layout">
          <v-flex xs2 sm4 style="padding:5px">
            <v-icon
              @click.stop="sideNav = !sideNav"
              class="hidden-sm-and-up drawBtn">menu</v-icon>
          </v-flex>
          <v-flex align-content-center xs8 sm4 class="pt-2 pb-2">
            <div class="text-xs-center">
              <a href="/">
              <img src="./assets/ELEVATE-LOGO.png" alt="" :style="{width: logoSize}"></a>
            </div>
          </v-flex>
          <v-flex xs2 sm4 class="pt-2 pb-2">
            <div align="right" class="hidden-xs-only">
              <v-icon class="xsicon">mdi-twitter</v-icon>
              <v-icon class="ml-2 mr-2 xsicon">mdi-facebook</v-icon>
              <v-icon class="xsicon">mdi-magnify</v-icon>
            </div>
          </v-flex>
        </v-layout>
        <v-layout row class="hidden-xs-only">
          <v-container style=" padding-bottom:0;padding-top:0" id="mainNav">
            <v-layout row class="custom-layout" justify-space-between>
              <v-flex xs12 class="text-xs-center" v-for="item in menuItems" :key="item.title">
              <v-btn flat :to="item.link" small  style="margin:0; font-weight:400">
                {{ item.title }}
              </v-btn>
            </v-flex>
            </v-layout>
          </v-container>
        </v-layout>
      </div>
    </div>
    <v-content>
        <router-view :scrollPosition="scroPosition"></router-view>
    </v-content>
    <v-footer app class="primary accent--text elevation-10" >
      <v-container class="footerNav">
            <v-layout row class="custom-layout">
              <v-flex xs2 sm1 class="text-xs-center">
                <div class="body-1">About</div>
              </v-flex>
              <v-flex xs2 sm1 class="text-xs-center">
                <div class="body-1">Careers</div>
              </v-flex>
              <v-flex xs2 sm1 class="text-xs-center">
                <div class="body-1">Contact</div>
              </v-flex>
              <v-flex xs2 sm1 class="text-xs-center">
                <div class="body-1">Advertise</div>
              </v-flex>
            </v-layout>
          </v-container>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        sideNav: false,
        menuItems: [
            { icon: 'supervisor_account', title: 'Home', link: '/' },
            { icon: 'room', title: 'CONVERSATION', link: '/CONVERSATION' },
            { icon: 'person', title: 'DISCOVER', link: '/DISCOVER' },
            { icon: 'supervisor_account', title: 'COOKING', link: '/COOKING' },
            { icon: 'room', title: 'MEDICINE', link: '/MEDICINE' },
            { icon: 'room', title: 'TRENDS', link: '/TRENDS' },
            { icon: 'room', title: 'GROW', link: '/GROW' }
        ],
        mainNavFixed: false,
        mobileNavFixed: false,
        logoSize: '250px',
        navHeight: '103.1px',
        scroPosition: window.innerHeight + 1
      }
    },
    methods: {
      handleScroll (event) {
        if (document.getElementById('content')) {
          this.scroPosition = document.getElementById('content').getBoundingClientRect().bottom
        }
        this.mainNavFixed = window.scrollY > 75 && window.outerWidth > 600
      },
      handleResize (event) {
        console.log(window.outerWidth)
        if (window.outerWidth < 600) {
          this.logoSize = '100px'
          this.navHeight = '48px'
          this.mobileNavFixed = true
        } else {
          this.logoSize = '250px'
          this.navHeight = '103.1px'
        }
      }
    },
    mounted  () {
      window.addEventListener('scroll', this.handleScroll)
      window.addEventListener('resize', this.handleResize)
      this.handleResize()
    },
    destroyed () {
      window.removeEventListener('scroll', this.handleScroll)
    }
  }
</script>
