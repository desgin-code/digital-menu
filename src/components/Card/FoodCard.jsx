import React from "react";
import { useState } from "react";
import {
  addToCart,
  decreaseItem,
} from "../../redux/features/cart/cartFoodSlice";
import { useDispatch, useSelector } from "react-redux";
import ItemDetails from "../../components/Modal/ItemDetails";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function FoodCard({ cat }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [cartMessage, setCartMessage] = useState(null);
  const totalItems = useSelector((state) => state.cart.totalItems);
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    setCartMessage(`${totalItems + 1} items added to cart!`);
    setTimeout(() => setCartMessage(null), 3000);
  };

  const handleDecrease = (item) => {
    dispatch(decreaseItem(item));
    setCartMessage(`${totalItems - 1} items  in cart!`);
  };
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cat.items.map((item) => {
          const cartItem = items.find((i) => i.id === item.id);

          return (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="flex flex-row  bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden cursor-pointer"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-32 object-cover"
              />

              <div className="flex flex-col p-4 flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                </div>

                <p className="text-sm text-gray-600 line-clamp-2">
                  {item.desc}
                </p>

                <div className="mt-auto">
                  <p className="text-[#e68900] font-bold">₹ {item.price}</p>
                  {item.oldPrice && (
                    <p className="text-gray-400 text-sm line-through">
                      ₹ {item.oldPrice}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex md:flex-row flex-col">
                <span className="bg-[#5c471c] h-6 text-white text-xs px-2 py-1 rounded m-3">
                  {item.discount}
                </span>

                {cartItem ? (
                  <div className="flex items-center border-2 border-[#e68900] h-8 m-2 rounded-[15px] px-2 ">
                    <button
                      className="text-[red] text-[18px] font-bold hover:text-red-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDecrease(item);
                      }}
                    >
                      -
                    </button>

                    <span className="mx-3 font-semibold">
                      {cartItem.quantity}
                    </span>

                    <button
                      className="text-[#e68900] text-[18px] font-bold hover:text-yellow-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(item);
                      }}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    className="bg-[#e68900] text-white w-10 h-10 flex items-center justify-center m-2 rounded-lg text-lg hover:bg-[#cc7700] transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(item);
                    }}
                  >
                    +
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {cartMessage && (
        <div className="fixed bottom-20 inset-x-0 mx-auto bg-[#e68900] text-white w-[70%] max-w-md text-center px-4 py-2 rounded-xl shadow-lg animate-bounce">
          <div className="flex gap-2 justify-center">
            <div className="bg-[#5c471c] rounded-full p-2">
              <FaShoppingCart size={20} />
            </div>
            <span>{cartMessage}</span>
          </div>
          <Link
            to="/cart"
            className="ml-2 underline font-semibold hover:text-yellow-300"
          >
            View Cart
          </Link>
        </div>
      )}

      {selectedItem && (
        <ItemDetails
          items={items}
          item={selectedItem}
          handleAddToCart={handleAddToCart}
          handleDecrease={handleDecrease}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </>
  );
}
