const express = require("express");

var router = express.Router();

router.get('/', function (req, res) {
    if (!req.session.passport) {
        res.redirect("/login");
    } else {
        res.render("create");
    }
});

module.exports = router;
