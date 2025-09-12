import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartFoodSlice";
import searchFoodReducer from "./features/search/searchFoodSlice";
import userLoginReducer from "./features/login/loginUserSlice";
import  bookOrderReducer  from "./features/order/bookOrderSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    search: searchFoodReducer,
    login: userLoginReducer,
    orders: bookOrderReducer,
  },
});
