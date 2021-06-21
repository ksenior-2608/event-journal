const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const eventSchema = require("./event");


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: 1
    },
    email: {
        type: String,
        required: 1
    },
    password: {
        type: String,
        required: 1
    },
    events: {
        type: [eventSchema],
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
