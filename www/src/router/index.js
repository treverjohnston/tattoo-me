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
import Searchmobile from '@/components/SearchMobile'
import Purchase from '@/components/Purchase'
import Purchasefav from '@/components/PurchaseFav'
import Viewartist from '@/components/ViewArtist'
import Topartists from '@/components/TopArtists'
import Confirmdelete from '@/components/ConfirmDelete'
import Stripe from '@/components/Stripe'
import Success from '@/components/Success'
import Fail from '@/components/Fail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/confirmdelete',
      name: 'Confirmdelete',
      component: Confirmdelete
    },
    {
      path: '/topartists',
      name: 'Topartists',
      component: Topartists
    },
    {
      path: '/viewartist/:artistId',
      name: 'Viewartist',
      component: Viewartist
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
      path: '/searchmobile',
      name: 'Searchmobile',
      component: Searchmobile
    },
    {
      path: '/mobile',
      name: 'Mobile',
      component: Mobile
    },
    {
      path: '/stripe',
      name: 'Stripe',
      component: Stripe
    },
    {
      path: '/success',
      name: 'Success',
      component: Success
    },
    {
      path: '/fail',
      name: 'Fail',
      component: Fail
    }
  ]
})
