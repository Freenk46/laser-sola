
// CartPage.tsx
import React, { useState } from 'react';
import { Trash2, ArrowLeft } from 'lucide-react';
import styles from './CartPage.module.scss';

interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  savings: number;
  quantity: number;
  image: string;
}

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Lip & Chin',
      price: 22.50,
      originalPrice: 45.00,
      savings: 22.50,
      quantity: 1,
      image: 'LIP'
    },
    {
      id: '2',
      name: 'Face & Neck',
      price: 270.00,
      originalPrice: 540.00,
      savings: 270.00,
      quantity: 1,
      image: 'LIP'
    }
  ]);

  const [promoCode, setPromoCode] = useState('');

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalSavings = cartItems.reduce((sum, item) => sum + (item.savings * item.quantity), 0);

  const applyPromoCode = () => {
    console.log('Applying promo code:', promoCode);
  };

  return (
    <div className={styles.cartPage}>
      {/* Progress Steps */}
      <div className={styles.progressSection}>
        <div className={styles.progressContainer}>
          <div className={styles.progressSteps}>
            {[
              { step: 1, label: 'Select Treatment', active: false },
              { step: 2, label: 'Add Ons', active: false },
              { step: 3, label: 'Cart Review', active: true },
              { step: 4, label: 'Payment', active: false }
            ].map(({ step, label, active }) => (
              <div key={step} className={styles.progressStep}>
                <div className={`${styles.stepButton} ${active ? styles.active : ''}`}>
                  {step} {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.mainContainer}>
        {/* Continue Shopping Link */}
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
          {/* Cart Items Header */}
          <div className={styles.cartHeader}>
            <div className={styles.treatmentCol}>TREATMENT</div>
            <div className={styles.quantityCol}>QUANTITY</div>
            <div className={styles.amountCol}>AMOUNT</div>
            <div className={styles.actionCol}></div>
          </div>

          {/* Cart Items */}
          {cartItems.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <div className={styles.treatmentCol}>
                <div className={styles.treatmentInfo}>
                  <div className={styles.treatmentImage}>
                    {item.image}
                  </div>
                  <span className={styles.treatmentName}>{item.name}</span>
                </div>
              </div>
              
              <div className={styles.quantityCol}>
                <div className={styles.quantityControls}>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className={styles.quantityBtn}
                  >
                    -
                  </button>
                  <span className={styles.quantityValue}>
                    {item.quantity}
                  </span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className={styles.quantityBtn}
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className={styles.amountCol}>
                <div className={styles.priceInfo}>
                  <div className={styles.price}>£{(item.price * item.quantity).toFixed(2)}</div>
                  <div className={styles.savings}>
                    Savings £{(item.savings * item.quantity).toFixed(2)}
                  </div>
                </div>
              </div>
              
              <div className={styles.actionCol}>
                <button 
                  onClick={() => removeItem(item.id)}
                  className={styles.removeBtn}
                >
                  <Trash2 className={styles.removeIcon} />
                </button>
              </div>
            </div>
          ))}

          {/* Promo Code Section */}
          <div className={styles.promoSection}>
            <div className={styles.promoControls}>
              <input
                type="text"
                placeholder="Promo Code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className={styles.promoInput}
              />
              <button
                onClick={applyPromoCode}
                className={styles.promoBtn}
              >
                APPLY CODE
              </button>
            </div>
          </div>

          {/* Summary Section */}
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

        {/* Payment Methods */}
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

        {/* Checkout Button */}
        <div className={styles.checkoutSection}>
          <button className={styles.checkoutBtn}>
            CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;