import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CategorySlider({ categories, active, setActive }) {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    variableWidth: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4, slidesToScroll: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 400, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <>
      <div className="category-slider">
        <Slider {...settings}>
          <div className="">
            <button
              onClick={() => setActive("All")}
              className={`px-5 py-2 rounded-full border text-sm font-medium transition-all duration-300 whitespace-nowrap
              ${
                active === "All"
                  ? "bg-yellow-600 text-white border-yellow-600 shadow-md"
                  : "bg-white text-yellow-700 border-yellow-700 hover:bg-yellow-600 hover:text-white"
              }`}
            >
              All
            </button>
          </div>
          {categories.map((cat, index) => (
            <div key={index}>
              <button
                onClick={() => setActive(cat.name)}
                className={`px-5 py-2 rounded-full border text-sm font-medium transition-all duration-300 whitespace-nowrap
                ${
                  active === cat.name
                    ? "bg-yellow-600 text-white border-yellow-600 shadow-md"
                    : "bg-white text-yellow-700 border-yellow-700 hover:bg-yellow-600 hover:text-white"
                }`}
              >
                {cat.name}
              </button>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
