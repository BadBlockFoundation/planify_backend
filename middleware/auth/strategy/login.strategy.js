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
      const user = await User.findOne({
        where: {
          email: email
        }
      });
      if (!user) {
        return done(null, false, {
          message: 'Utilisateur inconnu'
        });
      }

      const validate = await user.isValidPassword(password);
      console.log(validate)
      if (!validate) {
        return done(null, false, {
          message: 'Mauvais mot de passe'
        });
      }
      const jwt = authLib.issueJWT(user);
      return done(null, user, {
        message: 'Connexion réussie',
        token: jwt.token,
        expiresIn: jwt.expiresIn,
      })
    } catch (e) {
      return done(null, false);
    }
  }
)
