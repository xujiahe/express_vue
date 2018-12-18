import axios from 'axios'
import { Message } from 'element-ui'
import qs from 'qs'


const service = axios.create({
  baseURL: '/api',
  timeout: 10000 // 超时时间
})

// POST 传参序列化
service.interceptors.request.use(
  config => {
    if (config.method === 'post') config.data = qs.stringify(config.data)
    return config
  },
  error => {
    Message({ //抛出错误处理
      message: error.message,
      type: 'error'
    })
    return Promise.reject(error)
  }
)
// 返回状态判断
service.interceptors.response.use(
  res => {
    return res.data
  },
  error => {
    const data = error.response.data
    const message = data.status + ' ' + data.message;
    Message({ //抛出错误处理
      message: message,
      type: 'error'
    })
    return Promise.reject(error)
  }
)

const request = {
  post(url, data) {
    return service({
      method: 'POST',
      url,
      params: data
    })
  },
  get(url, data) {
    return service({
      method: 'GET',
      url,
      params: data
    })
  }
}
export default request