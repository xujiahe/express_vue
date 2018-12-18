import fetch from 'node-fetch';
/**
 * node和java请求的接口
 * @param {*} url 
 * @param {*} params 
 */
async function fetchToJava(url, options) {
  return await fetch(url, options)
}
export default fetchToJava