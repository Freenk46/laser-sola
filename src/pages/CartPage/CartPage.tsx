import React from 'react';
import { Trash2, ArrowLeft } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';


import styles from './CartPage.module.scss';
import { removeItem, updateQuantity } from 'features/Cart/model/slice/cartSlice';
import { getCartItems } from 'features/Cart/model/selectors/getCartItems';
import { ProgressSteps } from './ui/ProgressSteps/ProgressSteps';
import { useNavigate } from 'react-router-dom';

const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(getCartItems);
  const [promoCode, setPromoCode] = React.useState('');
    const navigate = useNavigate(); // ⬅️ შექმენი ჰუკი

  const handleRemove = (id: string) => {
    dispatch(removeItem(id));
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalSavings = cartItems.reduce((sum, item) => sum + ((item.originalPrice - item.price) * item.quantity), 0);

  const applyPromoCode = () => {
    console.log('Applying promo code:', promoCode);
  };

  return (
    <div className={styles.cartPage}>
      <div className={styles.progressSection}>
        <ProgressSteps
    steps={[
      { step: 1, label: 'Select Treatment', completed: true, onClick: () => navigate('/pricing') },
      { step: 2, label: 'Add Ons', completed: true },
      { step: 3, label: 'Cart Review', active: true },
      { step: 4, label: 'Book Time' , completed: true, onClick: () => navigate('/booking') },
      { step: 5, label: 'Payment' }
    ]}
  />
      </div>

      <div className={styles.mainContainer}>
        <button className={styles.continueShoppingBtn}>
          <ArrowLeft className={styles.backIcon} />
          Continue shopping
        </button>

        <h1 className={styles.pageTitle}>Cart</h1>

        <div className={styles.clinicInfo}>
          <p><strong>Your order is linked to the following clinic:</strong> Stratford</p>
          <p>
            Treatments can only be used at the clinic they were purchased from. 
            <button className={styles.changeClinicBtn}>Change Clinic</button>
          </p>
        </div>

        <div className={styles.cartContainer}>
          <div className={styles.cartHeader}>
            <div className={styles.treatmentCol}>TREATMENT</div>
            <div className={styles.quantityCol}>QUANTITY</div>
            <div className={styles.amountCol}>AMOUNT</div>
            <div className={styles.actionCol}></div>
          </div>

          {cartItems.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <div className={styles.treatmentCol}>
                <div className={styles.treatmentInfo}>
                  <div className={styles.treatmentTag}>{item.itemTag}</div>
                  <span className={styles.treatmentName}>{item.name}</span>
                </div>
              </div>

              <div className={styles.quantityCol}>
                <div className={styles.quantityControls}>
                  <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)} className={styles.quantityBtn}>-</button>
                  <span className={styles.quantityValue}>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)} className={styles.quantityBtn}>+</button>
                </div>
              </div>

              <div className={styles.amountCol}>
                <div className={styles.priceInfo}>
                  <div className={styles.price}>£{(item.price * item.quantity).toFixed(2)}</div>
                  <div className={styles.savings}>Savings £{((item.originalPrice - item.price) * item.quantity).toFixed(2)}</div>
                </div>
              </div>

              <div className={styles.actionCol}>
                <button onClick={() => handleRemove(item.id)} className={styles.removeBtn}>
                  <Trash2 className={styles.removeIcon} />
                </button>
              </div>
            </div>
          ))}

          <div className={styles.promoSection}>
            <div className={styles.promoControls}>
              <input
                type="text"
                placeholder="Promo Code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className={styles.promoInput}
              />
              <button onClick={applyPromoCode} className={styles.promoBtn}>APPLY CODE</button>
            </div>
          </div>

          <div className={styles.summarySection}>
            <div className={styles.summaryContainer}>
              <div className={styles.totalSavings}>
                <span>Total Savings</span>
                <span>£{totalSavings.toFixed(2)}</span>
              </div>
              <div className={styles.cartTotal}>
                <span>Cart Total</span>
                <span>£{subtotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.paymentSection}>
          <p className={styles.paymentLabel}>We accept:</p>
          <div className={styles.paymentMethods}>
            <div className={`${styles.paymentIcon} ${styles.mastercard}`}>MC</div>
            <div className={`${styles.paymentIcon} ${styles.visa}`}>VISA</div>
            <div className={`${styles.paymentIcon} ${styles.amex}`}>AMEX</div>
            <div className={`${styles.paymentIcon} ${styles.applepay}`}>Pay</div>
            <div className={`${styles.paymentIcon} ${styles.paypal}`}>PP</div>
            <div className={`${styles.paymentIcon} ${styles.klarna}`}>K</div>
          </div>
        </div>

        <div className={styles.checkoutSection}>
          <button className={styles.checkoutBtn}>CHECKOUT</button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
