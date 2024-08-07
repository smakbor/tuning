// third-party
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
  productCarts: JSON.parse(localStorage.getItem('productCarts')) || []
};

// ==============================|| SLICE - PRODUCT_CART ||============================== //

const productCart = createSlice({
  name: 'productCarts',
  initialState,
  reducers: {
    // ADD PRODUCT TO CART
    addToCartByProductId(state, { payload: productItemId }) {
      state.productCarts.unshift({ id: productItemId, quantity: 1 });
      localStorage.setItem('productCarts', JSON.stringify(state.productCarts));
    },

    // REMOVE PRODUCT FROM CART
    removeToCartByProductId(state, { payload: productItemId }) {
      state.productCarts = state.productCarts.filter(({ id }) => id !== productItemId);
      localStorage.setItem('productCarts', JSON.stringify(state.productCarts));
    },

    // UPDATE PRODUCT QUANTITY
    updateProductQuantity(state, { payload: productItem }) {
      const index = state.productCarts.findIndex((item) => item.id === productItem.id);
      if (index > -1) {
        state.productCarts[index].quantity = productItem.quantity;
        localStorage.setItem('productCarts', JSON.stringify(state.productCarts));
      }
    },

    // CLEAR CART
    clearCart(state) {
      state.productCarts = [];
      localStorage.removeItem('productCarts');
    }
  }
});

export default productCart.reducer;

export const { addToCartByProductId, removeToCartByProductId, updateProductQuantity, clearCart } = productCart.actions;
