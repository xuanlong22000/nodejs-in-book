const router = require("express").Router()
const homeController = require("../controllers/homeController")

router.get('/chat', homeController.chat)

module.exports = router