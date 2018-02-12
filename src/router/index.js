/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/pages/Home'
import PostDetail from '@/components/pages/PostDetail'
import Topic from '@/components/pages/Topic'
import Search from '@/components/pages/Search'
import Contact from '@/components/pages/Contact'
import Advertise from '@/components/pages/Advertise'

import DispensaryFinder from '@/components/pages/DispensaryFinder'
import DigitalIssue from '@/components/pages/DigitalIssue'
import AllTopic from '@/components/pages/AllTopic'
import Subscribe from '@/components/pages/Subscribe'
import AboutUs from '@/components/pages/AboutUs'
import PageNotFound from '@/components/pages/PageNotFound'

import AdminPanel from '@/components/admin/AdminPanel'

import NewDispensary from '@/components/admin/dispensary/NewDispensary'
import Dispensaries from '@/components/admin/dispensary/Dispensaries'
import UpdateDispensary from '@/components/admin/dispensary/UpdateDispensary'

import NewAds from '@/components/admin/ads/NewAds'
import Ads from '@/components/admin/ads/Ads'
import UpdateAds from '@/components/admin/ads/UpdateAds'

import Login from '@/components/admin/auth/Login'
import AuthGuard from './auth-guard'

import NewAuthor from '@/components/admin/authors/NewAuthor'
import Authors from '@/components/admin/authors/Authors'
import UpdateAuthor from '@/components/admin/authors/updateAuthor'
import NewPost from '@/components/admin/post/NewPost'
import EditPost from '@/components/admin/post/EditPost'
import Posts from '@/components/admin/post/Posts'
import FileUpload from '@/components/admin/FileUpload'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    // {
    //   path: '/admin',
    //   component: AdminPanel,
    //   beforeEnter: AuthGuard,
    //   children: [
    //     {
    //       path: 'posts',
    //       name: 'Posts',
    //       component: Posts
    //     },
    //     {
    //       path: 'post/new',
    //       name: 'NewPost',
    //       component: NewPost
    //     },
    //     {
    //       path: 'post/edit/:shortname',
    //       name: 'EditPost',
    //       props: true,
    //       component: EditPost
    //     },
    //     {
    //       path: 'dispensaries',
    //       name: 'Dispensaries',
    //       component: Dispensaries
    //     },
    //     {
    //       path: 'dispensary/new',
    //       name: 'NewDispensary',
    //       component: NewDispensary
    //     },
    //     {
    //       path: 'dispensary/edit/:id',
    //       name: 'UpdateDispensary',
    //       props: true,
    //       component: UpdateDispensary
    //     },
    //     {
    //       path: 'authors',
    //       name: 'Authors',
    //       component: Authors
    //     },
    //     {
    //       path: 'author/new',
    //       name: 'NewAuthor',
    //       component: NewAuthor
    //     },
    //     {
    //       path: 'author/edit/:id',
    //       name: 'UpdateAuthor',
    //       props: true,
    //       component: UpdateAuthor
    //     },
    //     {
    //       path: 'fileupload',
    //       name: 'FileUpload',
    //       component: FileUpload
    //     },
    //     {
    //       path: 'ads',
    //       name: 'Ads',
    //       component: Ads
    //     },
    //     {
    //       path: 'ads/new',
    //       name: 'NewAds',
    //       component: NewAds
    //     },
    //     {
    //       path: 'ads/edit/:id',
    //       name: 'UpdateAds',
    //       props: true,
    //       component: UpdateAds
    //     }
    //   ]
    // },
    {
      path: '/post/:shortname',
      name: 'PostDetail',
      props: true,
      component: PostDetail
    },
    {
      path: '/topic/:category',
      name: 'Topic',
      props: true,
      component: Topic
    },
    {
      path: '/dispensary-finder',
      name: 'DispensaryFinder',
      component: DispensaryFinder
    },
    {
      path: '/digital-issues',
      name: 'DigitalIssue',
      component: DigitalIssue
    },
    {
      path: '/about-us',
      name: 'AboutUs',
      component: AboutUs
    },
    {
      path: '/alltopic',
      name: 'AllTopic',
      component: AllTopic
    },
    {
      path: '/subscribe',
      name: 'Subscribe',
      component: Subscribe
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/search/:keyword',
      name: 'Search',
      props: true,
      component: Search
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/advertise',
      name: 'Advertise',
      component: Advertise
    },
    {
      path: '*',
      name: 'PageNotFound',
      component: PageNotFound
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  mode: 'history'
})
