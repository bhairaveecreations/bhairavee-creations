const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  title: String,
  price: Number,
  quantity: Number,
  image: String,
});

const orderSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  items: [orderItemSchema],

  totalAmount: Number,

  advanceAmount: Number,
  remainingAmount: Number,

  remainingPaymentLink: String,
  remainingPaymentId: String,
  remainingRazorpayOrderId: String,

  paymentStatus: {
    type: String,
    enum: ["pending","advance-paid","fully-paid"],
    default: "pending"
  },

  razorpayOrderId: String,
  razorpayPaymentId: String,

  shippingAddress: {
    fullName: String,
    phone: String,
    addressLine: String,
    city: String,
    state: String,
    pincode: String
  },

  orderStatus: {
    type: String,
    enum: ["processing","ready-for-shipping","delivered","cancelled"],
    default: "processing"
  }

},{timestamps:true})

module.exports = mongoose.model("Order", orderSchema);