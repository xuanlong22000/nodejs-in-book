const router = require("express").Router()
const usersController = require("../controllers/usersController")

router.get('/welcome', usersController.welcome)
router.get("/", usersController.index)
router.get("/login", usersController.login)
router.get("/logout", usersController.logout)
router.post('/create', usersController.validate, usersController.create)
router.post("/login", usersController.authenticate)

router.get('/new', usersController.new)

router.get("/:id", usersController.show)

router.get("/:id/edit", usersController.edit)
router.put("/:id/update", usersController.update)
router.delete("/:id/delete", usersController.delete)

module.exports = router