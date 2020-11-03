const express = require('express');
const passport = require('passport');

const errorHandler = require('../middleware/errorHandler');
const { Unauthorized } = require('./errors');

const authLogin = express.Router().use((req, res, next) => {
  passport.authenticate('jwt', { session: false },
    (err, user) => {
      try {
        if (!user) throw new Unauthorized('authentication failure');
        req.user = user;
        next();
      } catch (error) {
        errorHandler(error, req, res);
      }
    })(req, res, next);
});

const authSuper = express.Router().use((req, res, next) => {
  passport.authenticate('jwt', { session: false },
    (err, user) => {
      try {
        if (!user) throw new Unauthorized('authentication failure');
        req.user = user;
        next();
      } catch (error) {
        errorHandler(error, req, res);
      }
    })(req, res, next);
});

module.exports = {
  authLogin,
  authSuper,
};
