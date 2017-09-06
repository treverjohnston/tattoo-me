import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Mobile from '@/components/Mobile'
import Search from '@/components/Search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/mobile',
      name: 'Mobile',
      component: Mobile
    }
  ]
})
