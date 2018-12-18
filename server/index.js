import express from 'express'; //express框架
import https from 'https'; //https服务
import http from 'http'; //http服务
import bodyParser from 'body-parser'; //解析文件，参数等等。
import session from 'express-session'; //session应用
import history from 'connect-history-api-fallback'; //由于现在得vue是单页应用，也就是实际上不会再浏览器history中增加历史，使用这个插件后可以解决刷新浏览器后出现空白页得问题。
import chalk from 'chalk'; //node端打印日志，可以使用彩色字体。方便查找
import multer from 'multer'; //用来对上传文件进行解析然后缓存在node服务器。
import path from 'path';

import router from './routes'; //node得路由层，主要用来处理API。
import auth from './middlewares/auth'
import refresh from './middlewares/refresh' //每次请求后重新刷新session，减少session超时。
import { uploadJobs } from './task'

import {
  createFolder,
  formatFileName
} from './utils'

/*********************************读取默认的配置文件 ********************************/
const configPath = path.resolve(__dirname, 'config')
global.config = require('config-lite')(configPath) //读取系统参数配置文件;

//语言是否是英文
global.isEn = global.config.language === 'EN' ? true : false


/*********************************上传文件的拦截处理 ********************************/
const uploadFolder = 'uploads'; //上传文件的临时存放目录
createFolder(uploadFolder);

const storage = multer.diskStorage({
  //设置上传后文件路径，uploads文件夹会自动创建。
  destination(req, file, cb) {
    cb(null, uploadFolder)
  },
  //给上传文件重命名
  filename(req, file, cb) {
    console.log(`上传文件:${file.originalname}`)
    const filename = formatFileName(file.originalname)
    cb(null, filename);
  }
});
/*********************************启动任务********************************/
uploadJobs() //定期删除上传文件缓存的任务


/*********************************express服务********************************/
const app = express();

/*********************************session处理 ********************************/
app.use(session({
  secret: config.session.secret,
  name: config.session.name,
  cookie: config.session.cookie,
  resave: false,
  saveUninitialized: false,
}))

/*********************************文件处理 ********************************/

app.use(bodyParser.json({ //对于大文件的限制
  limit: '8192MB'
}));
app.use(bodyParser.urlencoded({
  limit: '8192MB',
  extended: true
}));
app.use(multer({ //对于文件上传的处理
  storage
}).single('file'));

/*********************************路由API处理 ********************************/
app.use(auth); //权限拦截器
app.use(refresh); //刷新session
app.use(history());
/**
 * 拦截器得放在router之前 
 */
router(app);

/*********************************静态资源文件 ********************************/

app.use(express.static('./client'))

/*********************************HTTP服务 ********************************/
const httpServer = http.createServer(app);

httpServer.listen(config.httpPort, '0.0.0.0', (req, res) => {
  console.log(
    chalk.green(`http服务开启，监听端口为：${config.httpPort}`)
  )
});
httpServer.on('connection', (socket) => {
  socket.setTimeout(5 * 60 * 1000); //请求5分钟超时
})

/*********************************HTTPS服务 ********************************/
// const httpsServer = https.createServer(config.serverOptions, app);
// httpsServer.listen(config.httpsPort, '0.0.0.0', () => {
//   -
//   console.log(
//     chalk.green(`https服务开启，端口为：${config.HttpsPort}`)
//   )
// });
// httpsServer.on('connection', (socket) => {
//   socket.setTimeout(5 * 60 * 1000); //请求5分钟超时
// })