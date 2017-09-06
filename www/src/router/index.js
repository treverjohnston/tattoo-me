import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Mobile from '@/components/Mobile'
import Search from '@/components/Search'
import Login from '@/components/Login'
import Favorites from '@/components/Favorites'
import Profile from '@/components/Profile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/favorites',
      name: 'Favorites',
      component: Favorites
    },
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
