const express = require("express");
const User = require("../models/user");
const eventSchema = require("../models/event");
const mongoose = require("mongoose");
const Event = mongoose.model("Event", eventSchema);

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
                        res.render("edit", {
                            eventDetails: doc,
                        });
                    }
                });
            }
        }
    );
});


router.post("/:eventId", function(req, res) {
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
                        var updateEvent = new Event({
                            title: doc.title,
                            date: req.body.eventDate,
                            time: req.body.eventTime,
                            img: doc.img,
                            descript: req.body.eventDescript,
                        });
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
                                    console.log("Event Successfully removed");
                                }
                            }
                        )
                        User.findByIdAndUpdate(
                            uid, {
                                $push: {
                                    events: updateEvent,
                                }
                            },
                            function(err) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log("Event Successfully added");
                                    res.redirect("/home");
                                }
                            }
                        )
                    }
                });
            }
        }
    );
});

module.exports = router;
