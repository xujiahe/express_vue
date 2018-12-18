import moment from 'moment'
import chalk from 'chalk'; //node端打印日志，可以使用彩色字体。方便查找


export default function(req, res, next) {
  if (req.session.userId) {
    //用户登录过
    next();
  } else {
    // 解析用户请求的路径
    var arr = req.url.split('/');
    // 判断请求路径是否为根、获取静态资源，错误页面，如果是不做拦截
    if (arr.length > 1 && (arr[1] == '' || arr[1] == 'static' || arr[1] == 'error' || arr[1] == 'login')) {
      next();
    } else if (arr[2] = 'api' && arr[2] == 'system') { //用户的登录登出系统参数等api请求
      next();
    } else { // 登录拦截
      req.session.originalUrl = req.originalUrl ? req.originalUrl : null; // 记录用户原始请求路径
      console.log(chalk.redBright(moment().format('YYYY-MM-DD HH:mm'), `拦截到非法请求${req.originalUrl},系统默认跳转到登录界面`))
      res.redirect(302, '/login'); // 将用户重定向到登录页面,记录用户原始请求路径
    }
  }
};