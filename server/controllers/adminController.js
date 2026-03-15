const Order = require("../models/Order");
const CustomOrder = require("../models/CustomOrder");
const User = require("../models/User");

exports.getDashboardStats = async (req, res) => {
  try {

    /* TOTAL ORDERS */

    const totalOrders = await Order.countDocuments();


    /* TOTAL REVENUE */

    const totalRevenueData = await Order.aggregate([
      { $match: { paymentStatus: { $ne: "failed" } } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    const totalRevenue = totalRevenueData[0]?.total || 0;


    /* PENDING ORDERS */

    const pendingOrders = await Order.countDocuments({
      orderStatus: "processing",
    });


    /* CUSTOM ORDERS */

    const customOrders = await CustomOrder.countDocuments();


    /* MONTHLY REVENUE */

    const monthlyRevenue = await Order.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          revenue: { $sum: "$totalAmount" },
          orders: { $sum: 1 },
        },
      },
      { $sort: { "_id": 1 } },
    ]);


    /* REVENUE GROWTH % */

    let revenueGrowth = 0;

    if (monthlyRevenue.length >= 2) {

      const lastMonth = monthlyRevenue[monthlyRevenue.length - 1].revenue;
      const prevMonth = monthlyRevenue[monthlyRevenue.length - 2].revenue;

      if (prevMonth > 0) {
        revenueGrowth = Math.round(
          ((lastMonth - prevMonth) / prevMonth) * 100
        );
      }

    }


    /* ORDER STATUS ANALYTICS */

    const orderStatusStats = await Order.aggregate([
      {
        $group: {
          _id: "$orderStatus",
          count: { $sum: 1 },
        },
      },
    ]);


    /* TOP SELLING PRODUCTS */

    const topProducts = await Order.aggregate([

      { $unwind: "$items" },

      {
        $group: {
          _id: "$items.productId",
          title: { $first: "$items.title" },
          totalSold: { $sum: "$items.quantity" },
          revenue: {
            $sum: {
              $multiply: ["$items.price", "$items.quantity"],
            },
          },
        },
      },

      { $sort: { totalSold: -1 } },

      { $limit: 5 },

    ]);


    /* RECENT ORDERS */

    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5);


    /* RECENT CUSTOM ORDERS */

    const recentCustomOrders = await CustomOrder.find()
      .sort({ createdAt: -1 })
      .limit(5);


    res.json({
      totalOrders,
      totalRevenue,
      pendingOrders,
      customOrders,
      revenueGrowth,

      monthlyRevenue,
      orderStatusStats,
      topProducts,

      recentOrders,
      recentCustomOrders,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error",
    });

  }
};