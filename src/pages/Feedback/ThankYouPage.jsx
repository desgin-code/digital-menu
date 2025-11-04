import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ThankYouPage() {
  const navigate = useNavigate();
  const [message, setMessage] = useState();

const hotel = useSelector((state) => state.hotel.hotel);

  const hotel_id = hotel?.id || null;

  const fetchFeedbackQuestion = async () => {
    const response = await fetch(
      `https://testing-demo.com/jaichand/digital-menu/api/hotel/feedback-thank-you-message/${hotel_id}`
    );
    const result = await response.json();

    const data = result.data;
    setMessage(data.message);
  };

  useEffect(() => {
    fetchFeedbackQuestion();
    const submitted = sessionStorage.getItem("feedbackSubmitted");
    if (!submitted) {
      navigate(`/${hotel.slug}`);
    }
  }, [navigate]);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-blue-50 px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-10 text-center max-w-xl">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Thank You!
        </h1>
        <p className="text-gray-700 mb-6">
          {message
            ? message
            : "Your feedback has been submitted successfully. We appreciate your time and thoughts!"}
        </p>

        <Link
          to={`/${hotel.slug}`}
          className="inline-block px-6 py-3 bg-gradient-to-r from-[#e68900] to-[#e68900] text-white font-bold rounded-xl shadow-lg hover:from-[#d17a00] hover:to-[#d17a00] transition-all duration-300"
        >
          Go to Home
        </Link>
      </div>
    </section>
  );
}

export default ThankYouPage;
