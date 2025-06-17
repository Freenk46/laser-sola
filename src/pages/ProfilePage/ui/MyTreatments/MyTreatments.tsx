
// components/MyTreatments/MyTreatments.tsx
import React from 'react';
import styles from './MyTreatments.module.scss';

const MyTreatments: React.FC = () => {
  return (
    <div className={styles.myTreatments}>
      <div className={styles.header}>
        <h1 className={styles.title}>View and manage your treatments online.</h1>
        <p className={styles.subtitle}>
          Please note that treatments purchased online may take up to 1 hour to show here.
        </p>
      </div>
      
      <div className={styles.emptyState}>
        <p className={styles.emptyMessage}>Don't have any treatments yet?</p>
        <button className={styles.buyButton}>
          BUY NOW
        </button>
      </div>
    </div>
  );
};

export default MyTreatments;