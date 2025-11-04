import { useState, useEffect } from "react";
import Header from "../../layouts/Header/Header";
import Layout from "../../layouts/Layout";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bookOrder } from "../../redux/features/order/bookOrderSlice";
import { clearCart } from "../../redux/features/cart/cartFoodSlice";
import CurrencySymbol from "../../components/Currency/CurrencySymbol";

export default function Payment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const { phone } = useSelector((state) => state.login.user);
  const [selectedMethod, setSelectedMethod] = useState("");
 
  const hotel = useSelector((state) => state.hotel.hotel);
  
    const hotel_id = hotel?.id || null;

  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );
  const tax = (subTotal * 0.05).toFixed(2);
  const total = (subTotal + Number(tax)).toFixed(2);

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart");
    }
  }, []);

 const handleOnlinePayment = async () => {
  if (!selectedMethod) {
    alert("Please select a payment method!");
    return;
  }

  const orderData = {
    hotel_id : hotel_id,
    user: phone,
    items: cartItems,
    subtotal: subTotal,
    tax: tax,
    total: total,
    payment: "paid",
    paymentMethod: selectedMethod,
    paymentId: "DUMMY12345" 
  };

  try {
    const response = await fetch(
      "https://testing-demo.com/jaichand/digital-menu/api/hotel/book-order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
      }
    );

    const data = await response.json();

    if (data.status) {
    
      alert(`Payment of  ${total} done via ${selectedMethod}!`);
      dispatch(clearCart());
      navigate("/ordersconfirmation");
    } else {
      console.error("Failed to place order:", data.message);
      alert("Failed to place order. Please try again!");
    }
  } catch (error) {
    console.error("API Error:", error);
    alert("Something went wrong while placing the order!");
  }
};


  const handleCancel = () => {
    navigate(-1);
  };
  return (
    <Layout>
      <Header />
      <section className="">
        <div className="max-w-md md:max-w-2xl mx-auto px-4 space-y-8">
          <h2 className="text-3xl font-bold text-[#5c471c] text-center">
            Complete Your Payment
          </h2>

          <div className="bg-white shadow-lg rounded-3xl p-6 space-y-6">
            {/* Order Summary */}
            <h3 className="text-xl font-semibold text-gray-800">
              Order Summary
            </h3>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-2xl shadow-inner"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-700">{item.title}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity || 1}
                      </p>
                    </div>
                  </div>
                  <div className="font-semibold text-[#e68900]">
                    <CurrencySymbol/>{(item.price * (item.quantity || 1)).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Payment Summary */}
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between text-gray-600 font-medium">
                <span>Subtotal</span>
                <span><CurrencySymbol/>{subTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 font-medium">
                <span>Tax (5%)</span>
                <span><CurrencySymbol/> {tax}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-[#5c471c]">
                <span>Total</span>
                <span> <CurrencySymbol/> {total}</span>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="space-y-3 mt-4">
              <h4 className="font-semibold text-gray-700">Payment Methods</h4>
              <div className="flex gap-3">
                {["UPI", "Card", "Wallet"].map((method) => (
                  <button
                    key={method}
                    onClick={() => setSelectedMethod(method)}
                    className={`flex-1 py-2 rounded-xl border transition font-medium ${
                      selectedMethod === method
                        ? "border-[#e68900] bg-[#fff3e0]"
                        : "border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <button
                onClick={handleOnlinePayment}
                className="flex-1 py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-[#e68900] to-[#f2b100] shadow-lg hover:from-[#cc7700] hover:to-[#e6a100] transition-all"
              >
                Pay Now
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 py-4 rounded-2xl font-semibold text-gray-800 bg-gray-300 hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
