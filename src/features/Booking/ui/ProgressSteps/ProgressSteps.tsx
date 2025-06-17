import React from 'react';
import styles from './ProgressSteps.module.scss';

interface ProgressStepsProps {
  currentStep: number;
}

export const ProgressSteps: React.FC<ProgressStepsProps> = ({ currentStep }) => {
  return (
    <div className={styles.progressSteps}>
      <div className={`${styles.step} ${currentStep >= 1 ? styles.stepActive : styles.stepInactive}`}>
        1
      </div>
      <div className={`${styles.stepConnector} ${currentStep >= 2 ? styles.stepConnectorActive : styles.stepConnectorInactive}`}></div>
      <div className={`${styles.step} ${currentStep >= 2 ? styles.stepActive : styles.stepInactive}`}>
        2
      </div>
      <div className={`${styles.stepConnector} ${currentStep >= 3 ? styles.stepConnectorActive : styles.stepConnectorInactive}`}></div>
      <div className={`${styles.step} ${currentStep >= 3 ? styles.stepActive : styles.stepInactive}`}>
        3
      </div>
    </div>
  );
};
