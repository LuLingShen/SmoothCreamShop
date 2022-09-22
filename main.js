import App from './App'
import {base} from '@/service'

// #ifndef VUE3
// console.log('======Vue2======');
import Vue from 'vue'
Vue.config.productionTip = false

//给所有的Vue实例的原型添加新属性$base
Vue.prototype.$base = base

App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
// console.log('======Vue3======');
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  
  //为所有的Vue实例的原型添加扩展属性$base
  app.config.globalProperties.$base = base
  
  return {
    app
  }
}
// #endif