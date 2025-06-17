import React from 'react';
import styles from './Feedback.module.scss';

const Feedback: React.FC = () => {
  return (
    <div className={styles.feedback}>
      <div className={styles.header}>
        <h1 className={styles.title}>Feedback</h1>
        <p className={styles.subtitle}>Share your feedback with us</p>
      </div>
      <div className={styles.content}>
        <p>Feedback content will be here...</p>
      </div>
    </div>
  );
};

export default Feedback;