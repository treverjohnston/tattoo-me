// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// C:\source\codeworks\tattoo-me\www\node_modules\fine-uploader\all.fine-uploader\all.fine-uploader.js
// C:\source\codeworks\tattoo-me\www\node_modules\fine-uploader\all.fine-uploader\all.fine-uploader.js.map



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
