import { createSlice } from "@reduxjs/toolkit";
import { categories } from "../../../data/food";

const initialState = {
  filterFoods: null,
};

export const searchFoodSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchForFood: (state, action) => {
      const query = action.payload.toLowerCase().trim();

      if (!query) {
        state.filterFoods = null;
        return;
      }

      const allFoods = categories.flatMap((category) =>
        category.items.map((food) => ({
          ...food,
          category: category.name,
        }))
      );

      const results = allFoods.filter(
        (food) =>
          food.title.toLowerCase().includes(query) ||
          food.category.toLowerCase().includes(query)
      );

      state.filterFoods = results.length > 0 ? results : [];
    },
  },
});

export const { searchForFood } = searchFoodSlice.actions;

export default searchFoodSlice.reducer;
