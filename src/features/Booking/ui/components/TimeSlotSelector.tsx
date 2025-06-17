import React from 'react';
import { Clock } from 'lucide-react';
import styles from '../BookingPage.module.scss';

interface Props {
  availableSlots: string[];
  selectedSlot: string | null;
  onSelect: (slot: string) => void;
}

export const TimeSlotSelector: React.FC<Props> = ({ availableSlots, selectedSlot, onSelect }) => {
  return (
    <div className={`${styles.card} ${styles.slideUp}`}>
      <h3 className={styles.cardTitle}>
        <Clock className="w-6 h-6 text-pink-600" />
        აირჩიეთ დრო
      </h3>
      <div className={styles.timeSlots}>
        {availableSlots.map(slot => (
          <button
            key={slot}
            onClick={() => onSelect(slot)}
            className={`${styles.timeSlot} ${
              selectedSlot === slot ? styles.timeSlotSelected : styles.timeSlotDefault
            }`}
          >
            {slot}
          </button>
        ))}
      </div>
    </div>
  );
};
