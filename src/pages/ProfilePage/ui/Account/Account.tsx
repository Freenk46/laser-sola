import React from 'react';
import styles from './Account.module.scss';

const Account: React.FC = () => {
  return (
    <div className={styles.account}>
      {/* Header Section */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.welcomeSection}>
            <h1 className={styles.title}>Hello, So</h1>
            <p className={styles.subtitle}>
              Here you can manage your pre-purchased treatments and appointment bookings.
            </p>
          </div>
          <div className={styles.balanceSection}>
            <div className={styles.balanceLabel}>Your balance</div>
            <div className={styles.balanceAmount}>0</div>
            <button className={styles.viewAllButton}>
              View all ›
            </button>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className={styles.content}>
        <div className={styles.sectionsGrid}>
          {/* Upcoming Appointments */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Upcoming Appointments</h2>
            <div className={styles.emptyState}>
              <p className={styles.emptyMessage}>Don't have any appointments booked in?</p>
              <button className={styles.actionButton}>
                BOOK NOW
              </button>
            </div>
          </div>

          {/* My Treatments */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>My Treatments</h2>
            <div className={styles.emptyState}>
              <p className={styles.emptyMessage}>Don't have any treatments yet?</p>
              <button className={styles.actionButton}>
                BUY NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;