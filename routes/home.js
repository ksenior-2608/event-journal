const express = require("express");
const User = require("../models/user");
const eventSchema = require("../models/event");
const mongoose = require("mongoose");
const upload = require("../middleware/images");

const Event = mongoose.model("Event", eventSchema);

var router = express.Router();


router.get('/', function (req, res) {
    if (!req.session.passport) {
        res.redirect("/login");
    } else {
        User.findById(req.session.passport.user, function (err, user) {
            res.render("home", {
                userEvents: user.events,
            })
        });
    }
});


router.post('/', upload.single("eventImg"), function (req, res) {
    let userId = req.session.passport.user;
    let newEvent = new Event({
        title: req.body.eventTitle,
        date: req.body.eventDate,
        time: req.body.eventTime,
        img: req.file.filename,
        descript: req.body.eventDescript,
    });
    User.findByIdAndUpdate(
        userId, {
        $push: {
            events: newEvent,
        }
    },
        function (err, user) {
            if (err) {
                console.log(err);
            } else {
                console.log("Event created Successfully");
                res.redirect("/home");
            }
        }
    );
});

module.exports = router;
