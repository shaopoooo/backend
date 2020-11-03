const jwt = require('jsonwebtoken');

function issue(user) {
  const expires = Math.floor(Date.now() / 1000) + (60 * 15);

  const payload = {
    id: user.id,
    factory: user.factory,
  };

  const token = jwt.sign({ payload, exp: expires }, proccess.env.JWT_KEY);

  return {
    token: `Bearer ${token}`,
    expires,
  };
}

module.exports.issue = issue;
