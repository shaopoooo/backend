const passport = require('passport');

exports.login = async (req, res, next) => {
  passport.authenticate('login', (err, token) => {
    if (err || !token) return next(err);
    return res.send({ status: 'success', token });
  })(req, res, next);
};

exports.create = async (req, res, next) => {
  passport.authenticate('signup', (err, user) => {
    if (err || !user) return next(err);
    return res.send({ status: 'success' });
  })(req, res, next);
};

exports.read = async (req, res) => res.send({ status: 'success', data: req.user });
