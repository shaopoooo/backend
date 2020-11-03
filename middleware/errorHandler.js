const { GeneralError } = require('../utils/errors');

const handleErrors = (err, req, res) => {
  if (err instanceof GeneralError) {
    return res.status(err.getCode()).send({
      status: 'error',
      message: err.message,
    });
  }
  return res.status(500).send({
    status: 'error',
    message: err.message,
  });
};

module.exports = handleErrors;
