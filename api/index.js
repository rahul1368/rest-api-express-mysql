const router = require("express").Router();
const userRoutes = require("./modules/user/user.route")
router.use("/user",userRoutes)
module.exports = router;