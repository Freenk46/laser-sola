
// components/MyAppointments/MyAppointments.tsx
import React from 'react';
import styles from './MyAppointments.module.scss';

const MyAppointments: React.FC = () => {
  return (
    <div className={styles.myAppointments}>
      <div className={styles.header}>
        <h1 className={styles.title}>My Appointments</h1>
        <p className={styles.subtitle}>
          This is where you can view all your upcoming appointments, or your appointments completed in the past.
        </p>
      </div>
      
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>UPCOMING APPOINTMENTS</h2>
      </div>
      
      <div className={styles.emptyState}>
        <p className={styles.emptyMessage}>Don't have any appointments booked in?</p>
        <button className={styles.bookButton}>
          BOOK NOW
        </button>
      </div>
    </div>
  );
};

export default MyAppointments;