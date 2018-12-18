import request from './request'

export default {
  getParams: () => {
    return request.get('system/getParams')
  },
  getConfig: () => {
    return request.get('system/getConfig')
  }
}