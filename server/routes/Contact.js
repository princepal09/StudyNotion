const express = require("express");
const { contactController } = require("../controllers/Contact");
const router = express.Router();


router.post("/contact", contactController)

module.exports = router;