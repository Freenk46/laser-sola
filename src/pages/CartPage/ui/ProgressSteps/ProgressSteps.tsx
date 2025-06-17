import React from 'react';
import styles from './ProgressSteps.module.scss';

interface Step {
  step: number;
  label: string;
  completed?: boolean;
  active?: boolean;
  onClick?: () => void;
}

interface Props {
  steps: Step[];
}

export const ProgressSteps: React.FC<Props> = ({ steps }) => {
  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressSteps}>
        {steps.map(({ step, label, active, completed, onClick }) => (
          <div
            key={step}
            className={styles.progressStep}
            onClick={onClick}
          >
            <div
              className={`${styles.stepButton} ${active ? styles.active : ''} ${completed ? styles.completed : ''}`}
            >
              {step} {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
