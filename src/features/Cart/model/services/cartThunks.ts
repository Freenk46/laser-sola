// src/features/Cart/model/services/cartThunks.ts

import { AppDispatch } from '/app/providers/StoreProvider';
import {
  setCart,
  addItem,
  removeItem,
  clearCart,
  updateQuantity,
} from '../slice/cartSlice';
import { CartItem } from '../types/cartItem';
import * as api from '../../api/cartApi'; // 📎 Axios API ფუნქციები

// 📥 კალათის ჩატვირთვა სერვერიდან
export const fetchCartFromServer = () => async (dispatch: AppDispatch) => {
  try {
    const data = await api.getCart();
    dispatch(setCart(data));
  } catch (error) {
    console.error('❌ Failed to fetch cart:', error);
  }
};

// ➕ ელემენტის დამატება სერვერზე და Redux-ში
export const addItemToServer = (item: CartItem) => async (dispatch: AppDispatch) => {
  try {
    await api.addCartItem(item);
    dispatch(addItem(item));
  } catch (error) {
    console.error('❌ Failed to add item to server:', error);
  }
};

// ❌ ელემენტის წაშლა სერვერიდან და Redux-იდან
export const removeItemFromServer = (id: string) => async (dispatch: AppDispatch) => {
  try {
    await api.deleteCartItem(id);
    dispatch(removeItem(id));
  } catch (error) {
    console.error('❌ Failed to remove item from server:', error);
  }
};

// 🧹 სრული კალათის გაწმენდა
export const clearCartOnServer = () => async (dispatch: AppDispatch) => {
  try {
    await api.clearCart();
    dispatch(clearCart());
  } catch (error) {
    console.error('❌ Failed to clear cart:', error);
  }
};

// 🔁 რაოდენობის განახლება
export const updateItemQuantityOnServer = (id: string, quantity: number) => async (dispatch: AppDispatch) => {
  try {
    await api.updateCartItemQuantity(id, quantity);
    dispatch(updateQuantity({ id, quantity }));
  } catch (error) {
    console.error('❌ Failed to update item quantity:', error);
  }
};
