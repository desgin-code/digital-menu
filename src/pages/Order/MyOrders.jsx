import React from "react";
import Header from "../../layouts/Header/Header";
import Layout from "../../layouts/Layout";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cancelOrder } from "../../redux/features/order/bookOrderSlice";

const dummyOrdes = [
  {
    id: "ORD12345",
    date: "2025/09/11 10:30 AM",
    items: ["Pizza", "Burger", "Coke"],
    total: 450,
    status: "Delivered",
  },
  {
    id: "ORD12347",
    date: "2025/09/08 7:00 PM",
    items: ["Noodles", "Spring Roll"],
    total: 280,
    status: "Cancelled",
  },
];

export default function MyOrders() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const phone = useSelector((state) => state.login.user?.phone || "");

  const allOrders = useSelector((state) =>
    state.orders.orders
      .filter((order) => order.user === phone)
      .sort((a, b) => new Date(b.orderTime) - new Date(a.orderTime))
  );

  const handleCancelOrder = (orderId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?"
    );
    if (confirmCancel) {
      dispatch(cancelOrder(orderId));
    }
  };

  return (
    <Layout>
      <Header />
      <section>
        <div className="mx-auto max-w-[92%] md:max-w-7xl">
          <h2 className="text-3xl font-bold text-[#5c471c] mb-6">
            Your Orders
          </h2>

          <div className="space-y-6">
            {allOrders.map((order) => (
              <div
                key={order.id}
                className="rounded-2xl shadow-md p-6 bg-white hover:shadow-lg transition-all"
              >
                {/* Top row */}
                <div className="flex  flex-row justify-between md:items-center gap-3">
                  <div>
                    <p className="text-sm text-gray-500">
                      Order ID: <span className="font-medium">{order.id}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Date:{" "}
                      <span className="font-medium">
                        {new Date(order.orderTime).toLocaleString("en-IN", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </span>
                    </p>
                  </div>
                  <span
                    className={`px-6 py-2 rounded-full  text-xs font-semibold ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-600"
                        : order.status === "Processing"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Items */}
                <div className="mt-4">
                  <p className="text-gray-700 text-sm">
                    <p>
                      <span className=" font-semibold">Items:</span>{" "}
                      {order.items.map((item) => item.title).join(", ")}
                    </p>
                  </p>
                  <p className="text-lg font-semibold mt-2 text-[#5c471c]">
                    ₹ {order.total}
                  </p>
                </div>

                <div className="mt-4 flex gap-3">
                  <button
                    className="px-4 py-2 text-sm rounded-lg bg-[#5c471c] text-white hover:bg-[#463616] transition"
                    onClick={() =>
                      navigate(`/orders/${order.id}`, { state: { order } })
                    }
                  >
                    View Details
                  </button>

                  {order.status === "Processing" ? (
                    <button
                      className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                      onClick={() => handleCancelOrder(order.id)}
                    >
                      Cancel Order
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            ))}

            {dummyOrdes.map((order) => (
              <div
                key={order.id}
                className="rounded-2xl shadow-md p-6 bg-white hover:shadow-lg transition-all"
              >
                {/* Top row */}
                <div className="flex  flex-row justify-between md:items-center gap-3">
                  <div>
                    <p className="text-sm text-gray-500">
                      Order ID: <span className="font-medium">{order.id}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Date: <span className="font-medium">{order.date}</span>
                    </p>
                  </div>
                  <span
                    className={`px-6 py-2 rounded-full  text-xs font-semibold ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-600"
                        : order.status === "Processing"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Items */}
                <div className="mt-4">
                  <p className="text-gray-700 text-sm">
                    <span className="font-medium">Items:</span>{" "}
                    {order.items.join(", ")}
                  </p>
                  <p className="text-lg font-semibold mt-2 text-[#5c471c]">
                    ₹ {order.total}
                  </p>
                </div>

                {/* Actions */}
                <div className="mt-4 flex gap-3">
                  <button
                    className="px-4 py-2 text-sm rounded-lg bg-[#5c471c] text-white hover:bg-[#463616] transition"
                    onClick={() => alert(` Order Details: ${order.id}`)}
                  >
                    View Details
                  </button>
                  {order.status == "Processing" && (
                    <button className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 transition">
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
