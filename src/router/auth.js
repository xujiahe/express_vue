import system from '@/service/system'

export default (to, from, next) => { //导航守卫，判断是否登录
  if (to.meta.notNeedAuth) { //默认都需要权限，除非加上notNeedAuth
    next()
  } else {
    system.getToken().then((result) => {
      if (result.status) {
        next()
      } else {
        next({
          path: '/login',
          query: {
            redirect: to.fullPath
          }
        })
      }
    }).catch(e => {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    })
  }
}