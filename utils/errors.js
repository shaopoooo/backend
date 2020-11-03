class GeneralError {
  constructor(message) {
    this.message = message;
  }

  getCode() {
    if (this instanceof BadRequest) {
      return 400;
    }
    if (this instanceof Unauthorized) {
      return 401;
    }
    if (this instanceof NotFound) {
      return 404;
    }
    return 500;
  }
}

class BadRequest extends GeneralError { }
class Unauthorized extends GeneralError { }
class NotFound extends GeneralError { }

module.exports = {
  GeneralError,
  BadRequest,
  Unauthorized,
  NotFound,
};
