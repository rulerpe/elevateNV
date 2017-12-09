import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/pages/Home'
import PostDetail from '@/components/pages/PostDetail'
import NewAuthor from '@/components/admin/authors/NewAuthor'
import Authors from '@/components/admin/authors/Authors'
import UpdateAuthor from '@/components/admin/authors/updateAuthor'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/post/:id',
      name: 'PostDetail',
      props: true,
      component: PostDetail
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
    }
  ],
  mode: 'history'
})
