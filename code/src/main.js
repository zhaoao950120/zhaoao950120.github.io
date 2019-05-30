import Vue from 'vue'
import App from './App'
import WxRequest from './utils/wx-request.js'

import store from '@/store/index'
import interfaces from '@/utils/wx-request'
import https from '@/utils/https'

Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$store = store
Vue.prototype.$interfaces = interfaces
Vue.prototype.$https = https



const app = new Vue(App)
app.$mount()

Vue.prototype.$request = WxRequest
Vue.prototype.globalData = getApp().globalData




  
