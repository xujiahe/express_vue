'use strict';

/**
 * 组合成请求的地址 
 * @param {*} baseURL 
 * @param {*} relativeURL 
 */
const combineURLs = function(baseURL, relativeURL) {
  return relativeURL ?
    baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') :
    baseURL;
};
export default combineURLs;