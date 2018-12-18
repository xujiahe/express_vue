import { h5, request } from './request'

const defaulConfig = global.config;
class System {
  constructor() {
    this.getParams = this.getParams.bind(this)
  }
  getParams(req, res) {
    request.get('department/getDeptList', req, res)
  }
  getConfig(req, res) {

    const settings = { 'serverIp': defaulConfig.serverIp, 'serverPort': defaulConfig.serverPort, 'language': defaulConfig.language }
    res.status(200).send({
      data: settings,
      status: true,
      message: '获取系统配置成功'
    })
  }
}

export default new System()