const express = require("express");
const mongoose = require("mongoose");
const url = require("url");
const HomeEvent = require("../models/homeEvent");
const User = require("../models/user");

var router = express.Router();

var homeStartingContent = "Digital journals bring supporters' ads online where they reach 5-10 times more people \
and link to sponsor websites.This exposure in association with your organization increases the value of \
sponsorship packages, and gives you the opportunity to raise more funds. \
Our Event Journal website hosts your event ad and is responsible for proper marketing of your event.";

router.get("/", function(req, res) {
    // let docId = req.params.homePageEventsId;
    HomeEvent.findById(homePageEvents.id, function(err, doc) {
        if (err) {
            console.log(err);
        } else {
            res.render("homepage", {
                homeContent: homeStartingContent,
                events: doc.homeEvents,
            });
        }
    });
});

router.post("/", async function(req, res) {
    let userId = req.session.passport.user;
    let eventId = req.body.eventId;
    let currentEvent;
    await User.findById(userId, function(err, user) {
        if (err) {
            console.log(err);
        } else {
            user.events.forEach(function(event) {
                if (event.id === eventId) {
                    currentEvent = event;
                }
            });
        }
    });
    HomeEvent.findByIdAndUpdate(
        homePageEvents.id, {
            $push: {
                homeEvents: currentEvent
            }
        },
        function(err, doc) {
            if (err) {
                console.log(err);
            } else {
                res.redirect("/");
            }
        }
    );
});

module.exports = router;
