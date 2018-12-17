// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'

Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  data: {
    test: 'Hello world!'
  },
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App />'
})

Vue.prototype.$axios = axios
Vue.prototype.$config = {
  host: 'https://us-central1-helpful-weft-224923.cloudfunctions.net/pushNotifier'
}
