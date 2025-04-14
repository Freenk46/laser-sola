import React, { useState } from 'react';
import styles from './PricingSection.module.scss';

const pricingData = {
  'ყველაზე პოპულარული ლაზერული ზონები': [
    { name: 'ტუჩი', price: 15, coursePrice: 120, original: 30 },
    { name: 'ნიკაპი', price: 15, coursePrice: 120, original: 30 },
    { name: 'ქალის ბრაზილიური ეპილაცია', price: 22.5, coursePrice: 190, original: 45 },
    { name: '1/2 სახე (შუბლი-ცხვირი ან ზედა ტუჩი-ნიკაპი)', price: 22.5, coursePrice: 190, original: 45 },
  ],
  'სახე და ყელი': [
    { name: 'მთლიანი სახე', price: 25, coursePrice: 200, original: 50 },
    { name: 'სანიკაპე ზონა', price: 20, coursePrice: 160, original: 40 },
  ],
  'ზემო ტანი': [
    { name: 'მკლავები', price: 35, coursePrice: 280, original: 60 },
    { name: 'მხრები', price: 30, coursePrice: 240, original: 50 },
  ],
  'ქვემო ტანი': [
    { name: 'ფეხები', price: 45, coursePrice: 360, original: 80 },
    { name: 'თითები (ფეხები)', price: 10, coursePrice: 80, original: 20 },
  ],
  'მთლიანი სხეული': [
    { name: 'სრული სხეულის პაკეტი', price: 99, coursePrice: 750, original: 150 },
  ]
};

const tabs = Object.keys(pricingData) as Array<keyof typeof pricingData>;

export const PricingSection = () => {
  const [activeTab, setActiveTab] = useState<keyof typeof pricingData>(tabs[0]);
  const [selection, setSelection] = useState<{ [key: string]: 'single' | 'course' }>({});

  const handleSelectChange = (itemName: string, value: 'single' | 'course') => {
    setSelection((prev) => ({ ...prev, [itemName]: value }));
  };

  const items = pricingData[activeTab];

  return (
    <section className={styles.pricing}>
      <h2>ლაზერული ეპილაციის ფასები</h2>

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
        {items.map((item, idx) => {
          const selected = selection[item.name] || 'single';
          const displayPrice = selected === 'single'
            ? item.price ?? item.original
            : item.coursePrice ?? item.original;

          const savings = item.original - displayPrice;
          const uniqueKey = `${activeTab}-${item.name}`;

          return (
            <div className={styles.card} key={uniqueKey}>
              <h3>{item.name}</h3>

              <div className={styles.price}>
                <span className={styles.current}>₾{displayPrice.toFixed(2)}</span>
                <span className={styles.original}>₾{item.original.toFixed(2)}</span>
              </div>

              {savings > 0 && (
                <div className={styles.savings}>
                  დაზოგე ₾{savings.toFixed(2)} ({Math.round((savings / item.original) * 100)}%)
                </div>
              )}

              <select
                value={selected}
                onChange={(e) =>
                  handleSelectChange(item.name, e.target.value as 'single' | 'course')
                }
              >
                <option value="single">შეიძინე ერთი სეანსი</option>
                <option value="course">შეიძინე კურსი</option>
              </select>

              <button className={styles.button}>
                <span>დაჯავშნა</span>
                <span className={styles.arrow}>→</span>
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};
