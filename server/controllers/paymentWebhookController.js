const crypto = require("crypto");
const Order = require("../models/Order");

exports.paymentWebhook = async (req, res) => {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    const signature = req.headers["x-razorpay-signature"];

    // ✅ VERY IMPORTANT: use RAW body buffer
    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(req.body) // raw buffer
      .digest("hex");

    if (expectedSignature !== signature) {
      return res.status(400).json({
        message: "Invalid webhook signature",
      });
    }

    const event = JSON.parse(req.body.toString());

    /* ===============================
       PAYMENT CAPTURED
    =============================== */
    if (event.event === "payment.captured") {
      const payment = event.payload.payment.entity;

      const order = await Order.findOne({
        razorpayOrderId: payment.order_id,
      });

      if (!order) {
        console.log("Order not found for payment");
        return res.json({ status: "ignored" });
      }

      // ✅ Don't overwrite if already paid
      if (order.paymentStatus !== "fully-paid") {
        order.paymentStatus = "advance-paid";
        order.razorpayPaymentId = payment.id;
        await order.save();
      }

      console.log("Advance payment confirmed");
    }

    /* ===============================
       OPTIONAL: PAYMENT FAILED
    =============================== */
    if (event.event === "payment.failed") {
      console.log("Payment failed:", event.payload.payment.entity.id);
    }

    res.json({ status: "ok" });

  } catch (error) {
    console.error("Webhook error:", error);

    res.status(500).json({
      message: "Webhook failed",
    });
  }
};