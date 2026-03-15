const crypto = require("crypto");
const Order = require("../models/Order");

exports.paymentWebhook = async (req, res) => {

  try {

    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    const shasum = crypto.createHmac("sha256", webhookSecret);

    shasum.update(req.body);

    const digest = shasum.digest("hex");

    const signature = req.headers["x-razorpay-signature"];

    if (digest !== signature) {

      return res.status(400).json({
        message: "Invalid webhook signature"
      });

    }

    const event = JSON.parse(req.body);

    /* PAYMENT SUCCESS */

    if (event.event === "payment.captured") {

      const payment = event.payload.payment.entity;

      const order = await Order.findOne({
        razorpayOrderId: payment.order_id
      });

      if (!order) {

        console.log("Order not found for payment");

        return res.json({ status: "ignored" });

      }

      order.paymentStatus = "advance-paid";

      order.razorpayPaymentId = payment.id;

      await order.save();

      console.log("Order payment confirmed");

    }

    res.json({ status: "ok" });

  } catch (error) {

    console.error("Webhook error:", error);

    res.status(500).json({
      message: "Webhook failed"
    });

  }

};