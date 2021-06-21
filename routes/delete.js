const express = require("express");
const User = require("../models/user");
const url = require("url");

var router = express.Router();

router.get("/:eventId", function(req, res) {
    let uid = req.session.passport.user;
    let eid = req.params.eventId;
    User.findByIdAndUpdate(
        uid, {
            $pull: {
                events: {
                    _id: eid,
                }
            }
        },
        function(err) {
            if (err) {
                console.log(err);
            } else {
                res.redirect("/home");
            }
        }
    )
});

module.exports = router;
