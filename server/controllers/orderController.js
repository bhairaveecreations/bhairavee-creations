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
        "🛍️ New Order Received - Bhairavee Creattions",
`
<div style="font-family: 'Segoe UI', sans-serif; background: #1A120B; color: #f5e6c8; padding: 20px; border-radius: 12px;">
  
  <h2 style="color: #d4af37; text-align: center; margin-bottom: 10px;">
    ✨ New Order Alert ✨
  </h2>

  <p style="text-align: center; font-size: 14px; color: #cbb27a;">
    A new order has been placed on your store
  </p>

  <div style="background: #2a1d14; padding: 20px; border-radius: 10px; margin-top: 20px; border: 1px solid rgba(212,175,55,0.2);">
    
    <p style="margin: 8px 0;">👤 <b>Customer:</b> ${user.name}</p>
    <p style="margin: 8px 0;">📧 <b>Email:</b> ${user.email}</p>
    <p style="margin: 8px 0;">🆔 <b>Order ID:</b> ${order._id}</p>
    
    <hr style="border: none; border-top: 1px solid rgba(212,175,55,0.2); margin: 15px 0;" />
    
    <p style="font-size: 18px; margin: 10px 0;">
      💰 <b>Total Amount:</b> 
      <span style="color: #d4af37; font-weight: bold;">₹${calculatedTotal}</span>
    </p>

  </div>

  <div style="text-align: center; margin-top: 25px;">
    <p style="font-size: 13px; color: #a88c4a;">
      🕉️ Bhairavee Creattions Admin Panel
    </p>
  </div>

</div>
`
      );
    } catch (e) {
      console.error("Admin email failed:", e);
    }

    // Email to Customer
    try {
      await sendEmail(
        user.email,
        "✨ Order Confirmed - Bhairavee Creattions",
`
<div style="font-family: 'Segoe UI', sans-serif; background: #1A120B; color: #f5e6c8; padding: 25px; border-radius: 12px;">
  
  <h2 style="color: #d4af37; text-align: center; margin-bottom: 10px;">
    🎉 Your Order is Confirmed!
  </h2>

  <p style="text-align: center; font-size: 14px; color: #cbb27a;">
    Thank you for choosing Bhairavee Creattions 💖
  </p>

  <div style="background: #2a1d14; padding: 20px; border-radius: 10px; margin-top: 20px; border: 1px solid rgba(212,175,55,0.2);">
    
    <p style="margin: 8px 0;">🙏 Hello <b>${user.name}</b>,</p>
    
    <p style="margin: 8px 0;">🧾 <b>Order ID:</b> ${order._id}</p>

    <hr style="border: none; border-top: 1px solid rgba(212,175,55,0.2); margin: 15px 0;" />

    <p style="font-size: 18px; margin: 10px 0;">
      💰 <b>Total Paid:</b> 
      <span style="color: #d4af37; font-weight: bold;">₹${calculatedTotal}</span>
    </p>

    <p style="margin-top: 15px; font-size: 14px; color: #cbb27a;">
      ✨ Your handcrafted product is now being prepared with care and love.
    </p>

  </div>

  <div style="text-align: center; margin-top: 25px;">
    
    <p style="font-size: 14px; margin-bottom: 10px;">
      📦 We’ll notify you once your order is shipped.
    </p>

    <p style="font-size: 13px; color: #a88c4a;">
      With love,<br/>
      🕉️ <b>Bhairavee Creattions</b>
    </p>

  </div>

</div>
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
    console.log("before email ");
    
    
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
    console.log("yes here");
    
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