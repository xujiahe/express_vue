'use strict';
import HttpError from '../error/httpError'
import moment from 'moment'
/**
 * 
 * @param {*} res 
 */
const checkStatus = (res) => {
  if (res.ok) {
    console.log(moment().format('YYYY-MM-DD HH:mm'), `请求java接口成功，请求路径为：${res.url}`)
    return res;
  } else {
    throw new HttpError(res.status, res.url, res.statusText);
  }
}

export default checkStatus