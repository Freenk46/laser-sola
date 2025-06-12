import React, { useEffect } from 'react';
import { CartModalProps } from '../types/CartTypes';
import styles from './CartModal.module.scss';
import { useModalContext } from 'shared/context/ModalContext';
import { useTheme } from 'app/providers/ThemeProvider';

const CartModal: React.FC<Omit<CartModalProps, 'isOpen' | 'onClose'>> = ({
  items,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  const { isModalOpen, closeModal } = useModalContext();
  const isOpen = isModalOpen('cart');

        const contextTheme = useTheme().theme;
        const appliedTheme = `cartmodal${ contextTheme}`;

  // Close on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeModal();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeModal]);

  // Close on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        closeModal();
      }
    };
    if (isOpen) {
      window.addEventListener('scroll', handleScroll);
    }
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen, closeModal]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleRemoveItem = (itemId: string) => onRemoveItem(itemId);

  const cartTotal = items.reduce((sum, item) => sum + item.price, 0);
  const totalSavings = cartTotal;

  const renderCartItems = () => {
    if (items.length === 0) {
      return (
        <div className={styles.emptyCart}>
          <div className={styles.emptyIcon}>🛒</div>
          <h3>Your cart is empty</h3>
          <p>Add some items to get started!</p>
        </div>
      );
    }

    return (
      <>
        {items.map((item) => (
          <div key={item.id} className={styles.cartItem}>
            <div className={styles.itemTag}>{item.tag}</div>
            <div className={styles.itemDetails}>
              <div className={styles.itemName}>{item.name}</div>
              <div className={styles.itemQuantity}>Quantity: {item.quantity}</div>
            </div>
            <div className={styles.itemPrice}>£{item.price.toFixed(2)}</div>
            <button
              className={styles.deleteBtn}
              onClick={() => handleRemoveItem(item.id)}
              aria-label={`Remove ${item.name} from cart`}
            >
              ×
            </button>
          </div>
        ))}
        <div className={styles.cartSummary}>
          <div className={`${styles.summaryRow} ${styles.savings}`}>
            <span>Total Savings</span>
            <span>£{totalSavings.toFixed(2)}</span>
          </div>
          <div className={`${styles.summaryRow} ${styles.total}`}>
            <span>Cart Total</span>
            <span>£{cartTotal.toFixed(2)}</span>
          </div>
          <button
            className={styles.checkoutBtn}
            onClick={onProceedToCheckout}
            disabled={items.length === 0}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </>
    );
  };

  if (!isOpen) return null;


  return (
    <div className={`${styles.modalOverlay} ${isOpen ? styles.open : ''}`} onClick={handleOverlayClick}>
      <div className={`${styles.cartmodal} ${appliedTheme}`}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>Your Order:</h3>
          <button className={styles.closeBtn} onClick={closeModal} aria-label="Close cart">×</button>
        </div>
        <div className={styles.modalBody}>
          {renderCartItems()}
        </div>
      </div>
    </div>
  );
};

export default CartModal;
