const CustomOrder = require("../models/CustomOrder");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

exports.createCustomOrder = async (req, res) => {


  try {

    const order = await CustomOrder.create({
      ...req.body,
      userId: req.user.id
    });

    // 👇 DEBUG USER
    const user = await User.findById(req.user.id);
    console.log("👤 USER:", user);

    const html = `
       <div style="font-family: 'Segoe UI', sans-serif; background:#f8f6f2; padding:30px;">

  <div style="max-width:600px; margin:auto; background:white; border-radius:16px; padding:25px; box-shadow:0 10px 30px rgba(0,0,0,0.08);">

    <!-- Header -->
    <h2 style="color:#2B1B14; text-align:center; margin-bottom:5px;">
      ✨ New Custom Order Received
    </h2>

    <p style="text-align:center; color:#8a7a65; font-size:14px;">
      A new sacred creation request has arrived 🌿
    </p>

    <hr style="margin:20px 0; border:none; border-top:1px solid #eee;" />

    <!-- Customer Info -->
    <h3 style="color:#D4AF37; margin-bottom:10px;">👤 Customer Details</h3>

    <p><strong>Name:</strong> ${user?.name}</p>
    <p><strong>Email:</strong> ${user?.email}</p>
    <p><strong>Phone:</strong> ${order.phone}</p>

    <hr style="margin:20px 0; border:none; border-top:1px solid #eee;" />

    <!-- Order Details -->
    <h3 style="color:#D4AF37; margin-bottom:10px;">🎨 Order Details</h3>

    <p><strong>Product Type:</strong> ${order.productType}</p>
    <p><strong>Dimensions:</strong> ${order.dimensions}</p>
    <p><strong>Color Preference:</strong> ${order.colorPreference}</p>
    <p><strong>Budget:</strong> ₹${order.budget}</p>

    <p><strong>Message:</strong></p>
    <p style="background:#f9f7f3; padding:10px; border-radius:10px;">
      ${order.message}
    </p>

    <hr style="margin:25px 0; border:none; border-top:1px solid #eee;" />

    <!-- Quote -->
    <div style="text-align:center; padding:10px 15px; background:#fff8e1; border-radius:12px;">
      <p style="font-style:italic; color:#6b5c4c;">
        ✨ "Every handcrafted creation begins with a story — and this one just found its artist."
      </p>
    </div>

    <!-- Footer -->
    <p style="margin-top:25px; font-size:12px; color:#aaa; text-align:center;">
      Bhairvee Creations • Crafted with devotion 💛
    </p>

  </div>

</div>
    `;


    await sendEmail(
      process.env.ADMIN_EMAIL,
      "Custom Order",
      html
    );



    res.status(201).json(order);

  } catch (error) {
    console.error("❌ ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
// admin get all
exports.getCustomOrders = async (req, res) => {
  try {

    const orders = await CustomOrder.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};


// admin update status
exports.updateCustomOrderStatus = async (req, res) => {
  try {

    const { status } = req.body;

    const order = await CustomOrder.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Custom order not found"
      });
    }

    order.status = status;

    await order.save();

    res.json(order);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};
// for user get my orders
exports.getMyCustomOrders = async (req, res) => {
  try {

    const orders = await CustomOrder.find({
      userId: req.user.id
    }).sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error"
    });

  }
};