const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProductBySlug,
  updateProduct,
  deleteProduct,
  getRelatedProducts
} = require("../controllers/productController");
const upload = require("../middleware/uploadMiddleware");

const { protect, adminOnly } = require("../middleware/authMiddleware");

router.get("/", getProducts);
router.get("/:slug", getProductBySlug);

router.post(
  "/",
  protect,
  adminOnly,
  upload.array("images", 5),
  createProduct
);  
router.put("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);
router.get("/:id/related", getRelatedProducts);

module.exports = router;