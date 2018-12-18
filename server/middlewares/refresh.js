/**
 * 每次请求之后刷新session过期时间
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export default function (req, res, next) {
  req.session._garbage = Date();
  req.session.touch();
  next();
}
