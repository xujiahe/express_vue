'use strict';

/**
 * 判断一个url是否是绝对路径的地址
 * @param {*} url 
 * @returns {boolean} 
 */
const isAbsoluteURL = function(url) {
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};
export default isAbsoluteURL