const express = require("express");
const mongoose = require("mongoose");
const eventSchema = require("./event");

var router = express.Router();

const homeEventSchema = new mongoose.Schema({
    homeEvents: [eventSchema]
});

module.exports = mongoose.model("HomeEvent", homeEventSchema);
