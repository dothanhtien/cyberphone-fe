import { Category } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CategoriesState {
  currentCategory: Category | null;
}

const initialState: CategoriesState = {
  currentCategory: null,
};

const categoriesSlice = createSlice({
  name: "caregories",
  initialState,
  reducers: {
    setCurrentCategory: (state, action: PayloadAction<Category>) => {
      state.currentCategory = action.payload;
    },
    clearCurrentCategory: (state) => {
      state.currentCategory = null;
    },
  },
});

export const { setCurrentCategory, clearCurrentCategory } =
  categoriesSlice.actions;

export default categoriesSlice.reducer;
