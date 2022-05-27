const router = require("express").Router()
const userRoutes = require("./userRoutes")
const courseRoutes = require("./courseRoutes")
const apiRoutes = require("./apiRoutes")

router.use("/users", userRoutes);
router.use("/courses", courseRoutes);
router.use("/api", apiRoutes)

module.exports = router