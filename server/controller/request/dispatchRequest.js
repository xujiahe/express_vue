import fetchToJava from './fetchToJava'

import isAbsoluteURL from './helpers/isAbsoluteURL';
import combineURLs from './helpers/combineURLs';
import checkStatus from './helpers/checkStatus'


import HttpError from './error/httpError';
import ServerError from './error/serverError'
const defaulConfig = global.config;
const baseUrl = `http://${defaulConfig.serverIp}:${defaulConfig.serverPort}/api/rfc/v1`;

async function dispatchRequest(url, config) {
  if (baseUrl && !isAbsoluteURL(url)) {
    url = combineURLs(baseUrl, url);
  }
  let response = null;
  try {
    response = await fetchToJava(url, config).then(checkStatus).then((response) => {
      return response.json();
    })
  } catch (err) {
    if (err instanceof HttpError) {
      throw err
    } else {
      throw new ServerError(url)
    }
  }
  return response
};

export default dispatchRequest;