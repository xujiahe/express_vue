'use strict';
/**
 * 
 * @param {*} url 
 * @param {*} params 
 */
const checkStatus = function(url, params) {
  let dataStr = ''; //数据拼接字符串
  Object.keys(params).forEach(key => {
    if (params[key]) {
      dataStr += '/' + encodeURI(data[key]);
    }
  })

  if (dataStr !== '') {
    url = url + dataStr;
  }
  return url;
};

export default checkStatus