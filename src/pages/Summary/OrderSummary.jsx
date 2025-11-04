import React from "react";
import Header from "../../layouts/Header/Header";
import Layout from "../../layouts/Layout";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bookOrder } from "../../redux/features/order/bookOrderSlice";
import { clearCart } from "../../redux/features/cart/cartFoodSlice";
import CurrencySymbol from "../../components/Currency/CurrencySymbol";

export default function OrderSummary() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const { phone } = useSelector((state) => state.login.user);
  const hotel = useSelector((state) => state.hotel.hotel);

  const hotel_id = hotel?.id || null;

  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );
  const tax = (subTotal * 0.05).toFixed(2);
  const total = (subTotal + Number(tax)).toFixed(2);

  const handlePayNow = async () => {
    navigate("/payment");
  };

  const handlePayLater = async () => {
    const orderData = {
      hotel_id: hotel_id,
      user: phone,
      items: cartItems,
      subtotal: subTotal,
      tax: tax,
      total: total,
      payment: "pending",
      paymentMethod: "pay Later",
    };

    try {
      const response = await fetch(
        "https://testing-demo.com/jaichand/digital-menu/api/hotel/book-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      const data = await response.json();

      if (data.status) {
        console.log("Order placed:", data.data);
        dispatch(clearCart());
        navigate("/ordersconfirmation");
      } else {
        console.error("Failed to place order:", data.error);
        alert("Failed to place order. Please try again!");
      }
    } catch (error) {
      console.error("API Error:", error);
      alert("Something went wrong while placing the order!");
    }
  };

  return (
    <Layout>
      <Header />
      <section className="">
        <div className="mx-auto space-y-10 max-w-[92%] md:max-w-7xl">
          <h2 className="text-2xl font-bold text-[#5c471c] ">Order Summary</h2>

          {cartItems.length > 0 ? (
            <>
              <div className="space-y-8 mb-5">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex  md:flex-row items-center justify-between bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition"
                  >
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-24 h-24 rounded-xl object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">
                          Price: <CurrencySymbol/>{item.price} × {item.quantity || 1}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:mt-0 text-right">
                      <p className="text-[#e68900] font-bold text-lg">
                        <CurrencySymbol/>{(item.price * (item.quantity || 1)).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className=" bg-white shadow-t-lg p-4 md:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-gray-200 z-50">
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <div className="flex justify-between w-full sm:w-auto">
                    <span className="font-medium text-gray-700">Subtotal:</span>
                    <span className="font-semibold text-gray-800">
                      <CurrencySymbol/>{subTotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between w-full sm:w-auto">
                    <span className="font-medium text-gray-700 ">
                      Tax (5%):
                    </span>
                    <span className="font-semibold text-gray-800 "><CurrencySymbol/> {tax}</span>
                  </div>
                  <div className="flex justify-between w-full sm:w-auto">
                    <span className="font-medium text-gray-700">Total:</span>
                    <span className="font-bold text-[#5c471c] text-lg">
                      <CurrencySymbol/> {total}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mt-3 sm:mt-0">
                  <button
                    onClick={handlePayLater}
                    className="w-full sm:w-auto bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-6 rounded-2xl transition"
                  >
                    Pay Later
                  </button>
                  <button
                    onClick={handlePayNow}
                    className="w-full sm:w-auto bg-gradient-to-r from-[#e68900] to-[#f2b100] hover:from-[#cc7700] hover:to-[#e6a100] text-white font-semibold py-3 px-6 rounded-2xl transition shadow-lg"
                  >
                    Pay Now
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-32">
              <p className="text-gray-600 text-lg mb-4">Your cart is empty</p>
              <button
                onClick={() => navigate("/menu")}
                className="px-6 py-3 bg-[#e68900] text-white rounded-2xl font-semibold hover:bg-[#cc7700] transition"
              >
                Add Items
              </button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
