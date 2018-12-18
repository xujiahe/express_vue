import { getClientIp } from '../../utils'

const transformRequest = function(req) {
  const token = (req.session && req.session.userId) || ''; //用户的token
  const clientIp = getClientIp(req); //用户的局域网IP
  const headers = {
    token,
    clientIp
  };
  return headers;
}
export default transformRequest