const path = require('path')

const httpPort = '80'
const getIPAdress = () => {
  const interfaces = require('os').networkInterfaces();
  for (const devName in interfaces) {
    const iface = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
};
const localIp = getIPAdress();
const transmitUrl = `http://${localIp}:${httpPort}`; //映射到node服务器 ,80端口

module.exports = {
  dev: {
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api/': {
        target: transmitUrl,
        changeOrigin: true
      }
    },
    USE_ESLINT: false, //暂时先采用eslint检测
    showEslintErrorsInOverlay: false, //提示不在网站上显示


    host: localIp, // can be overwritten by process.env.HOST
    port: 8090, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false,
    devtool: 'cheap-module-eval-source-map',
    cacheBusting: true,
    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../client/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../client'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
  }
}