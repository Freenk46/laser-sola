// src/features/Cart/api/cartApi.ts

import axios from 'axios';
import { CartItem } from '../model/types/cartItem';

// 🧾 Get all cart items
export const getCart = async (): Promise<CartItem[]> => {
  const response = await axios.get('/api/cart');
  return response.data;
};

// ➕ Add a new cart item
export const addCartItem = async (item: CartItem): Promise<void> => {
  await axios.post('/api/cart/add', item);
};

// ❌ Remove item by ID
export const deleteCartItem = async (id: string): Promise<void> => {
  await axios.delete(`/api/cart/${id}`);
};

// 🧹 Clear entire cart
export const clearCart = async (): Promise<void> => {
  await axios.delete('/api/cart');
};

// 🔁 Update item quantity
export const updateCartItemQuantity = async (id: string, quantity: number): Promise<void> => {
  await axios.patch(`/api/cart/${id}`, { quantity });
};
