import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StateSchema } from '/app/providers/StoreProvider';
import { useModalContext } from 'shared/context/ModalContext';
import { useTheme } from 'app/providers/ThemeProvider';
import styles from './CartModal.module.scss';

import { removeItem, clearCart } from '../model/slice/cartSlice';
import { CartItem } from '../model/types/cartItem';
import { useNavigate } from 'react-router-dom';

const CartModal = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: StateSchema) => state.cart.items);

  const navigate = useNavigate(); // ⬅️ შექმენი ჰუკი
  
  const { isModalOpen, closeModal, modalConfig } = useModalContext();
  const isOpen = isModalOpen('cart');
  const config = modalConfig['cart'];

  const [scrolled, setScrolled] = useState(false);
  const contextTheme = useTheme().theme;
  const appliedTheme = `cartmodal${contextTheme}`;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className={`${styles.modalOverlay} ${styles.open}`} data-modal-overlay="true">
      <div className={`${styles.cartmodal} ${appliedTheme} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>Your Order:</h3>
          <button
            className={styles.closeBtn}
            onClick={() => closeModal('cart')}
            aria-label="Close cart"
          >
            ×
          </button>
        </div>

        <div className={styles.modalBody}>
          {items.length === 0 ? (
            <div className={styles.emptyCart}>
              <div className={styles.emptyIcon}>🛒</div>
              <h3>Your cart is empty</h3>
              <p>Add some items to get started!</p>
            </div>
          ) : (
            <>
              {items.map((item: CartItem) => (
                <div key={item.id} className={styles.cartItem}>
                  <div className={styles.itemTag}>{item.itemTag}</div>
                  <div className={styles.itemDetails}>
                    <div className={styles.itemName}>{item.name}</div>
                    <div className={styles.itemQuantity}>Quantity: {item.quantity}</div>
                  </div>
                  <div className={styles.itemPrice}>£{item.price.toFixed(2)}</div>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => dispatch(removeItem(item.id))}
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    ×
                  </button>
                </div>
              ))}
              <div className={styles.cartSummary}>
                <div className={`${styles.summaryRow} ${styles.savings}`}>
                  <span>Total Savings</span>
                  <span>£{cartTotal.toFixed(2)}</span>
                </div>
                <div className={`${styles.summaryRow} ${styles.total}`}>
                  <span>Cart Total</span>
                  <span>£{cartTotal.toFixed(2)}</span>
                </div>
               <button
  className={styles.checkoutBtn}
  onClick={() => {
    closeModal('cart');
    navigate('/cart'); // ⬅️ გადამისამართება
  }}
  disabled={items.length === 0}
>
  PROCEED TO CHECKOUT
</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;
