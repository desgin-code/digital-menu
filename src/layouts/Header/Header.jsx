import { useState, useEffect } from "react";
import { FaBars, FaSignInAlt, FaArrowLeft, FaUser } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { categories } from "../../data/food";
import { useDispatch, useSelector } from "react-redux";
import { searchForFood } from "../../redux/features/search/searchFoodSlice";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const isLogin = useSelector((state) => state.login.islogin);

  useEffect(() => {
    if (isLogin) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isLogin]);

  const isAuthPage =
    location.pathname === "/cart" ||
    location.pathname === "/ordersummary" ||
    location.pathname === "/orders" ||
    location.pathname === "/ordersconfirmation" ||
     location.pathname === "/profile" ||
    location.pathname.startsWith("/orders/");

  const allItems = categories.flatMap((category) =>
    category.items.map((food) => food.title)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % allItems.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [allItems.length]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    dispatch(searchForFood(value));
  };

  return (
    <section className="section header-section">
      <header>
        <div className="nav-bar">
          {isAuthPage ? (
            <>
              <button
                className="back-btn flex items-center gap-2 text-lg font-semibold"
                onClick={() => navigate("/")}
              >
                <FaArrowLeft /> Back
              </button>
              <div className="auth">
                <button className="sign-in" title="Sign In">
                  {isLoggedIn ? (
                    <Link to="/profile">
                      <FaUser />
                    </Link>
                  ) : (
                    <FaSignInAlt />
                  )}
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="logo-toggle">
                <button className="toggle">
                  <FaBars />
                </button>
                <img
                  className="logo"
                  src="https://testing-demo.com/kuldeep/digital-menu/assets/image/logo.png"
                  alt="logo"
                />
              </div>
              <div className="relative w-full max-w-md">
                {!searchTerm && (
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    Search for{" "}
                    <span className="font-bold text-gray-600">
                      {allItems[index].length > 15
                        ? allItems[index].slice(0, 15) + ".."
                        : allItems[index]}
                    </span>
                  </div>
                )}

                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  className="border rounded-lg px-3 py-2 w-full text-black bg-transparent"
                />
              </div>
              <div className="auth">
                <button className="sign-in" title="Sign In">
                  {isLoggedIn ? (
                    <Link to="/profile">
                      <FaUser />
                    </Link>
                  ) : (
                    <FaSignInAlt />
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </header>
    </section>
  );
}
