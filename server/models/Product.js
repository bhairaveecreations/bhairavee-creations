const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
{
  title: { type: String, required: true },

  slug: { type: String, unique: true, index: true,required: true },

  description: { type: String, required: true },

  category: {
    type: String,
    required: true
  },

  subCategory: {
    type: String
  },

  tags: [
    { type: String }
  ],

  price: { type: Number, required: true },

  images: [String],

  customizable: { type: Boolean, default: false },

  stock: { type: Number, default: 1 },

  featured: { type: Boolean, default: false }

},
{ timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);