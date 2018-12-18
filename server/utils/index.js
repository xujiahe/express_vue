const fs = require('fs');
const toString = Object.prototype.toString;
/**
 * 创建一个文件夹
 * @param {文件夹名称} folder
 */
export const createFolder = function(folder) {
  try {
    fs.accessSync(folder);
  } catch (e) {
    fs.mkdirSync(folder);
    console.log('创建临时上传目录成功')
  }
};

//通过req的hearers来获取客户端ip
export const getClientIp = function(req) {
  let ip = req.headers['x-real-ip'] ||
    req.headers['x-forwarded-for'] ||
    req.socket.remoteAddress || '';
  if (ip.split(',').length > 0) {
    ip = ip.split(',')[0];
  }
  return ip;
}

/**
 * 格式化文件名称
 * @param {文件原始名称} originalname
 */
export const formatFileName = function(originalname) {
  const fileFormat = (originalname).split(".");
  const suffix = fileFormat[fileFormat.length - 1];
  fileFormat.pop()
  const fileName = fileFormat.join('_');
  return `${fileName}-${Date.now()}.${suffix}`;
}


/**
 * 判断是否未定义
 * @param {*} val 
 */
export const isUndefined = function(val) {
  return typeof val === 'undefined';
}

/**
 * 判断是否是对象
 * @param {*} val 
 */
export const isObject = function(val) {
  return val !== null && typeof val === 'object';
}

/**
 * 判断是否是数组
 * @param {*} val 
 */
export const isArray = function(val) {
  return toString.call(val) === '[object Array]';
}