function ServerError(url, message) {
  this.name = 'ServerError';
  this.url = url;
  this.status = 500; //服务器错误统一用500
  this.message = message || 'ServerError';
}
ServerError.prototype = Object.create(Error.prototype);
ServerError.prototype.constructor = ServerError;

export default ServerError