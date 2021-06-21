const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.SALT_ROUNDS);
const User = require("../models/user");
const express = require("express");

var router = express.Router();


router.get('/', function(req, res) {
    res.render("register");
});

router.post('/', function(req, res) {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        if (err) {
            console.log(err);
        } else {
            let newUser = new User({
                username: req.body.name,
                email: req.body.email,
                password: hash,
                events: [],
            });
            newUser.save(function(err) {
                if (err) {
                    console.log(err);
                } else {
                    req.login(newUser, function(err) {
                        if (err) {
                            req.flash("error", err.message);
                            console.log(err);
                        } else {
                            req.flash("success", "Welcome " + newUser.username);
                            res.redirect("/home");
                        }
                    });
                }
            });
        }
    });
});

module.exports = router;
