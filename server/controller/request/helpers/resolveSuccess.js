/**
 * node调用java返回成功的自动化处理
 * 1.对中英文
 * @param {*} result 返回结果
 * @param {*} res 
 */
function resolveError(result, res) {
  res.status(200).send(result);
}
export default resolveError