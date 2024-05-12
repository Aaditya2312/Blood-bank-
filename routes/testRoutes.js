const express = require("express")
const { testController } = require("../controllers/testController")
const router = express.Router()

//routes
router.get('/',testController)

//exports
module.exports = router