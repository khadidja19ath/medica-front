import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productsApi } from "../services/api";

// Thunks : actions asynchrones qui appellent l'API.
// rejectWithValue transmet { message, status, errors } au reducer.
export const fetchProducts = createAsyncThunk("products/fetchAll", async (_, { rejectWithValue }) => {
  try {
    return await productsApi.getAll();
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const createProduct = createAsyncThunk("products/create", async (payload, { getState, rejectWithValue }) => {
  try {
    return await productsApi.create(payload, getState().auth.token);
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const updateProduct = createAsyncThunk("products/update", async ({ id, data }, { getState, rejectWithValue }) => {
  try {
    return await productsApi.update(id, data, getState().auth.token);
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const deleteProduct = createAsyncThunk("products/delete", async (id, { getState, rejectWithValue }) => {
  try {
    return await productsApi.remove(id, getState().auth.token);
  } catch (error) {
    return rejectWithValue(error);
  }
});

// État : { items, status: "idle" | "loading" | "succeeded" | "failed", error }
const productsSlice = createSlice({
  name: "products",
  initialState: { items: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Impossible de charger les produits";
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.items = state.items.map((p) => (p.id === action.payload.id ? action.payload : p));
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
      });
  },
});

export const selectProducts = (state) => state.products.items;
export const selectProductsStatus = (state) => state.products.status;
export const selectProductsError = (state) => state.products.error;

export default productsSlice.reducer;
