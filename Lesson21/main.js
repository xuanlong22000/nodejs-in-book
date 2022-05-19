const mongoose = require('mongoose')
const subscribersController = require("./controllers/subscribersController")
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

router.get('/', subscribersController.welcome)
router.get("/subscribers", subscribersController.index);
router.get("/subscribers/new", subscribersController.new);
router.post("/subscribers/create", subscribersController.create)
router.get("/subscribers/:id", subscribersController.show)
router.get("/subscribers/:id/edit", subscribersController.edit)
router.put("/subscribers/:id/update", subscribersController.update)
router.delete("/subscribers/:id/delete", subscribersController.delete)

app.listen(port, () => { console.log(`Sever running on port ${port}`) })