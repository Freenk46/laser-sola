import React from 'react';
import styles from './SkinTreatmentSection.module.scss';

export const SkinTreatmentSection = () => {
    const treatmentLinks = [
        'LED ყვითელი',                        // ✔ უკვე გაქვს კარგად ნათარგმნი
        'ჰიდროფეიშელ ექსპრეს',
        'მიკროდერმაბრაზიის ექსპრეს',
        'სკინსტიტუტის AHA პილინგი',
        'ენზიმური მიკროპილინგი და LED',
        'მიკრონემსებით სახის მკურნალობა'
    ];

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                {/* Left: Content */}
                <div className={styles.content}>
                    <h1 className={styles.heading}>კანის პროცედურები</h1>
                    <p className={styles.description}>
                        როგორიც არ უნდა იყოს თქვენი კანის საზრუნავი, ჩვენ გვაქვს გამოცდილება, ცოდნა და პროფესიონალური კანის პროცედურები საუკეთესო შედეგების მისაღწევად. ჩვენი მაღალკვალიფიციური თერაპევტების გუნდი დაგეხმარებათ თქვენი პრობლემების იდენტიფიცირებაში და თქვენი კანის მიზნების მიხედვით მკურნალობის გეგმის შედგენაში.
                    </p>

                    <div className={styles.linkList}>
                        {treatmentLinks.map((text, idx) => (
                            <a key={idx} href="#" className={styles.link}>
                                {text}
                            </a>
                        ))}
                    </div>

                    <div className={styles.buttons}>
                        <button className={styles.primaryBtn}>იხილეთ ყველა კანის პროცედურა</button>
                        <button className={styles.secondaryBtn}>დაჯავშნეთ ახლავე</button>
                    </div>
                </div>

                {/* Right: Image */}
                <div className={styles.imageBlock}>
                    <img src="/images/1.png" alt="Skin treatment model" />
                </div>
            </div>
        </section>
    );
};
