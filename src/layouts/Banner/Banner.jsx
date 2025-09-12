import React from "react";

export default function Banner() {
  return (
    <section className="relative h-[30vh]  flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092')] bg-cover bg-center rounded-b-3xl shadow-lg overflow-hidden">
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Welcome To <span className="text-[#e68900]">BON HOTEL</span>
        </h2>
        <p className="text-lg text-gray-200 mb-6 max-w-md mx-auto">
          Discover delicious flavors, fresh dishes, and unforgettable dining
          experiences.
        </p>
      </div>
    </section>
  );
}
