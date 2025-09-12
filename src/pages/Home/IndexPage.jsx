import { useState } from "react";
import { categories } from "../../data/food";
import Layout from "../../layouts/Layout";
import CategorySlider from "../../components/Slider/CategorySlider";
import { useSelector, useDispatch } from "react-redux";
import Banner from "../../layouts/Banner/Banner";
import Header from "../../layouts/Header/Header";
import FoodCard from "../../components/Card/FoodCard";

export default function IndexPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const filterFoods = useSelector((state) => state.search.filterFoods);

  const filteredCategories =
    filterFoods === null
      ? selectedCategory === "All"
        ? categories
        : categories.filter(
            (cat) => cat.name.toLowerCase() === selectedCategory.toLowerCase()
          )
      : filterFoods.length > 0
      ? [
          {
            name: "Search Results",
            items: filterFoods,
          },
        ]
      : [
          {
            name: "Search Results",
            items: [],
          },
        ];

  return (
    <>
      <Layout>
        <Banner />
        <Header />
        <section className="food-category-section py-3">
          <div className="mx-auto space-y-10 max-w-[92%] md:max-w-7xl">
            <CategorySlider
              categories={categories}
              active={selectedCategory}
              setActive={setSelectedCategory}
            />
          </div>
        </section>

        <section className="py-4">
          <div className="mx-auto space-y-10 max-w-[92%] md:max-w-7xl">
            {filteredCategories.map((cat, i) => (
              <div key={i}>
                <h2 className="text-2xl font-bold mb-6 text-[#5c471c]">
                  {cat.name}
                </h2>

                {cat.items.length === 0 ? (
                  <p className=" text-gray-500 font-medium">No Results Found</p>
                ) : (
                  <FoodCard cat={cat} />
                )}
              </div>
            ))}
          </div>
        </section>
      </Layout>
    </>
  );
}
