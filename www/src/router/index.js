import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Mobile from '@/components/Mobile'
import Search from '@/components/Search'
import Login from '@/components/Login'
import Favorites from '@/components/Favorites'
import Profile from '@/components/Profile'
import Options from '@/components/MyOptions'
import Camera from '@/components/Camera'
import Add from '@/components/Add'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/add',
      name: 'Add',
      component: Add
    },
    {
      path: '/camera',
      name: 'Camera',
      component: Camera
    },
    {
      path: '/options',
      name: 'Options',
      component: Options
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
