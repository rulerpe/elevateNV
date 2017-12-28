<template>
  <v-app light>
    <v-navigation-drawer fixed app temporary v-model="sideNav" style="z-index: 900">
      <v-list>
        <v-list-tile href="/dispensary-finder">
          <v-list-tile-content  class="accent--text">Dispensary Finder</v-list-tile-content>
        </v-list-tile>
        <v-list-tile href="/digital-issue">
          <v-list-tile-content  class="accent--text">Digital Issues</v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content  class="accent--text">Blog</v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="{name: 'PostDetail', params:{shortname: 'blackabis'}}">
          <v-list-tile-content  class="accent--text ml-3">Blackabis</v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="{name: 'Topic', params:{category: 'the-grow'}}">
          <v-list-tile-content  class="accent--text ml-3">The Grow</v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile v-for="item in menuItems" :key="item.title" :to="{name: item.page, params: {category:item.link}}">
          <v-list-tile-content  class="accent--text">{{ item.title }}</v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile class="custom-a">
          <a href="https://www.instagram.com/elevatenevada/"><v-icon class="mr-1">mdi-instagram</v-icon></a>
          <a href="https://twitter.com/elevatenv"><v-icon class="mr-1">mdi-twitter</v-icon></a>
          <a href="https://www.facebook.com/ElevateNV"><v-icon class="mr-1">mdi-facebook</v-icon></a>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <div :style="navStyle">
      <div class="primary accent--text elevation-2 mainNav" :class="{ mainNavFixed: mainNavFixed ,mobileNavFixed:mobileNavFixed}" :style="{height: navHeight}">
        <v-layout row class="custom-layout">
          <v-flex xs2 sm4 class="pa-1">
            <v-btn flat icon @click.stop="sideNav = !sideNav"
              class="hidden-sm-and-up drawBtn">
              <v-icon>menu</v-icon>
            </v-btn>
              <div align="left" class="hidden-xs-only" >
                <v-btn color="primary" light style="margin:0; font-weight:400" href="/dispensary-finder">
                  Dispensary Finder
                </v-btn>
                <v-btn color="primary" light style="margin:0; font-weight:400" href="/digital-issue">
                  Digital Issues
                </v-btn>
              </div>
          </v-flex>
          <v-flex align-content-center xs8 sm4 class="pt-2 pb-1">
            <div class="text-xs-center">
              <a href="/">
              <img src="./assets/ELEVATE-LOGO.png" alt="" :style="{width: logoSize}"></a>
            </div>
          </v-flex>
          <v-flex v-if="!isMobile" xs4 sm4 class="pa-1">
            <div align="right" class="custom-a" >
              <v-text-field
                v-model="searchKeyword"
                style="width: 120px; position:absolute;" 
                class="pt-0"
                v-if="showSearch"
                @keyup.enter="search"
              ></v-text-field>
              <v-icon v-on:click="showSearch = !showSearch" class="mr-1" style="cursor: pointer; z-index:9">mdi-magnify</v-icon>
              <a href="https://www.instagram.com/elevatenevada/"><v-icon class="mr-1">mdi-instagram</v-icon></a>
              <a href="https://twitter.com/elevatenv"><v-icon class="mr-1">mdi-twitter</v-icon></a>
              <a href="https://www.facebook.com/ElevateNV"><v-icon class="mr-1">mdi-facebook</v-icon></a>
              <v-menu offset-y>
                <v-btn class="hidden-xs-only" color="primary" light style="margin:0; font-weight:400" slot="activator">
                  Blog
                </v-btn>
                <v-list>
                  <v-list-tile v-for="blog in blogList" :key="blog.link" :to="{name: blog.page, params: {category: blog.link,shortname: blog.link}}">
                    <v-list-tile-title v-text="blog.title"></v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </div>
          </v-flex>
        </v-layout>
        <v-layout row class="hidden-xs-only">
          <v-container style=" padding-bottom:0;padding-top:0" id="mainNav">
            <v-layout row class="custom-layout" justify-space-between>
              <v-flex xs2 class="text-xs-center" v-for="item in menuItems" :key="item.title">
              <v-btn active-class="" block flat :to="{name: item.page, params: {category:item.link}}" large style="margin:0; font-weight:400">
                {{ item.title }}
              </v-btn>
            </v-flex>
            </v-layout>
          </v-container>
        </v-layout>
      </div>
    </div>
    <v-content :style="contentStyle" :class="{fixedNavContentStyle: mainNavFixed}">
        <router-view :scrollPosition="scroPosition"></router-view>
    </v-content>
    <v-footer app class="primary accent--text elevation-10" v-show="!noFooter">
      <v-container class="footerNav pa-2">
        <v-layout row wrap>
          <v-flex xs12 sm5 class="text-xs-center mt-4 mb-4">
            <div class="text-xs-center">
              <a href="/">
              <img src="./assets/ELEVATE-LOGO.png" alt="" :style="{width: logoSize}"></a>
            </div>
            <div class="mt-4 custom-a">
              <a href="https://www.instagram.com/elevatenevada/"><v-icon class="mr-1">mdi-instagram</v-icon></a>
              <a href="https://twitter.com/elevatenv"><v-icon class="mr-1">mdi-twitter</v-icon></a>
              <a href="https://www.facebook.com/ElevateNV"><v-icon class="mr-1">mdi-facebook</v-icon></a>
            </div>
          </v-flex>
          <v-flex xs6 sm3 class="text-xs-center text-sm-right subheading custom-a">
            <h3>ElevateNV</h3>
            <v-layout row>
              <v-flex xs12>
                <router-link :to="{ name: 'AboutUs'}">About Us</router-link>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12>
                <router-link :to="{ name: 'Subsribe'}">Subsribe</router-link>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12>
                <router-link :to="{ name: 'Contact'}">Contact</router-link>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12>
              Advertise
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs6 sm3 class="text-xs-center text-sm-right subheading custom-a">
            <h3>Elevate in the News</h3>
            <v-layout row>
              <v-flex sm12>
                <v-layout row>
                  <v-flex xs12>
                    <a href="https://elevatenv.com/fox-5s-more-show/">Fox 5&rsquo;s More Show</a>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <a href="https://knpr.org/knpr/2017-07/recreational-marijuana-sales-begin-crowded-nevada-dispensaries">KNPR&rsquo;s &ldquo;State of Nevada&rdquo;&nbsp;</a>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <a href="http://vegasseven.com/2015/03/10/medical-marijuana/">Vegas Seven</a>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <a href="http://www.reviewjournal.com/news/pot-news/new-magazine-wants-elevate-medical-marijuana-conversation">Review Journal</a>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <a href="http://www.reviewjournal.com/columns-blogs/doug-elfman/medical-marijuana-works-well-celebrity-chef-kerry-simon">Review Journal</a>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <a href="http://www.getcardedvegas.com/new-magazine-re-nevada-medical-marijuana/">Get Carded Vegas</a>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <a href="http://vegasinc.com/business/people/2015/may/10/people-move-may-10-2015/">Vegas Inc.</a>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <a href="https://www.youtube.com/watch?v=D1yrKQwUN_M">Nevada Cannabis News</a>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <a href="http://knpr.org/knpr/2015-06/new-las-vegas-mag-seeks-elevate-and-educate-about-medicinal-marijuana">NPR</a>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <a href="https://elevatenv.com/elevate-editor-beth-schwartz-plays-favorites-on-91-5fm-kunv-with-nathan-tannenbaum">91.5FM KUNV</a>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
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
            { title: 'Home', link: '', page: 'Home' },
            { title: 'Patient', link: 'patient-profiles', page: 'Topic' },
            { title: 'Discover', link: 'discover', page: 'Topic' },
            { title: 'Cooking', link: 'cooking-with-cannabis', page: 'Topic' },
            { title: 'Medicine', link: 'medicine', page: 'Topic' },
            { title: 'Trends', link: 'trends', page: 'Topic' },
            { title: 'More ', link: '', page: 'AllTopic' },
            { title: 'Subscribe', link: '', page: 'Subscribe' }
        ],
        blogList: [
            { title: 'Blackabis', link: 'blackabis', page: 'PostDetail' },
            { title: 'The Grow', link: 'the-grow', page: 'Topic' }
        ],
        mainNavFixed: false,
        mobileNavFixed: false,
        logoSize: '250px',
        navHeight: '117px',
        scroPosition: window.innerHeight + 1,
        showSearch: false,
        searchKeyword: '',
        navStyle: {
          height: this.navHeight,
          zIndex: 500
        }
      }
    },
    computed: {
      noFooter () {
        return this.$route.path === '/dispensary-finder'
      },
      isMobile () {
        return this.$store.getters.mobile
      },
      contentStyle () {
        if (this.isMobile) {
          return {
            'margin-top': '55px'
          }
        } else {
          return {
            'margin-top': 0
          }
        }
      }
    },
    methods: {
      handleScroll (event) {
        if (document.getElementById('content')) {
          this.scroPosition = document.getElementById('content').getBoundingClientRect().bottom
        }
        this.mainNavFixed = window.scrollY > 73 && window.outerWidth > 600
      },
      handleResize (event) {
        if (this.$store.getters.mobile) {
          this.logoSize = '150px'
          this.navHeight = '55px'
          this.mobileNavFixed = true
        } else {
          this.logoSize = '250px'
          this.navHeight = '117px'
        }
      },
      search () {
        this.$router.push({name: 'Search', params: { keyword: this.searchKeyword }})
        this.searchKeyword = ''
        this.showSearch = false
      }
    },
    mounted  () {
      this.$store.dispatch('setMobile')
      window.addEventListener('scroll', this.handleScroll)
      window.addEventListener('resize', this.handleResize)
      this.handleResize()
    },
    destroyed () {
      window.removeEventListener('scroll', this.handleScroll)
    }
  }
</script>
