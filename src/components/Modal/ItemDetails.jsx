export default function ItemDetails({
  item,
  onClose,
  handleAddToCart,
  items,
  handleDecrease,
}) {
  const cartItem = items.find((i) => i.id === item.id);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-t-2xl shadow-lg w-full p-6 relative max-h-[90vh] overflow-y-auto transition-transform transform animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-2xl"
        >
          ×
        </button>

        {/* Content */}
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <img
            src={item.img}
            alt={item.title}
            className="w-40 h-40 object-cover rounded-lg"
          />

          <div className="flex flex-1 items-start">
            <div>
              <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
              <p className="text-gray-600 mb-4">{item.desc}</p>
              <p className="text-[#e68900] text-xl font-bold">₹ {item.price}</p>
              {item.oldPrice && (
                <p className="text-gray-400 text-sm line-through">
                 ₹ {item.oldPrice}
                </p>
              )}
            </div>

            <div className="flex items-center ms-20 gap-2">
              <span className="bg-[#5c471c] text-white text-xs px-2 py-1 rounded">
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
        </div>
      </div>
    </div>
  );
}
