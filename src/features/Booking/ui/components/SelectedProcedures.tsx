import React from 'react';
import { Calendar } from 'lucide-react';
import styles from '../BookingPage.module.scss';
import { CartItem } from 'features/Cart/model/types/cartItem';



interface Props {
  items: CartItem[];
}

export const SelectedProcedures: React.FC<Props> = ({ items }) => (
  <div className={`${styles.card} ${styles.fadeIn}`}>
    <h3 className={styles.cardTitle}>
      <Calendar className="w-6 h-6 text-pink-600" />
      შერჩეული პროცედურები
    </h3>
    <div>
      {items.map(item => (
        <div key={item.id} className={styles.serviceItem}>
          <div className={styles.serviceInfo}>
            <h4>{item.name}</h4>
            <p>{item.duration} წუთი</p>
          </div>
          <span className={styles.servicePrice}>{item.price} ლარი</span>
        </div>
      ))}
    </div>
  </div>
);