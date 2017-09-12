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
// import NewCamera from '@/components/NewCamera'
import Add from '@/components/Add'
import Artistmobile from '@/components/ArtistMobile'
import Purchase from '@/components/Purchase'
import Purchasefav from '@/components/PurchaseFav'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/purchasefav',
      name: 'Purchasefav',
      component: Purchasefav
    },
    {
      path: '/purchase',
      name: 'Purchase',
      component: Purchase
    },
    {
      path: '/artistmobile',
      name: 'Artistmoble',
      component: Artistmobile
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
    // {
    //   path: '/newcamera',
    //   name: 'NewCamera',
    //   component: NewCamera
    // },
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
