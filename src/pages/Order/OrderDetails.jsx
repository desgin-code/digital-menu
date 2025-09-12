import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../layouts/Header/Header";
import Layout from "../../layouts/Layout";

export default function OrderDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  if (!order) {
    return (
      <Layout>
        <Header />
        <div className="flex items-center justify-center h-screen">
          <p className="text-gray-500 text-lg">No order selected.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Header />
      <div className="flex flex-col items-center bg-gray-50 min-h-screen p-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6 space-y-5">
          {/* Back Button */}
          <button
            className="text-sm text-[#5c471c] hover:underline mb-2"
            onClick={() => navigate(-1)}
          >
            &larr; Back to Orders
          </button>

          {/* Header */}
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
            Order Details
          </h2>

          {/* Order Info */}
          <div className="space-y-2 text-gray-700">
            <p>
              <span className="font-semibold">Order ID:</span> {order.id}
            </p>
            <p>
              <span className="font-semibold">Date:</span>{" "}
              {order.date || order.orderTime}
            </p>
            <p>
              <span className="font-semibold">Status:</span>{" "}
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  order.status === "Delivered"
                    ? "bg-green-100 text-green-600"
                    : order.status === "Processing"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {order.status}
              </span>
            </p>
          </div>

          {/* Items List */}
          <div className="mt-4">
            <p className="font-semibold mb-2 text-gray-800 text-lg">Items</p>
            <ul className="divide-y divide-gray-200 border rounded-lg overflow-hidden">
              {order.items.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center px-4 py-3 hover:bg-gray-50 transition"
                >
                  <span className="font-medium text-gray-700">
                    {item.title || item.name}
                  </span>
                  <span className="text-gray-600">
                    {item.quantity || 1} × ₹{item.price || 0} = ₹
                    {(item.quantity || 1) * (item.price || 0)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Totals Section */}
          <div className="mt-4 border-t pt-3 space-y-1 text-gray-700">
            <p className="flex justify-between">
              <span>Subtotal:</span> <span>₹ {order.subtotal || 0}</span>
            </p>
            <p className="flex justify-between">
              <span>Tax:</span> <span>₹ {order.tax || 0}</span>
            </p>
            <p className="flex justify-between font-semibold text-gray-800 text-lg">
              <span>Total:</span>{" "}
              <span>₹ {order.total ||0 }</span>
            </p>
          </div>

          {/* Print Button */}
          <button
            onClick={() => window.print()}
            className="mt-4 w-full bg-[#5c471c] text-white py-3 rounded-full hover:bg-[#463616] transition font-semibold shadow-lg"
          >
            Print
          </button>
        </div>
      </div>
    </Layout>
  );
}
