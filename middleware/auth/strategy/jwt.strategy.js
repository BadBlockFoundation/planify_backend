const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const db = require("../../../models/index");
const User = db.users;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "notsecret",
  algorithm: ['RS256']
};

module.exports = new JwtStrategy(options, async (jwt_payload, done) => {
  User.findOne({
      _id: jwt_payload.sub
    })
    .then((user) => {
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }

    })
    .catch(err => done(err, null));

})
