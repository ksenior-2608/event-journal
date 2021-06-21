const express = require("express");
const User = require("../models/user");

var router = express.Router();

router.get("/:eventId", function(req, res) {
    let uid = req.session.passport.user;
    let eid = req.params.eventId;
    User.findById(
        uid,
        function(err, user) {
            if (err) {
                console.log(err);
            } else {
                user.events.forEach(function(doc) {
                    if (doc.id === eid) {
                        res.render("event", {
                            userId: uid,
                            eventDetails: doc,
                        });
                    }
                })
            }
        }
    )
});

module.exports = router;
