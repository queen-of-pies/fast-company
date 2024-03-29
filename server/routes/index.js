const express = require("express")

const router = express.Router({mergeParams: true})

router.use("/auth", require("./auth.routes"))
router.use("/comment", require("./comment.routes"))
router.use("/profession", require("./profession.routes"))
router.use("/quality", require("./quality.routes"))
router.use("/user", require("./user.routs"))

module.exports = router

