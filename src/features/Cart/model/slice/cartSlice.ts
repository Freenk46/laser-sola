import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '../types/cartItem';

// 🔄 LocalStorage ჰანდლერი
const loadCartFromStorage = (): CartItem[] => {
  try {
    const data = localStorage.getItem('cart');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveCartToStorage = (items: CartItem[]) => {
  try {
    localStorage.setItem('cart', JSON.stringify(items));
  } catch {
    // Ignore errors
  }
};

// 🔰 საწყისი მდგომარეობა
interface CartState {
  items: CartItem[];
  loadedFromServer: boolean;
}

const initialState: CartState = {
  items: loadCartFromStorage(),
  loadedFromServer: false,
};

// 🧩 Slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const existingItem = state.items.find(item => item.id === action.payload.id);

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push({ ...action.payload });
      }

      saveCartToStorage(state.items);
    },

    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveCartToStorage(state.items);
    },

    clearCart(state) {
      state.items = [];
      saveCartToStorage(state.items);
    },

    updateQuantity(state, action: PayloadAction<{ id: string; quantity: number }>) {
      const item = state.items.find(i => i.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        saveCartToStorage(state.items);
      }
    },

    setCart(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
      saveCartToStorage(state.items);
    },

    setCartFromServer(state, action: PayloadAction<CartItem[]>) {
      if (!state.loadedFromServer) {
        state.items = action.payload;
        state.loadedFromServer = true;
        saveCartToStorage(state.items);
      }
    }
  },
});

export const {
  addItem,
  removeItem,
  clearCart,
  updateQuantity,
  setCart,
  setCartFromServer,
} = cartSlice.actions;

export default cartSlice.reducer;
