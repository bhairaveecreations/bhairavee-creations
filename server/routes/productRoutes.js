const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProducts,
  getProductBySlug,
  updateProduct,
  deleteProduct,
  getRelatedProducts,
  searchProducts
} = require("../controllers/productController");

const upload = require("../middleware/uploadMiddleware");
const { protect, adminOnly } = require("../middleware/authMiddleware");


// ✅ PUBLIC ROUTES

// 1. ALL PRODUCTS
router.get("/", getProducts);

// 2. SEARCH (must come before slug)
router.get("/search", searchProducts);

// 3. RELATED (must come before slug)
router.get("/:id/related", getRelatedProducts);

// 4. SINGLE PRODUCT (LAST)
router.get("/:slug", getProductBySlug);


// ✅ ADMIN ROUTES

router.post(
  "/",
  protect,
  adminOnly,
  upload.array("images", 5),
  createProduct
);

router.put("/:id", protect, adminOnly, upload.array("images", 5), updateProduct);

router.delete("/:id", protect, adminOnly, deleteProduct);

module.exports = router;