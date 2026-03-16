const Order = require("../models/Order");
const Product = require("../models/Product");
const razorpay = require("../config/razorpay");
const sendEmail = require("../utils/sendEmail");
const User = require("../models/User");

// Create Order
exports.createOrder = async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let calculatedTotal = 0;
    const validatedItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res
          .status(400)
          .json({ message: `Product not found: ${item.productId}` });
      }

      if (product.stock < item.quantity) {
        return res
          .status(400)
          .json({ message: `${product.title} is out of stock` });
      }

      const itemTotal = product.price * item.quantity;
      calculatedTotal += itemTotal;

      validatedItems.push({
        productId: product._id,
        title: product.title,
        price: product.price,
        quantity: item.quantity,
        image: product.images?.[0] || "",
      });
    }

    const order = await Order.create({
      userId: req.user.id,
      items: validatedItems,
      totalAmount: calculatedTotal,
      shippingAddress,
    });

    for (const item of validatedItems) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stock: -item.quantity },
      });
    }

    const user = await User.findById(req.user.id);

    // Email to Admin
    try {
      await sendEmail(
        process.env.ADMIN_EMAIL,
        "New Order Received",
        `
        <h2>New Order Received</h2>
        <p><b>Customer:</b> ${user.name}</p>
        <p><b>Email:</b> ${user.email}</p>
        <p><b>Total:</b> ₹${calculatedTotal}</p>
        <p><b>Order ID:</b> ${order._id}</p>
        `
      );
    } catch (e) {
      console.error("Admin email failed:", e);
    }

    // Email to Customer
    try {
      await sendEmail(
        user.email,
        "Order Confirmation - Bhairvee Creations",
        `
        <h2>Your Order is Confirmed 🎉</h2>
        <p>Hello ${user.name}</p>
        <p><b>Order ID:</b> ${order._id}</p>
        <p><b>Total:</b> ₹${calculatedTotal}</p>
        `
      );
    } catch (e) {
      console.error("Customer email failed:", e);
    }

    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Customer Orders
exports.getMyOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.user.id }).sort({
    createdAt: -1,
  });
  res.json(orders);
};

// Admin Orders
exports.getAllOrders = async (req, res) => {
  const orders = await Order.find()
    .populate("userId", "name email")
    .sort({ createdAt: -1 });

  res.json(orders);
};

// Update Order Status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id).populate("userId");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.orderStatus = status;
    await order.save();
    console.log(order);
    
    // Notify customer about status change
    try {
      await sendEmail(
        order.userId.email,
        "Order Status Updated",
        `
        <h2>Status Updated</h2>
        <p>Hello ${order.userId.name}</p>
        <p><b>Order:</b> ${order._id}</p>
        <p><b>Status:</b> ${status}</p>
        `
      );
    } catch (e) {
      console.error("Status email failed:", e);
    }

    res.json({ success: true, order });
  } catch (error) {
    console.error("UPDATE STATUS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Request Remaining Payment
exports.requestRemainingPayment = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("userId");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (!order.remainingPaymentLink) {
      return res
        .status(400)
        .json({ message: "Payment link not generated yet" });
    }

    await sendEmail(
      order.userId.email,
      "Remaining Payment Required",
      `
      <h2>Your Order Is Ready</h2>
      <p>Hello ${order.userId.name}</p>
      <p><b>Remaining:</b> ₹${order.remainingAmount}</p>
      <a href="${order.remainingPaymentLink}">Pay Now</a>
      `
    );

    res.json({ success: true, message: "Payment request sent" });
  } catch (error) {
    console.error("REQUEST PAYMENT ERROR:", error);
    res.status(500).json({ message: "Failed to send payment request" });
  }
};

// Get single order
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "userId",
      "name email"
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};