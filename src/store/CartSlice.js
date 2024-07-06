import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
};

const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
      setCart(state, action) {
        state.items = action.payload;
      },
      addToCart(state, action) {
        state.items.push(action.payload);
      },
      removeFromCart(state, action) {
        state.items = state.items.filter((item) => item.dish.id !== action.payload.id);
      },
      increment(state, action) {
        const itemToUpdate = state.items.find((item) => item.dish.id === action.payload.id);
        if (itemToUpdate) {
          itemToUpdate.amount++;
        }
      },
      decrement(state, action) {
        const itemToUpdate = state.items.find((item) => item.dish.id === action.payload.id);
        if (itemToUpdate && itemToUpdate.amount > 1) {
          itemToUpdate.amount--;
        }
      },
    },
  });
  

export const {addToCart, removeFromCart, increment, decrement,setCart} = CartSlice.actions;

export const selectCart = (state) => state.cart;

export default CartSlice.reducer;

