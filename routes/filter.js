const express = require("express");
const User = require("../models/user");

var router = express.Router();

function convertDate(date) {
    var parts = date.split('-');
    var mydate = new Date(parts[0], parts[1] - 1, parts[2]);
    mydate.setDate(mydate.getDate() + 1);
    return mydate;
}

router.post("/", function(req, res) {
    User.findById(
        req.session.passport.user,
        function(err, user) {
            if (err) {
                console.log(err);
            } else {
                let stDate = convertDate(req.body.stDate);
                let endDate = convertDate(req.body.endDate);
                let hitDates = [];
                user.events.forEach(function(doc) {
                    let eventDate = convertDate(doc.date);
                    if (eventDate.getDate() >= stDate.getDate() && eventDate.getDate() <= endDate.getDate()) {
                        hitDates.push(doc);
                    }
                });
                res.render("home", {
                    userEvents: hitDates,
                });
            }
        }
    )
});

module.exports = router;
