const localStrategy = require('passport-local').Strategy;
const UserModel = require('../../../models/user.model')

module.exports = new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, passport, done) => {
    try {
      const user = await UserModel.build({
        email: email,
        password: password,
      });
      user.save();
      done(null, user);
    } catch (e) {
      done(e);
    }
  }
)
