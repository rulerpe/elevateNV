<template>
  <v-app light>
    <v-navigation-drawer fixed app temporary v-model="sideNav">
      <v-list>
        <v-list-tile>
          <v-list-tile-content  class="accent--text">Dispensary Finder</v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content  class="accent--text">Digital Issues</v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile v-for="item in menuItems" :key="item.title" :to="item.link">
          <v-list-tile-content  class="accent--text">{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <div :style="{height: navHeight}">
      <div class="primary accent--text elevation-2 mainNav" :class="{ mainNavFixed: mainNavFixed ,mobileNavFixed:mobileNavFixed}" :style="{height: navHeight}">
        <v-layout row class="custom-layout">
          <v-flex xs4 sm4 class="pa-1">
            <v-icon
              @click.stop="sideNav = !sideNav"
              class="hidden-sm-and-up drawBtn">menu</v-icon>
              <div align="left" class="hidden-xs-only" >
                <v-btn color="primary" light style="margin:0; font-weight:400">
                  Dispensary Finder
                </v-btn>
                <v-btn color="primary" light style="margin:0; font-weight:400">
                  Digital Issues
                </v-btn>
              </div>
          </v-flex>
          <v-flex align-content-center xs4 sm4 class="pt-2 pb-1">
            <div class="text-xs-center">
              <a href="/">
              <img src="./assets/ELEVATE-LOGO.png" alt="" :style="{width: logoSize}"></a>
            </div>
          </v-flex>
          <v-flex xs4 sm4 class="pa-1">
            <div align="right" >
              <v-btn class="hidden-xs-only" color="primary" light style="margin:0; font-weight:400">
                Blog
              </v-btn>
              <v-icon class="ml-1">mdi-instagram</v-icon>
              <v-icon class="ml-1">mdi-twitter</v-icon>
              <v-icon class="ml-1">mdi-facebook</v-icon>
              <v-icon class="ml-1">mdi-magnify</v-icon>
            </div>
          </v-flex>
        </v-layout>
        <v-layout row class="hidden-xs-only">
          <v-container style=" padding-bottom:0;padding-top:0" id="mainNav">
            <v-layout row class="custom-layout" justify-space-between>
              <v-flex xs2 class="text-xs-center" v-for="item in menuItems" :key="item.title">
              <v-btn block flat :to="item.link" large style="margin:0; font-weight:400">
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
                <div class="subheading">About</div>
              </v-flex>
              <v-flex xs2 sm1 class="text-xs-center">
                <div class="subheading">Subsribe</div>
              </v-flex>
              <v-flex xs2 sm1 class="text-xs-center">
                <div class="subheading">Contact</div>
              </v-flex>
              <v-flex xs2 sm1 class="text-xs-center">
                <div class="subheading">Advertise</div>
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
            { title: 'Home', link: '/' },
            { title: 'Patient', link: '/topic/patient' },
            { title: 'DISCOVER', link: '/topic/discover' },
            { title: 'COOKING', link: '/topic/cooking' },
            { title: 'MEDICINE', link: '/topic/medicine' },
            { title: 'TRENDS', link: '/topic/trends' },
            { title: 'News', link: '/topic/news' },
            { title: 'Review', link: '/topic/review' }
        ],
        mainNavFixed: false,
        mobileNavFixed: false,
        logoSize: '250px',
        navHeight: '117px',
        scroPosition: window.innerHeight + 1
      }
    },
    methods: {
      handleScroll (event) {
        if (document.getElementById('content')) {
          this.scroPosition = document.getElementById('content').getBoundingClientRect().bottom
        }
        this.mainNavFixed = window.scrollY > 74 && window.outerWidth > 600
      },
      handleResize (event) {
        console.log(window.outerWidth)
        if (window.outerWidth < 1000) {
          this.logoSize = '100px'
          this.navHeight = '44px'
          this.mobileNavFixed = true
        } else {
          this.logoSize = '250px'
          this.navHeight = '117px'
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
