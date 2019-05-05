import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home'
import Blog from './views/Blog'
import Post from './views/Post'
import Error404 from './views/404'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/blog',
      name: 'blog',
      component: Blog
    },
    {
      path: ':slug',
      name: 'post',
      component: Post,
      props: true
    },
    {
      path: '*',
      component: Error404
    },
  ],
  mode: 'history'
})
