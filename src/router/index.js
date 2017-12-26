import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/pages/Home'
import PostDetail from '@/components/pages/PostDetail'
import Topic from '@/components/pages/Topic'
import Search from '@/components/pages/Search'
import Contact from '@/components/pages/Contact'

import DispensaryFinder from '@/components/pages/DispensaryFinder'
import DigitalIssue from '@/components/pages/DigitalIssue'
import AllTopic from '@/components/pages/AllTopic'
import Subscribe from '@/components/pages/Subscribe'

import NewDispensary from '@/components/admin/dispensary/NewDispensary'
import Dispensaries from '@/components/admin/dispensary/Dispensaries'
import UpdateDispensary from '@/components/admin/dispensary/UpdateDispensary'

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
    {
      path: '/posts',
      name: 'Posts',
      component: Posts
    },
    {
      path: '/post/new',
      name: 'NewPost',
      component: NewPost
    },
    {
      path: '/post/edit/:shortname',
      name: 'EditPost',
      props: true,
      component: EditPost
    },
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
      path: '/digital-issue',
      name: 'DigitalIssue',
      component: DigitalIssue
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
      path: '/admin/dispensaries',
      name: 'Dispensaries',
      component: Dispensaries
    },
    {
      path: '/admin/newdispensary',
      name: 'NewDispensary',
      component: NewDispensary
    },
    {
      path: '/admin/updatedispensary/:id',
      name: 'UpdateDispensary',
      props: true,
      component: UpdateDispensary
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
      path: '/authors',
      name: 'Authors',
      component: Authors
    },
    {
      path: '/newauthor',
      name: 'NewAuthor',
      component: NewAuthor
    },
    {
      path: '/updateauthor/:id',
      name: 'UpdateAuthor',
      props: true,
      component: UpdateAuthor
    },
    {
      path: '/admin/fileupload',
      name: 'FileUpload',
      component: FileUpload
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  mode: 'history'
})
