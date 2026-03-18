const mongoose = require("mongoose");

const customOrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    productType: String,
    dimensions: String,
    colorPreference: String,
    budget: String,
    message: String,

    // ✅ NEW
    phone: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "contacted", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CustomOrder", customOrderSchema);