// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
var VueMaterial = require('vue-material')
import 'vue-material/dist/vue-material.css'
import VueMasonryPlugin from 'vue-masonry'
import swal from 'sweetalert'

Vue.use(VueMasonryPlugin)
Vue.use(VueMaterial)

Vue.config.productionTip = true

Vue.mixin({
  methods: {
    signedIn() {
      if (Object.keys(this.$store.state.userInfo).length == 0) {
        router.push('/')
        return false
      } else {
        return true
      }
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
