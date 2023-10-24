const express = require("express");

const port = 8060;

const app = express();

const path = require("path")

const db = require("./config/mongoose");

const admin = require("./models/adminmodel");

const cookieparser = require('cookie-parser');

const passport = require('passport');

const localStrategy = require("./config/passport_local");

const session = require('express-session');

const flash = require("connect-flash"); 
const flashmessage = require("./config/fleshmessage");
app.use(flash());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded());

app.use(cookieparser());

app.use('/uploads',express.static(path.join(__dirname,'uploads')));

app.use(express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "user_assets")));


app.use(session({
    name : "shreyansh",
    secret : "CodeData",
    resave : false,
    saveUninitialized : true,
    cookie : {
        maxAge : 60*60*1000
    }
}));

app.use(passport.session());
app.use(passport.initialize());
app.use(passport.setAuthenticatedUser);

app.use(flashmessage.setflash);

app.use("/admin", require("./routs/admin"));
app.use("/" , require("./routs/user"));

app.listen(port, function (err) {
    if (err) {
        console.log("server is not running");
        return false;

    }
    else {
        console.log("server is running on port:", port)
    }
});



