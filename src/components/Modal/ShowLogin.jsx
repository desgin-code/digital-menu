import { use } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/features/login/loginUserSlice";

export default function ShowLogin({
  setShowLogin,
  setIsLoggedIn,
  purpose = "checkout",
}) {
  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGetOtp = () => {
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      setErrorMsg("Please enter a valid  10 digits phone number");
    } else {
      setStep("otp");
      setErrorMsg(null);
    }
  };

  const handleVerifyOtp = () => {
    if (otp === "1234") {
      setErrorMsg(null);
      setIsLoggedIn(true);
      setShowLogin(false);
      dispatch(loginUser({ phone }));

      if (purpose === "login") {
        window.location.reload();
      } else {
        navigate("/ordersummary");
      }
    } else {
      setErrorMsg("Invalid OTP");
    }
  };
  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 flex items-end justify-center z-50"
        onClick={() => setShowLogin(false)}
      >
        <div
          className="bg-white w-full md:max-w-[92%] h-[50vh] rounded-t-3xl p-6 shadow-lg animate-slide-up relative"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-1.5 bg-gray-300 rounded-full"></div>

          {step === "phone" && (
            <>
              <h3 className="text-2xl font-bold mb-6 text-[#5c471c] text-center">
                Login to Continue
              </h3>
              {errorMsg && (
                <p className="text-red-900 font-bold text-center">{errorMsg}</p>
              )}
              <p className="text-gray-500 text-center mb-6">
                Enter your mobile number to receive an OTP
              </p>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="📱 Enter phone number"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-[#e68900]"
              />
              <button
                onClick={() => handleGetOtp()}
                className="w-full bg-[#e68900] text-white py-3 rounded-xl font-semibold text-lg hover:bg-[#cc7700] transition"
              >
                Get OTP
              </button>
            </>
          )}

          {step === "otp" && (
            <>
              <h3 className="text-2xl font-bold mb-6 text-[#5c471c] text-center">
                Verify OTP
              </h3>
              {errorMsg && (
                <p className="text-red-900 font-bold text-center">{errorMsg}</p>
              )}
              <p className="text-gray-500 text-center mb-6">
                Enter the 4-digit OTP sent to{" "}
                <span className="font-semibold">{phone}</span>
              </p>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="🔑 Enter 4-digit OTP"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 mb-6 text-center tracking-widest text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-[#e68900]"
              />
              <button
                onClick={handleVerifyOtp}
                className="w-full bg-[#e68900] text-white py-3 rounded-xl font-semibold text-lg hover:bg-[#cc7700] transition"
              >
                Verify & Continue
              </button>
            </>
          )}

          <button
            onClick={() => setShowLogin(false)}
            className="w-full mt-6 text-gray-500 hover:text-red-600 text-center"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
