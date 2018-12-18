import Vue from 'vue'
import Router from 'vue-router'

const portal = resolve => require(['@/pages/portal'], resolve) //单页面整体
const support = resolve => require(['@/pages/support'], resolve) //错误处理
const login = resolve => require(['@/pages/login'], resolve) //错误处理


Vue.use(Router)


export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    redirect: '/portal',
  }, {
    path: '/support',
    name: 'support',
    component: support
  }, {
    path: '/portal',
    name: 'portal',
    component: portal
  }, {
    path: '/login',
    name: 'login',
    component: login
  }]
})