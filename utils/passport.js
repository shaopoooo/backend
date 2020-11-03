const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const bcrypt = require('bcryptjs');

const jwt = require('./jwt');
const { BadRequest, NotFound } = require('./errors');
const dbconnect = require('./db');

const db = dbconnect.getDbConnect('universal');
const User = db.model('user', require('../models/user'));

const saltRound = 10;

const opt = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'test_key_123321',
  algorithms: ['HS256'],
};
const LOCAL_STRATEGY_CONFIG = {
  passReqToCallback: true,
};

const jwtCheck = async (jwtPayload, done) => {
  try {
    if (!jwtPayload.payload) throw new BadRequest('authentication failure');
    const { id } = jwtPayload.payload;
    const user = await User.findById(id).populate('factory');
    return done(null, user);
  } catch (err) {
    return done(err, false);
  }
};

const localSignUp = async (req, username, password, done) => {
  const {
    factory, name, email, level, status,
  } = req.body;
  try {
    const account = await User.find({ username });
    if (account.length) throw new BadRequest('duplicate account');
    const hashpw = bcrypt.hashSync(password, saltRound);
    const user = new User({
      username,
      password: hashpw,
      factory,
      name,
      email,
      level,
      status,
    });
    await user.save();
    return done(null, user);
  } catch (err) {
    return done(err, false);
  }
};

const localLogin = async (req, username, password, done) => {
  const user = await User.find({ username }).populate('factory');
  try {
    if (!user.length) throw new NotFound('account or password error');
    const result = bcrypt.compareSync(password, user[0].password);
    if (!result) throw new NotFound('account or password error');
    const token = jwt.issue({
      id: user[0].id,
      factory: user[0].factory.id,
    });
    return done(null, token);
  } catch (err) {
    return done(err, false);
  }
};

module.exports = (passport) => {
  passport.use('jwt', new JwtStrategy(opt, jwtCheck));
  passport.use('signup', new LocalStrategy(LOCAL_STRATEGY_CONFIG, localSignUp));
  passport.use('login', new LocalStrategy(LOCAL_STRATEGY_CONFIG, localLogin));
};
