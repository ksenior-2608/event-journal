require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const cookieKey=process.env.SECRET_KEY;
const flash = require('connect-flash');

const User = require("./models/user");
const eventSchema = require("./models/event");
const Event = mongoose.model("Event", eventSchema);
const HomeEvent = require("./models/homeEvent");

const passportStrategy = require("./middleware/strategy");


if(HomeEvent.find(function(err,doc){
    if(err){
        console.log(err);
    }else{
        if(doc.length == 0){
            homePageEvents = new HomeEvent({
                homeEvents: [],
            });
            homePageEvents.save();
        }else{
            homePageEvents = doc[0];
        }
    }
}));


const homePageRoute = require("./routes/homepage");
const homeRoute = require("./routes/home");
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const logoutRoute = require("./routes/logout");
const createEventRoute = require("./routes/create");
const viewEventRoute = require("./routes/event");
const editEventRoute = require("./routes/edit");
const deleteEventRoute = require("./routes/delete");
const filterEventRoute = require("./routes/filter");

const app = express();

mongoose.set('useFindAndModify', false);
mongoose.set("useCreateIndex", true);
mongoose.connect('mongodb://localhost:27017/userDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(__dirname + "/public/"));

app.use(session({
    secret: cookieKey,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 *7,
        secure: false
    }
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
    // console.log("local Called");
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


passport.use(passportStrategy);

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(
        id,
        function(err, user) {
            done(err, user);
        }
    );
});


app.use("/",homePageRoute);
app.use("/home", homeRoute);
app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use("/logout", logoutRoute);
app.use("/create", createEventRoute);
app.use("/event", viewEventRoute);
app.use("/edit", editEventRoute);
app.use("/delete", deleteEventRoute);
app.use("/filter", filterEventRoute);

app.listen(3000, function() {
    console.log("Server started on port 3000");
});
