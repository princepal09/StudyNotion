const express = require("express")
const router = express.Router();

const{capturePayment, verifyPayment } = require("../controllers/Payment")
const{auth, isInstructor, isStudent, isAdmin} = require("../middlewares/Auth")

router.post("/capturePayment", auth, isStudent, capturePayment)
router.post("/verifySignature", auth, isStudent,     verifyPayment)

module.exports = router