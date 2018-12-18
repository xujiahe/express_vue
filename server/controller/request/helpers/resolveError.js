import HttpError from "../error/httpError";
import ServerError from "../error/ServerError";
import chalk from 'chalk'; //node端打印日志，可以使用彩色字体。方便查找
import moment from 'moment'

function resolveError(err, res) {


  let message = err.message;
  if (!global.isEn) {
    if (err instanceof HttpError) {
      message = 'HTTP请求错误'
    }
    if (err instanceof ServerError) {
      message = '服务器异常'
    }
  }
  console.log(chalk.redBright(moment().format('YYYY-MM-DD HH:mm:ss'), `请求java接口: ${err.url}失败; 请求状态码为：${err.status};  失败原因：${message}`))
  res.status(err.status).send({
    status: err.status,
    message
  })
}
export default resolveError