const Product = require("../models/Product");

const slugify = require("slugify");
const cloudinary = require("../config/cloudinary");

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

    console.log("TITLE:", req.body.title);
    console.log("SLUG:", slug);

    const product = await Product.create({
      title: req.body.title,
      slug: slug,
      description: req.body.description,
      category: req.body.category,
      subCategory: req.body.subCategory,
      price: req.body.price,
      customizable: req.body.customizable,
      stock: req.body.stock,
      images: imageUrls
    });

    res.status(201).json(product);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL
exports.getProducts = async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
};

// GET SINGLE
exports.getProductBySlug = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  console.log(req.params);
  
  if (!product) return res.status(404).json({ message: "Not found" });

  res.json(product);
};

// UPDATE
exports.updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(product);
};

// DELETE
exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
};

// RELATED PRODUCTS
exports.getRelatedProducts = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    const relatedProducts = await Product.find({

      _id: { $ne: product._id },

      $or: [

        { category: product.category },

        { tags: { $in: product.tags } }

      ]

    })
    .limit(4);

    res.json(relatedProducts);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error"
    });

  }
};
