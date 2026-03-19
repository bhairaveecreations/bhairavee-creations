// models/Product.js

const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema({
  name: String,
  price: Number
});

const productSchema = new mongoose.Schema(
{
  title: { type: String, required: true },

  slug: { type: String, unique: true, required: true },

  description: { type: String, required: true },

  category: { type: String, required: true },

  subCategory: String,

  tags: [{ type: String }],

  variants: [variantSchema], // 🔥 NEW

  price: { type: Number, required: true },

  images: [String],

  customizable: { type: Boolean, default: false },

  stock: { type: Number, default: 1 }

},
{ timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);