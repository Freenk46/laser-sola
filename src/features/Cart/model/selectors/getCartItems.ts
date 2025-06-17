import { StateSchema } from '/app/providers/StoreProvider/config/StateSchema';
import { CartItem } from '../types/cartItem';

export const getCartItems = (state: StateSchema): CartItem[] => state.cart.items;