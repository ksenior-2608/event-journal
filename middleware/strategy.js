const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const User=require("../models/user");


var passportStrategy = new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
  },
  function(email, password, done) {
    User.findOne({
      email: email,
    }, function(err, user) {
      if (err) return done(err);
      if (!user) {
        return done(null, false);
      }
      bcrypt.compare(password, user.password, function(err, result) {
        if (result === false) {
          return done(null, false);
        } else {
          return done(null, user);
        }
      });
    });
});

module.exports = passportStrategy;
