import { createSlice } from "@reduxjs/toolkit";

// État global du panier : { items: [{ ...produit, quantity }] }
const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    // Action : ajouter un produit (ou augmenter sa quantité, sans dépasser le stock)
    addToCart(state, action) {
      const product = action.payload;
      if (product.stock === 0) return;

      const existing = state.items.find((item) => item.id === product.id);
      if (existing) {
        if (existing.stock === undefined || existing.quantity < existing.stock) existing.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },
    // Action : retirer un produit du panier
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    // Action : modifier la quantité (minimum 1, maximum = stock)
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (!item || quantity < 1) return;
      if (item.stock !== undefined && quantity > item.stock) return;
      item.quantity = quantity;
    },
    // Action : vider le panier
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

// Sélecteurs : valeurs calculées à partir de l'état
export const selectCartItems = (state) => state.cart.items;
export const selectTotalItems = (state) => state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectTotalPrice = (state) => state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

export default cartSlice.reducer;
