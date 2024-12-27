import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    try {
        const response = await axios.get('https://fakestoreapi.com/products');
        console.log("API Response:", response); // Debugging: Check API response
        return response.data; // Return only the data from the Axios response
    } catch (error) {
        console.error("API Error:", error); // Debugging: Log errors
        throw error; // Pass error to rejected case
    }
});

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        allProducts: [], // Stores fetched products
        status: 'idle',  // Tracks the request status
        error: null,     // Stores error messages
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
                console.log("Fetch Products: Pending"); // Debugging
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.allProducts = action.payload; // Assign fetched products
                console.log("Fetch Products: Fulfilled", action.payload); // Debugging
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                console.error("Fetch Products: Rejected", action.error.message); // Debugging
            });
    },
});

export default productsSlice.reducer;
