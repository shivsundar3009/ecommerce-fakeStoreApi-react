import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "../features/cartSlice";

import productReducer from "../features/productsSlice";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        products: productReducer, // Add your other reducers here.
    },
})

