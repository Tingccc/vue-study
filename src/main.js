// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.root = 'http://027xin.com:8899'
Vue.http.options.emulateJSON = true;

// 引入mui
import './assets/mui/css/mui.min.css'
import './assets/mui/css/icons-extra.css'

import moment from 'moment'
Vue.filter('dateFormat', function (dateStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dateStr).format(pattern)
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  // components: { App },
  // template: '<App/>',
  render: c => c(App),
  
})
