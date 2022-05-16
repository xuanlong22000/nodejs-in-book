const mongoose = require('mongoose')
const usersController = require("./controllers/usersController")
const express = require('express')
const app = express()
const router = express.Router()
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

app.use("/", router)

router.get('/users/new', usersController.new)
router.post('/users/create', usersController.create, usersController.redirectView)
router.get("/users/:id", usersController.show)
router.get("/users", usersController.index)

app.listen(port, () => { console.log(`Sever running on port ${port}`) })