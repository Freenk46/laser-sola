import React from 'react';
import { Check } from 'lucide-react';
import styles from '../BookingPage.module.scss';

interface Props {
  selectedDate: string;
  selectedSlot: string;
  totalPrice: number;
  onBack: () => void;
}

export const ConfirmationCard: React.FC<Props> = ({
  selectedDate,
  selectedSlot,
  totalPrice,
  onBack
}) => {
  return (
    <div className={styles.confirmationContainer}>
      <div className={styles.confirmationCard}>
        <div className={styles.confirmationIcon}>
          <Check className="w-10 h-10 text-green-600" />
        </div>
        <h2 className={styles.confirmationTitle}>დაჯავშნა დადასტურდა!</h2>
        <p className={styles.confirmationMessage}>
          თქვენი ვიზიტი დაჯავშნილია {selectedDate}-ზე, {selectedSlot}-ზე
        </p>
        <div className={styles.confirmationDetails}>
          <div className={styles.confirmationDetail}>
            <span className={styles.confirmationDetailLabel}>თარიღი:</span>
            <span className={styles.confirmationDetailValue}>{selectedDate}</span>
          </div>
          <div className={styles.confirmationDetail}>
            <span className={styles.confirmationDetailLabel}>დრო:</span>
            <span className={styles.confirmationDetailValue}>{selectedSlot}</span>
          </div>
          <div className={styles.confirmationDetail}>
            <span className={styles.confirmationDetailLabel}>ჯამი:</span>
            <span className={styles.confirmationDetailValue}>{totalPrice} ლარი</span>
          </div>
        </div>
        <button onClick={onBack} className={styles.backButton}>
          მთავარ გვერდზე დაბრუნება
        </button>
      </div>
    </div>
  );
};
