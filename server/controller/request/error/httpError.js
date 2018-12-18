function HttpError(status, url, message) {
  this.name = 'HttpError';
  this.url = url;
  this.status = status || 400;
  this.message = message || 'HttpError';
}
HttpError.prototype = Object.create(Error.prototype);
HttpError.prototype.constructor = HttpError;

export default HttpError