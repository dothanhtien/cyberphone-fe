import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/interfaces";

interface ProductsState {
  currentProduct: Product | null;
}

const initialState: ProductsState = {
  currentProduct: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCurrentProduct: (state, action: PayloadAction<Product>) => {
      state.currentProduct = action.payload;
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
  },
});

export const { setCurrentProduct, clearCurrentProduct } = productsSlice.actions;

export default productsSlice.reducer;
