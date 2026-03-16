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
        return res.status(400).json({
          message: `Product not found: ${item.productId}`,
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `${product.title} is out of stock`,
        });
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

    /* SEND EMAIL TO OWNER */

    try {

      const user = await User.findById(req.user.id);

      await sendEmail(
        process.env.ADMIN_EMAIL,
        "New Order Received",
        `
        <h2>New Order Received</h2>

        <p><b>Customer:</b> ${user.name}</p>
        <p><b>Email:</b> ${user.email}</p>
        

        <p><b>Total Amount:</b> ₹${calculatedTotal}</p>

        <p><b>Order ID:</b> ${order._id}</p>
        `
      );

      console.log("Admin notified of new order");

    } catch (err) {

      console.error("ADMIN EMAIL ERROR:", err);

    }


     /* EMAIL TO CUSTOMER */

    try {

      const user = await User.findById(req.user.id);

      await sendEmail(
        user.email,
        "Order Confirmation - Bhairvee Creations",
        `
        <h2>Your Order is Confirmed 🎉</h2>

        <p>Hello ${user.name}</p>

        <p>Your order has been successfully placed.</p>

        <p><b>Order ID:</b> ${order._id}</p>
        <p><b>Total Amount:</b> ₹${calculatedTotal}</p>

        <p>We will notify you when the order status changes.</p>

        <p>Thank you for shopping with Bhairvee Creations.</p>
        `
      );

      console.log("Customer order confirmation email sent");

    } catch (err) {

      console.error("CUSTOMER EMAIL ERROR:", err);

    }


    res.status(201).json(order);

  } catch (error) {

    console.error(error);

    res.status(500).json({ message: "Server error" });

  }

};
// Get User Orders
exports.getMyOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.user.id }).sort({
    createdAt: -1,
  });

  res.json(orders);
};

// Admin: Get All Orders
exports.getAllOrders = async (req, res) => {
  const orders = await Order.find()
    .populate("userId", "name email")
    .sort({ createdAt: -1 });

  res.json(orders);
};

exports.updateOrderStatus = async (req, res) => {

  try {

    const { status } = req.body;

    const order = await Order
      .findById(req.params.id)
      .populate("userId");

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    if (
      status === "ready-for-shipping" &&
      order.paymentStatus === "advance-paid"
    ) {

      try {

        const razorpayOrder = await razorpay.orders.create({
          amount: order.remainingAmount * 100,
          currency: "INR",
          receipt: `rem_${Date.now()}`
        });

        order.remainingRazorpayOrderId = razorpayOrder.id;

        const paymentLink =
          `${process.env.FRONTEND_URL}/pay-remaining/${order._id}`;

        order.remainingPaymentLink = paymentLink;

        try {

          await sendEmail(
            order.userId.email,
            "Your Order Is Ready - Remaining Payment Required",
            `
            <h2>Your Order Is Ready 🎉</h2>

            <p>Hello ${order.userId.name}</p>

            <p>Your product is ready for shipping.</p>

            <p><b>Remaining Amount:</b> ₹${order.remainingAmount}</p>

            <a href="${paymentLink}">
            Pay Remaining Amount
            </a>
            `
          );

        } catch (emailError) {

          console.error("EMAIL ERROR:", emailError);

        }

      } catch (razorpayError) {

        console.error("RAZORPAY ERROR:", razorpayError);

      }

    }

    order.orderStatus = status;

    await order.save();

    /* EMAIL STATUS UPDATE */

    try {

      await sendEmail(
        order.userId.email,
        "Order Status Updated - Bhairvee Creations",
        `
        <h2>Your Order Status Updated</h2>

        <p>Hello ${order.userId.name}</p>

        <p><b>Order ID:</b> ${order._id}</p>
        <p><b>New Status:</b> ${status}</p>

        <p>Thank you for shopping with Bhairvee Creations.</p>
        `
      );

      console.log("Customer status email sent");

    } catch (err) {

      console.error("STATUS EMAIL ERROR:", err);

    }

    res.json({
      success: true,
      order
    });

  } catch (error) {

    console.error("UPDATE STATUS ERROR:", error);

    res.status(500).json({
      message: "Server error"
    });

  }

};
// Get User Orders
exports.getMyOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.user.id }).sort({
    createdAt: -1,
  });

  res.json(orders);
};

// Admin: Get All Orders
exports.getAllOrders = async (req, res) => {
  const orders = await Order.find()
    .populate("userId", "name email")
    .sort({ createdAt: -1 });

  res.json(orders);
};


exports.requestRemainingPayment = async (req, res) => {

  try {

    const order = await Order
      .findById(req.params.id)
      .populate("userId");

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    if (!order.remainingPaymentLink) {
      return res.status(400).json({
        message: "Payment link not generated yet"
      });
    }

    await sendEmail(
      order.userId.email,
      "Remaining Payment Required - Bhairvee Creations",
      `
      <h2>Your Order Is Ready</h2>

      <p>Hello ${order.userId.name}</p>

      <p>Please complete remaining payment.</p>

      <p><b>Remaining Amount:</b> ₹${order.remainingAmount}</p>

      <a href="${order.remainingPaymentLink}"
      style="background:black;color:white;padding:10px 20px;text-decoration:none;border-radius:5px;">
      Pay Remaining Amount
      </a>
      `
    );

    res.json({
      success: true,
      message: "Payment request sent"
    });

  } catch (error) {

    console.error("REQUEST PAYMENT ERROR:", error);

    res.status(500).json({
      message: "Failed to send payment request"
    });

  }

};

exports.getOrderById = async (req, res) => {

  try {

    const order = await Order
      .findById(req.params.id)
      .populate("userId", "name email");

      console.log(req.params.id);
      

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    res.json(order);

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }

};