import dispatchRequest from './dispatchRequest'
import transformRequest from './transformRequest'
import buildURL from './helpers/buildURL'
import resolveError from './helpers/resolveError'
import resolveSuccess from './helpers/resolveSuccess'

/**
 * /**
 * 作为直接待用接口，会将结果直接返回个前台，不用做任何处理
 * url传入的方式 ：1.相对路径，默认采用相对路径 baseUrl+ url ; 2.绝对路径，方便调用不同的平台
 */
export const request = {
  post(url, req, res) {
    h5.postByReq(url, req).then(result => {
      resolveSuccess(result, res)
    }).catch((err) => {
      resolveError(err, res)
    })
  },
  get(url, req, res) {
    h5.getByReq(url, req).then(result => {
      resolveSuccess(result, res)
    }).catch((err) => {
      resolveError(err, res)
    })
  }
}
/**
 * h5自己的接口，可以链式调用后处理返回的结果,不处理res，需要在外部调用后自己去处理。
 * url传入的方式 ：1.相对路径，默认采用相对路径 baseUrl+ url ; 2.绝对路径，方便调用不同的平台
 */
export const h5 = {
  async postByReq(url, req, params = null) {
    let config = {};
    config.headers = transformRequest(req)
    config.body = params || (req && req.body)
    config.method = 'POST'
    return await dispatchRequest(url, config)
  },

  async getByReq(url, req, params = null) {
    let config = {};
    config.headers = transformRequest(req)
    config.params = params || (req && req.query);
    url = buildURL(url, config.params)
    return await dispatchRequest(url, config)
  },

  async post(url, params) {
    return this.postByReq(url, null, params)
  },

  async get(url, params) {
    return this.getByReq(url, null, params)
  }
}