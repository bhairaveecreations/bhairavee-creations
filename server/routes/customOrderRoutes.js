const express = require("express");
const router = express.Router();

const {
  createCustomOrder,
  getCustomOrders,
  updateCustomOrderStatus,
  getMyCustomOrders
} = require("../controllers/customOrderController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// user creates request
router.post("/", protect, createCustomOrder);

// admin views all
router.get("/", protect, adminOnly, getCustomOrders);

// admin update status
router.put("/:id", protect, adminOnly, updateCustomOrderStatus);
// user views their requests
router.get("/my", protect, getMyCustomOrders );
module.exports = router;