// controllers/productController.js

const Product = require("../models/Product");
const slugify = require("slugify");
const cloudinary = require("../config/cloudinary");

// CREATE
 exports.createProduct = async (req, res) => {
  try {

    const imageUrls = [];

    if (req.files) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(
          `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
          { folder: "bhairvee-products" }
        );
        imageUrls.push(result.secure_url);
      }
    }

    const slug = slugify(req.body.title, {
      lower: true,
      strict: true
    });

    const product = await Product.create({
      title: req.body.title,
      slug,
      description: req.body.description,
      category: req.body.category,
      subCategory: req.body.subCategory,
      price: req.body.price,
      customizable: req.body.customizable,
      stock: req.body.stock,
      images: imageUrls,

      // 🔥 NEW
      tags: JSON.parse(req.body.tags || "[]"),
      variants: JSON.parse(req.body.variants || "[]")
    });

    res.status(201).json(product);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL
exports.getProducts = async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
};

// GET ONE
exports.getProductBySlug = async (req, res) => {
  try {

    console.log("SLUG:", req.params.slug);

    const product = await Product.findOne({
      slug: req.params.slug
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json(product);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
// SEARCH BY TAG
exports.searchProducts = async (req, res) => {
  try {
    const { q } = req.query;

    const products = await Product.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { tags: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } }
      ]
    });

    res.json(products);

  } catch (error) {
    res.status(500).json({ message: "Search error" });
  }
};

// RELATED
exports.getRelatedProducts = async (req, res) => {

  const product = await Product.findById(req.params.id);

  const related = await Product.find({
    _id: { $ne: product._id },
    $or: [
      { category: product.category },
      { tags: { $in: product.tags || [] } }
    ]
  }).limit(4);

  res.json(related);
};

// UPDATE PRODUCT
exports.updateProduct = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 🔥 HANDLE NEW IMAGES (optional)
    let imageUrls = product.images;

    if (req.files && req.files.length > 0) {
      imageUrls = [];

      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(
          `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
          { folder: "bhairvee-products" }
        );
        imageUrls.push(result.secure_url);
      }
    }

    // 🔥 UPDATE SLUG IF TITLE CHANGED
    const slug = slugify(req.body.title || product.title, {
      lower: true,
      strict: true
    });

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        slug,
        description: req.body.description,
        category: req.body.category,
        subCategory: req.body.subCategory,
        price: req.body.price,
        customizable: req.body.customizable,
        stock: req.body.stock,
        images: imageUrls,

        // 🔥 IMPORTANT
        tags: req.body.tags
          ? JSON.parse(req.body.tags)
          : product.tags,

        variants: req.body.variants
          ? JSON.parse(req.body.variants)
          : product.variants
      },
      { new: true }
    );

    res.json(updatedProduct);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 🔥 OPTIONAL: delete images from Cloudinary
    // (skip if not needed for now)

    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: "Product deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};