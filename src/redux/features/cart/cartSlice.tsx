// cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  _id: string;
  title: string;
  quantity: number;
  price: number;
  author: string;
  description: string;
  image: string;
  category : string;
}

interface CartState {
  items: CartItem[];
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item._id === action.payload._id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      state.totalPrice += action.payload.price * action.payload.quantity;
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(item => item._id === action.payload);
      if (item) {
        item.quantity += 1;
        state.totalPrice += item.price; // Update total price
      }
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(item => item._id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.totalPrice -= item.price; // Update total price
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const itemIndex = state.items.findIndex(item => item._id === action.payload);
      if (itemIndex !== -1) {
        state.totalPrice -= state.items[itemIndex].price * state.items[itemIndex].quantity;
        state.items.splice(itemIndex, 1);
      }
    },
  },
});

export const { addToCart,removeItem, clearCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;