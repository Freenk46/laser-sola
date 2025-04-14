import React from 'react';
import styles from './BenefitsSection.module.scss';
import { MotionWrapper } from 'shared/ui/MotionWrapper/MotionWrapper';

interface BenefitItem {
  title: string;
  text: string;
}

interface BenefitsSectionProps {
  title: string;
  image: string;
  items: BenefitItem[];
}

export const BenefitsSection = ({ title, image, items }: BenefitsSectionProps) => {
  return (
    <section className={styles.benefits} id="benefits">
      <h2>{title}</h2>

      <div className={styles.content}>
        <div className={styles.image}>
          <img src={image} alt="Laser Hair Removal" />
        </div>

        <div className={styles.items}>
          {items.map((item, idx) => (
            <div key={idx} className={styles.item}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
