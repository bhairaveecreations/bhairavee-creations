const crypto = require("crypto");
const razorpay = require("../config/razorpay");
const Order = require("../models/Order");
const Product = require("../models/Product");
const { v4: uuidv4 } = require("uuid");
const sendEmail = require("../utils/sendEmail");
const User = require("../models/User");


/* ===============================
   CREATE ADVANCE PAYMENT ORDER
================================*/

exports.createAdvancePayment = async (req, res) => {

  try {

    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let calculatedTotal = 0;
    const validatedItems = [];

    for (const item of items) {

      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(400).json({
          message: `Product not found`
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `${product.title} out of stock`
        });
      }

      const itemTotal = product.price * item.quantity;
      calculatedTotal += itemTotal;

      validatedItems.push({
        productId: product._id,
        title: product.title,
        price: product.price,
        quantity: item.quantity,
        image: product.images?.[0] || ""
      });

    }

    const advanceAmount = Math.round(calculatedTotal * 0.5);

    const razorpayOrder = await razorpay.orders.create({
      amount: advanceAmount * 100,
      currency: "INR",
      receipt: `adv_${Date.now()}`
    });

    res.json({
      razorpayOrder,
      advanceAmount,
      calculatedTotal,
      validatedItems
    });

  } catch (error) {

    console.error("CREATE ADVANCE ERROR:", error);

    res.status(500).json({
      message: "Payment creation failed"
    });

  }

};


/* ===============================
   VERIFY ADVANCE PAYMENT
================================*/

exports.verifyAdvancePayment = async (req, res) => {

  try {

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      items,
      totalAmount,
      shippingAddress
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {

      return res.status(400).json({
        message: "Payment verification failed"
      });

    }

    const advanceAmount = Math.round(totalAmount * 0.5);
    const remainingAmount = totalAmount - advanceAmount;

    const order = await Order.create({

      userId: req.user.id,

      items,

      totalAmount,

      advanceAmount,

      remainingAmount,

      shippingAddress,

      paymentStatus: "advance-paid",

      razorpayOrderId: razorpay_order_id,

      razorpayPaymentId: razorpay_payment_id,

      orderStatus: "processing"

    });

    const user = await User.findById(req.user.id);

await sendEmail(

process.env.ADMIN_EMAIL,

"New Order Received",

`
<h2>New Order Received</h2>

<p>Customer: ${user.name}</p>
<p>Email: ${user.email}</p>

<p>Total Amount: ₹${totalAmount}</p>

<p>Advance Paid: ₹${advanceAmount}</p>

<p>Order ID: ${order._id}</p>

`

);
    res.json({
      success: true,
      order
    });

  } catch (error) {

    console.error("VERIFY ADVANCE ERROR:", error);

    res.status(500).json({
      message: "Verification failed"
    });

  }

};


/* ===============================
   CREATE REMAINING PAYMENT
================================*/

exports.createRemainingPayment = async (req, res) => {

  try {

    const { orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    const razorpayOrder = await razorpay.orders.create({

      amount: order.remainingAmount * 100,

      currency: "INR",

      receipt: `rem_${Date.now()}`

    });

    res.json({
      razorpayOrder
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Remaining payment failed"
    });

  }

};


/* ===============================
   VERIFY REMAINING PAYMENT
================================*/

exports.verifyRemainingPayment = async (req, res) => {

  try {

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {

      return res.status(400).json({
        message: "Invalid signature"
      });

    }

    const order = await Order
      .findById(orderId)
      .populate("userId");

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    order.paymentStatus = "fully-paid";
    order.remainingPaymentId = razorpay_payment_id;

    await order.save();

    /* Notify Admin */

    await sendEmail(
      process.env.ADMIN_EMAIL,
      "Remaining Payment Received",
      `
      <h2>Remaining Payment Received</h2>

      <p>Customer completed remaining payment.</p>

      <p><b>Customer:</b> ${order.userId.name}</p>
      <p><b>Email:</b> ${order.userId.email}</p>

      <p><b>Order ID:</b> ${order._id}</p>

      <p><b>Total:</b> ₹${order.totalAmount}</p>
      <p><b>Advance:</b> ₹${order.advanceAmount}</p>
      <p><b>Remaining Paid:</b> ₹${order.remainingAmount}</p>

      <p>Please ship the order.</p>
      `
    );

    res.json({
      success: true
    });

  } catch (error) {

    console.error("VERIFY REMAINING ERROR:", error);

    res.status(500).json({
      message: "Remaining verification failed"
    });

  }

};