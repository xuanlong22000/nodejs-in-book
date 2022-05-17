const mongoose = require('mongoose')
const usersController = require("./controllers/usersController")
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
app.use("/", router)

router.get('/', usersController.welcome)
router.get('/users/new', usersController.new)
router.post('/users/create', usersController.create, usersController.redirectView)
router.get("/users/:id", usersController.show)
router.get("/users", usersController.index)
router.get("/users/:id/edit", usersController.edit)
router.put("/users/:id/update", usersController.update, usersController.redirectView)
router.delete("/users/:id/delete", usersController.delete, usersController.redirectView)

app.listen(port, () => { console.log(`Sever running on port ${port}`) })