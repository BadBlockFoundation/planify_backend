const passport = require('passport');
const loginStrategy = require("./strategy/login.strategy");
const signupStrategy = require("./strategy/signup.strategy");

passport.use(
  'signup',
  signupStrategy
);


passport.use(
  'login',
  loginStrategy
);

module.exports = passport;
