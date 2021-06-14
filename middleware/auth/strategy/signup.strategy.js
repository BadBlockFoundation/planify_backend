const localStrategy = require('passport-local').Strategy;
const db = require("../../../models/index");
const User = db.users;
const authLib = require("../../../lib/auth");

module.exports = new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      const user = await User.build({
        email: email,
        password: password,
      });
      await user.save();
      const jwt = authLib.issueJWT(user);
      done(null, user, {
        token: jwt.token,
        expiresIn: jwt.expiresIn
      });
    } catch (e) {
      done(e);
    }
  }
)
