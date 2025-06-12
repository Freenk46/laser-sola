import React, { useState } from 'react';
import styles from './LaserHeroSection.module.scss';

export const LaserHeroSection = () => {
    const [activeTab, setActiveTab] = useState<'women' | 'men'>('women');

    const linkList = {
        women: [
            'ბრაზილიური და იღლიები',
            'მთლიანი სხეული (ქალი)',
            'მთლიანი ხელები',
            'იღლიები',
            'მთლიანი ფეხები',
        ],
        men: [
            'წვერის კონტურის ფორმირება',
            'ბრაზილიური (კაცი)',
            'მთლიანი ხელები',
            'მკერდი და მუცელი',
            'ზურგი და მხრები',
            'მთლიანი ზურგი',
        ],
    };

    return (
        <section className={styles.heroSection}>
            <div className={styles.container}>
                {/* Left: Image */}
                <div className={styles.imageBlock}>
                    <img src="/images/LHR/9.png" alt="Woman smiling" className={styles.mainImage} />
                    <img src="/images/LHR/4.png" alt="Man smiling" className={styles.overlayImage} />
                </div>

                {/* Right: Content */}
                <div className={styles.content}>
                    <p className={styles.subhead}>  შეიძინე მეტი, ისარგებლე მოგვიანებით</p>
                    <h1 className={styles.heading}>ლაზერული ეპილაცია</h1>
                    <p className={styles.description}>
                        გადაყარე საპარსები. დაივიწყე ცვილი.
                        {' '}
                        <br />
                        ჩვენი სამედიცინო ხარისხის ლაზერული ეპილაცია განსხვავდება სხვა მეთოდებისგან —
                        ის სწრაფი, უსაფრთხო, ხელმისაწვდომი, ეფექტური და მუდმივი შედეგია.
                        {' '}
                        <br />
                        მოწინავე ტექნოლოგია მუშაობს ყველა კანის ტიპზე, ფერზე და გენდერზე.
                        ეს არის ლაზერული ეპილაცია, რომელიც შენზეა მორგებული.
                    </p>

                    {/* Tabs */}
                    <div className={styles.tabs}>
                        <button
                            className={`${styles.tab} ${activeTab === 'women' ? styles.active : ''}`}
                            onClick={() => setActiveTab('women')}
                        >
                            ქალი
                        </button>
                        <button
                            className={`${styles.tab} ${activeTab === 'men' ? styles.active : ''}`}
                            onClick={() => setActiveTab('men')}
                        >
                            კაცი
                        </button>
                    </div>

                    {/* Links */}
                    <div className={styles.linkList}>
                        {linkList[activeTab].map((item, idx) => (
                            <a key={idx} href="#" className={styles.link}>
                                {item}
                            </a>
                        ))}
                    </div>

                    {/* CTA buttons */}
                    <div className={styles.buttons}>
                        <button className={styles.primaryBtn}>იხილე ყველა პროცედურა</button>
                        <button className={styles.secondaryBtn}>დაჯავშნე ახლა</button>
                    </div>
                </div>
            </div>
        </section>
    );
};
