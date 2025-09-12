import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "../pages/NotFound";
import IndexPage from "../pages/Home/IndexPage";
import ViewCart from "../pages/Cart/ViewCart";
import OrderSummary from "../pages/Summary/OrderSummary";
import Order from "../pages/Order/MyOrders";
import OrderConfirmation from "../pages/Order/OrderConfirmation";
import Profile from "../pages/Profile/Profile";
import OrderDetails from "../pages/Order/OrderDetails";

function AppRouter() {
  return (
    <Router >
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/cart" element={<ViewCart />} />
        <Route path="/ordersummary" element={<OrderSummary />} />
        <Route path="/ordersconfirmation" element={<OrderConfirmation />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/orders/:orderId" element={<OrderDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
