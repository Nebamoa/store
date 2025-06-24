import { configureStore } from "@reduxjs/toolkit";
import filter from "./slices/filterSlice";
import product from "./slices/productSlice";
import cart from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    filter,
    product,
    cart,
  },
});

export type AppStore = typeof store;

export type RootState = ReturnType<AppStore["getState"]>;

export type AppDispatch = AppStore["dispatch"];
