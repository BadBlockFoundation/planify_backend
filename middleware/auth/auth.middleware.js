const passport = require('passport');
const loginStrategy = require("./strategy/login.strategy");
const signupStrategy = require("./strategy/signup.strategy");
const jwtStrategy = require("./strategy/jwt.strategy");

passport.use(
  'signup',
  signupStrategy
);

passport.use(
  'jwt',
  jwtStrategy
);

passport.use(
  'login',
  loginStrategy
);



module.exports = passport;
