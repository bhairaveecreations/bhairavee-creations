const express = require("express");
const router = express.Router();

const {
  createAdvancePayment,
  verifyAdvancePayment,
  createRemainingPayment,
  verifyRemainingPayment
} = require("../controllers/paymentController");

const { protect } = require("../middleware/authMiddleware");

const { paymentWebhook } = require("../controllers/paymentWebhookController");
const { requestRemainingPayment } = require("../controllers/orderController");

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  paymentWebhook
);

router.post(
  "/request-payment/:id",
  protect,
  requestRemainingPayment
);

router.post("/create-advance", protect, createAdvancePayment);

router.post("/verify-advance", protect, verifyAdvancePayment);

router.post("/create-remaining", protect, createRemainingPayment);

router.post("/verify-remaining", protect, verifyRemainingPayment);



module.exports = router;