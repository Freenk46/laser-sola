import React from 'react';
import styles from '../BookingPage.module.scss';

interface Props {
  proceduresCount: number;
  totalDuration: number;
  selectedDate?: string;
  selectedSlot?: string | null;
  totalPrice: number;
  onConfirm: () => void;
  confirmEnabled: boolean;
}

export const OrderSummarySidebar: React.FC<Props> = ({
  proceduresCount,
  totalDuration,
  selectedDate,
  selectedSlot,
  totalPrice,
  onConfirm,
  confirmEnabled,
}) => {
  return (
    <div className={`${styles.card} ${styles.sidebar}`}>
      <h3 className={styles.cardTitle}>შეკვეთის დეტალები</h3>

      <div className={styles.orderDetails}>
        <div className={styles.orderDetail}>
          <span className={styles.orderDetailLabel}>პროცედურები:</span>
          <span className={styles.orderDetailValue}>{proceduresCount}</span>
        </div>
        <div className={styles.orderDetail}>
          <span className={styles.orderDetailLabel}>ხანგრძლივობა:</span>
          <span className={styles.orderDetailValue}>{totalDuration} წთ</span>
        </div>
        {selectedDate && (
          <div className={styles.orderDetail}>
            <span className={styles.orderDetailLabel}>თარიღი:</span>
            <span className={styles.orderDetailValue}>{selectedDate}</span>
          </div>
        )}
        {selectedSlot && (
          <div className={styles.orderDetail}>
            <span className={styles.orderDetailLabel}>დრო:</span>
            <span className={styles.orderDetailValue}>{selectedSlot}</span>
          </div>
        )}
      </div>

      <div className={styles.orderTotal}>
        <div className={styles.totalRow}>
          <span>ჯამი:</span>
          <span className={styles.totalPrice}>{totalPrice} ლარი</span>
        </div>
      </div>

      <button
        onClick={onConfirm}
        disabled={!confirmEnabled}
        className={`${styles.bookingButton} ${
          confirmEnabled ? styles.bookingButtonEnabled : styles.bookingButtonDisabled
        }`}
      >
        {confirmEnabled ? 'დაჯავშნა' : 'აირჩიეთ დრო'}
      </button>

      <p className={styles.disclaimer}>* დაჯავშნის შემდეგ მიიღებთ დასტურის SMS-ს</p>
    </div>
  );
};
