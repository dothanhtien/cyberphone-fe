import { Brand } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BrandsState {
  currentBrand: Brand | null;
}

const initialState: BrandsState = {
  currentBrand: null,
};

const brandsSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {
    setCurrentBrand: (state, action: PayloadAction<Brand>) => {
      state.currentBrand = action.payload;
    },
    clearCurrentBrand: (state) => {
      state.currentBrand = null;
    },
  },
});

export const { setCurrentBrand, clearCurrentBrand } = brandsSlice.actions;

export default brandsSlice.reducer;
