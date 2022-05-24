const expressSession = require("express-session")
const cookieParser = require("cookie-parser")
const connectFlash = require("connect-flash")
const passport = require("passport");
const mongoose = require('mongoose')
const expressValidator = require("express-validator")
const usersController = require("./controllers/usersController")
const User = require("./models/user");
const express = require('express')
const app = express()
const router = express.Router()
const methodOverride = require("method-override");
const layout = require('express-ejs-layouts')
const port = 3000

app.set('view engine', 'ejs')
app.use(layout)

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

mongoose.connect(
    "mongodb://localhost:27017/recipe_db",
    { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;

router.use(methodOverride("_method", {
    methods: ["POST", "GET"]
}))

router.use(cookieParser("secret_passcode"));
router.use(expressSession({
    secret: "secret_passcode",
    cookie: {
        maxAge: 4000000
    },
    resave: false,
    saveUninitialized: false
}))
router.use(connectFlash())

router.use(passport.initialize())
router.use(passport.session())
passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

router.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    res.locals.loggedIn = req.isAuthenticated();
    res.locals.currentUser = req.user;
    next();
});
router.use(expressValidator())


app.use("/", router)
router.get("/users/login", usersController.login)
router.get("/users/logout", usersController.logout)
router.post('/users/create', usersController.validate, usersController.create)
router.post("/users/login", usersController.authenticate)
router.get('/', usersController.welcome)
router.get('/users/new', usersController.new)

router.get("/users/:id", usersController.show)
router.get("/users", usersController.index)
router.get("/users/:id/edit", usersController.edit)
router.put("/users/:id/update", usersController.update)
router.delete("/users/:id/delete", usersController.delete)


app.listen(port, () => { console.log(`Sever running on port ${port}`) })