const CustomOrder = require("../models/CustomOrder");

// create request
exports.createCustomOrder = async (req, res) => {
  try {

    const order = await CustomOrder.create({
      ...req.body,
      userId: req.user.id
    });

    res.status(201).json(order);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error"
    });
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