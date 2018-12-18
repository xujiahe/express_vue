# 智慧园区前端



### 技术栈
1. vue2 + vuex + vue-router + axios + webpack + ES6/7 + sass + express + node-fetch

---------------------------------

### 项目运行
1. 注意：由于涉及大量的 ES6/7 等新属性，node 需要 8.0 以上版本 

---------------------------------

### windows 64 bit运行
1. [下载node-v8.11.2-win-x64.zip](https://nodejs.org/dist/v8.11.2/node-v8.11.2-win-x64.zip)
2. 解压，SET环境变量设置PATH指向NODE目录，本机: D:\node-v8.11.2-win-x64
3. cmd， `node -v` , `npm -v` ,能显示 8,X,5.X等信息
5. 执行 `npm install`将从公司现有的npm私服下载包
6. 启动命令： 为了开发和上线方便，在系统中采用了开发环境和运行环境两套。
    * 开发环境直接在项目目录下执行 npm run dev  然后再开一个环境执行node bin/www
    * 上线环境是利用了pm2 做负载均衡保证后台运行 ，保证不会因为任何其他的原因宕机，更新代码0秒重载。直接执行npm run start即可启动
    * 如果要停止端口执行npm run stop 否则pm2会守护进程永远不会释放

---------------------------------

# 项目整体结构

```
.
├── bin                                         // 启动目录
│   ├── www                                     // node服务层启动文件

├── build                                       // webpack配置文件
|
├── client                                      // 打包后可以上线的项目文件
|
├── config                                      // 项目打包路径
│   ├── dev.env                                 // 开发版本配置
│   ├── index                                   // 开发版本和生产版本基本配置
│   ├── prod.env                                // 生产版本基本配置
|
├── docker                                      // docker镜像部署配置文件
├── keys                                        // 创建HTTPS服务所需要的一些keys
├── logs                                        // node服务的日志管理文件
├── node_modules                                // npm包管理
|
├── server                                      // node服务端
|   |   |config                                 // node配置文件
|   |   |controller                             // node与java API交互
|   |   |── request                             // node请求java api访问底层(java服务器路径HTTP请求以及结果处理)
|   |   |── camera monitor ...                  // node与java api交互业务处理层
|   |── middlewares                             // node中间层 负责请求处理拦截等等。
|   |── routes                                  // node路由
|   |   ├── camera monitor ...                  // 前端浏览器层与node层api访问
|   |── task                                    // node任务
|   |── utils                                   // 服务端工具包
|   |── views                                   // 前端模板
|   |── index                                   // express服务层入口
|
├── src                                         // 源码目录
│   ├── assets                                  // 静态文件目录
│   │   ├── fonts                               // 字体
│   │   ├── images                              // 图片
│   │   ├── style                               // 样式
│   ├── components                              // 通用组件
│   │   ├── from                                // 表单显示
│   │   ├── transitions                         // 动画效果
│   ├── directive                               // 全局指令
│   ├── lang                                    // 语言包
│   ├── mixins                                  // 混入实例对象，可以直接加到实例对象中使用
│   │   ├── emitter                             // 重写广播和传播函数,方便高级应用。
│   ├── pages                                   // 模块页面
│   │   ├── components                          // 通用业务组件  
│   ├── router
│   │   └── index.js                            // 全局路由配置
│   ├── service                                 // 数据交互统一调配
│   │   ├── index.js                            // 获取数据的统一调配文件，对接口进行统一管理
│   ├── store                                   // vuex的状态管理
│   │   ├── index.js                            // 引用vuex，创建store
│   │   ├── modules                             // store模块,按照内容进行划分。
│   ├── utils                                   // 基本配置
│   │   ├── constant.js                         // 类似数据字典,存放统一的数据管理
│   │   ├── dom.js                              // 操作dom的方法
│   │   ├── localstorage.js                     // 本地缓存数据
│   │   └── menu.js                             // 菜单的配置文件
│   │   └── observer.js                         // websocket
│   │   ├── request.js                          // API请求
│   ├── App.vue                                 // 页面入口文件
│   ├── main.js                                 // 前端入口js文件，加载各种公共组件
│   ├── index.html                              // 前端入口html文件
|
├── static                                      // 静态文件
├── uploads                                     // 上传文件临时保存未知
├── .npmrc                                      // npm私服映射
├── favicon.ico                                 // 浏览器访问地址的图标
├── package.json                                // 整体运行配置文件
├── pm2.json                                    // pm2服务器启动参数

