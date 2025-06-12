// PaymentBanner.tsx
import React from 'react';
import styles from './PaymentBanner.module.scss';
import ClearpayLogo from './ClearpayLogo';
import KlarnaLogo from './KlarnaLogo';

const PaymentBanner2: React.FC = () => {
  return (
    <div className={styles.banner}>
      {/* Decorative leaf elements */}
      <div className={styles.leafLeft}>
        <svg viewBox="0 0 100 100" className={styles.leafSvg}>
          <path 
            d="M10,50 Q30,10 50,30 Q70,50 50,70 Q30,90 10,50 Z" 
            fill="currentColor"
          />
        </svg>
      </div>
      
      <div className={styles.leafRight}>
        <svg viewBox="0 0 100 100" className={styles.leafSvg}>
          <path 
            d="M20,50 Q40,20 60,40 Q80,60 60,80 Q40,100 20,50 Z" 
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Main content */}
      <div className={styles.content}>
        {/* Left side - promotional text */}
        <div className={styles.textSection}>
          <h2 className={styles.mainText}>
          ახლა ხელმისაწვდომია ონლაინ
          </h2>
        </div>

        {/* Right side - payment logos */}
        <div className={styles.logoSection}>
          <ClearpayLogo />
          <KlarnaLogo />
        </div>
      </div>

      {/* Additional decorative elements */}
      <div className={styles.decorativeCircle}>
        <svg viewBox="0 0 100 100" className={styles.circleSvg}>
          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="2"/>
          <circle cx="50" cy="20" r="3" fill="currentColor"/>
          <circle cx="80" cy="50" r="3" fill="currentColor"/>
          <circle cx="50" cy="80" r="3" fill="currentColor"/>
          <circle cx="20" cy="50" r="3" fill="currentColor"/>
        </svg>
      </div>
    </div>
  );
};

export default PaymentBanner2;


