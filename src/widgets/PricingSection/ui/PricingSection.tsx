import React, { useState } from 'react';
import styles from './PricingSection.module.scss';

const pricingData = {
    'Shop Most Popular Laser': [
        { name: 'Lip', price: 15, original: 30 },
        { name: 'Chin', price: 15, original: 30 },
        { name: 'Female Brazilian', price: 22.5, original: 45 },
        { name: '1/2 Face (forehead to nose OR upper lip to chin)', price: 22.5, original: 45 },
    ],
    'Face & Neck': [
        { name: 'Full Face', price: 25, original: 50 },
        { name: 'Jawline', price: 20, original: 40 },
    ],
    'Upper Body': [
        { name: 'Arms', price: 35, original: 60 },
        { name: 'Shoulders', price: 30, original: 50 },
    ],
    'Lower Body': [
        { name: 'Legs', price: 45, original: 80 },
        { name: 'Toes', price: 10, original: 20 },
    ],
    'Full Body': [
        { name: 'Full Body Package', price: 99, original: 150 },
    ]
};

const tabs = Object.keys(pricingData) as Array<keyof typeof pricingData>;

export const PricingSection = () => {

    const [activeTab, setActiveTab] = useState<keyof typeof pricingData>(tabs[0]);
    const items = pricingData[activeTab];

    return (
        <section className={styles.pricing}>
            <h2>Laser Hair Removal Pricing</h2>

            <div className={styles.tabs}>
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        className={tab === activeTab ? styles.activeTab : ''}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className={styles.cards}>
                {items.map((item, idx) => (
                    <div className={styles.card} key={idx}>
                        <h3>{item.name}</h3>
                        <div className={styles.price}>
                            <span className={styles.current}>£{item.price.toFixed(2)}</span>
                            <span className={styles.original}>£{item.original.toFixed(2)}</span>
                        </div>
                        <select>
                            <option>SELECT AND SAVE</option>
                            <option>Buy Single</option>
                            <option>Buy Course</option>
                        </select>
                    </div>
                ))}
            </div>
        </section>
    );
};
