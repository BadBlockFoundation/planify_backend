const localStrategy = require('passport-local').Strategy;
const UserModel = require('../../../models/user.model')

module.exports = new localStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) =>{
    try{
      const user = await User.findOne({where:{email : email}});
      if(!user){
        return done(null, false, {message: 'Utilisateur inconnu'});
      }

      const validate = await user.isValidPassword(password);
      if(!validate){
        return done(null, false, {message: 'Mauvais mot de passe'});
      }
      return done(null, user, {message : 'Connexion réussie'})
    } catch(e){
      return done(e);
    }
  }
)
