import Vue from 'vue' //引入Vue
import ElementUI from 'element-ui' //element组件库
import 'element-ui/lib/theme-chalk/index.css'; //element样式

import App from '@/App' //入口页
import router from '@/router' //路由
import store from '@/store' //数据管理vuex
import Debounce from '@/directives/debounce' //全局指令
import filterInput from '@/mixins/filter' //全局混合函数
import { i18n } from '@/lang' // 国际化


Vue.config.productionTip = false;

Vue.use(ElementUI, {
  size: 'medium',
  i18n: (key, value) => i18n.t(key, value)
})
//全局自定义指令。
Vue.directive('debounce', Debounce)

//全局混合函数
Vue.mixin(filterInput);



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})