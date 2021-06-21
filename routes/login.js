const express = require("express");
const passport = require("passport");

var router = express.Router();

router.get('/', function(req, res) {
    res.render("login");
});

router.post('/', function(req, res) {
    passport.authenticate('local',
        function(err, user) {
            if (err) {
                console.log(err);
            }
            if (!user) {
                req.flash("error", "Wrong Credentials");
                res.redirect('/login');
            }
            req.login(user, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    req.flash("success", "Welcome " + user.username);
                    res.redirect("/home");
                }
            });
        }
    )(req, res);
});

module.exports = router;
