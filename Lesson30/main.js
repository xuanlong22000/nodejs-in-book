const expressSession = require("express-session")
const cookieParser = require("cookie-parser")
const connectFlash = require("connect-flash")
const passport = require("passport");
const mongoose = require('mongoose')
const expressValidator = require("express-validator")
const User = require("./models/user");
const express = require('express')
const app = express()
const router = require('./routes/index')
const chatController = require("./controllers/chatController")
const methodOverride = require("method-override");
const layout = require('express-ejs-layouts')
const port = 3000

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(layout)

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

mongoose.connect(
    "mongodb://localhost:27017/recipe_db",
    { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;

app.use(methodOverride("_method", {
    methods: ["POST", "GET"]
}))

app.use(cookieParser("secretCuisine123"));
app.use(expressSession({
    secret: "secretCuisine123",
    cookie: {
        maxAge: 4000000
    },
    resave: false,
    saveUninitialized: false
}))
app.use(connectFlash())

app.use(passport.initialize())
app.use(passport.session())
passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    res.locals.loggedIn = req.isAuthenticated();
    res.locals.currentUser = req.user;
    next();
});
app.use(expressValidator())
const server = app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})
const io = require("socket.io")(server);
chatController(io)

app.use("/", router)


