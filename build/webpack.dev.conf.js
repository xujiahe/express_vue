'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin') //拷贝资源的插件
const HtmlWebpackPlugin = require('html-webpack-plugin') //生成html模板的插件，经常用到的wbepack插件
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin') //更友好展示错误日志的插件
const portfinder = require('portfinder') //自动打开可用端口的包
//当前环境的host
const HOST = process.env.HOST
//当前环境的PORT
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  devtool: config.dev.devtool,

  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true, //启用 webpack 的模块热替换特性
    contentBase: false, // since we use CopyWebpackPlugin./告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要,这里我们禁用
    compress: true, //是否压缩
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser, //是否自动打开浏览器
    overlay: config.dev.errorOverlay //编译出错时是否有提示
      ?
      { warnings: false, errors: true } : false,
    publicPath: config.dev.assetsPublicPath, //静态内容的路径,此路径下的打包文件可在浏览器中访问
    proxy: config.dev.proxyTable, ////接口的代理
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(), //模块热替换插件，修改模块时不需要刷新页面
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.当开启 HMR 的时候使用该插件会显示模块的相对路径
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'server/views/index.html',
      inject: true //打包后js文件放在body的最后
    }),
    //将static的内容拷贝到开发路径，忽略这个文件夹下“.XX”的文件
    new CopyWebpackPlugin([
    {
      from: path.resolve(__dirname, '../static'),
      to: config.dev.assetsSubDirectory,
      ignore: ['.*']
    }])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      process.env.PORT = port
      devWebpackConfig.devServer.port = port

      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`您可以在浏览器中打开: http://${devWebpackConfig.devServer.host}:${port} 查看项目`],
        },
        onErrors: config.dev.notifyOnErrors ?
          utils.createNotifierCallback() : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})