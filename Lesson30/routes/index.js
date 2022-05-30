const router = require("express").Router()
const userRoutes = require("./userRoutes")
const courseRoutes = require("./courseRoutes")
const apiRoutes = require("./apiRoutes")
const homeRoutes = require("./homeRoutes")

router.use("/users", userRoutes);
router.use("/courses", courseRoutes);
router.use("/api", apiRoutes)
router.use('/', homeRoutes)

module.exports = router