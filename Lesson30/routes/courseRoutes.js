const router = require("express").Router()
const coursesController = require("../controllers/coursesController")

router.get("/", coursesController.index)

module.exports = router