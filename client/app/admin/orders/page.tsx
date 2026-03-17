return (

  <div className="max-w-md mx-auto px-3 pt-3 pb-28">

    {/* Header */}
    <div className="flex items-center justify-between mb-3">
      <h1 className="text-lg font-semibold">Orders</h1>
      <span className="text-xs text-gray-400">
        {orders.length} orders
      </span>
    </div>

    {/* Filters */}
    <div className="flex gap-2 overflow-x-auto pb-2 mb-3">

      {[
        "all",
        "processing",
        "ready-for-shipping",
        "delivered",
        "cancelled"
      ].map((status) => (

        <button
          key={status}
          onClick={() => setFilter(status)}
          className={`px-3 py-1 rounded-full text-xs whitespace-nowrap transition shrink-0
            ${
              filter === status
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-600"
            }`}
        >
          {status.replaceAll("-", " ")}
        </button>

      ))}

    </div>

    {/* Orders */}
    <div className="space-y-3">

      {filteredOrders.length === 0 && (
        <div className="text-center text-gray-400 py-10 text-sm">
          No orders found
        </div>
      )}

      {filteredOrders.map((order) => (

        <div
          key={order._id}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3"
        >

          {/* Top */}
          <div className="flex justify-between items-center mb-2">

            <p className="text-[10px] text-gray-400 truncate max-w-[65%]">
              {order._id}
            </p>

            <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 capitalize">
              {order.orderStatus}
            </span>

          </div>

          {/* Info */}
          <div className="grid grid-cols-2 gap-y-2 text-sm mb-2">

            <div>
              <p className="text-gray-400 text-xs">Total</p>
              <p className="font-semibold">₹{order.totalAmount}</p>
            </div>

            <div>
              <p className="text-gray-400 text-xs">Payment</p>
              <p className="capitalize text-xs">{order.paymentStatus}</p>
            </div>

            <div>
              <p className="text-gray-400 text-xs">Advance</p>
              <p className="text-xs">₹{order.advanceAmount}</p>
            </div>

            <div>
              <p className="text-gray-400 text-xs">Remaining</p>
              <p className="text-xs">₹{order.remainingAmount}</p>
            </div>

          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2 mt-2">

            <select
              value={order.orderStatus}
              onChange={(e) =>
                updateStatus(order._id, e.target.value)
              }
              className="w-full border rounded-lg px-3 py-2 text-xs bg-gray-50"
            >
              <option value="processing">Processing</option>
              <option value="ready-for-shipping">Ready</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>

            {order.orderStatus === "ready-for-shipping" &&
             order.paymentStatus === "advance-paid" && (

              <button
                onClick={() =>
                  requestRemainingPayment(order._id)
                }
                className="w-full bg-orange-500 active:scale-[0.98] transition text-white py-2 rounded-lg text-xs font-medium"
              >
                Request Payment
              </button>

            )}

          </div>

        </div>

      ))}

    </div>

  </div>
);