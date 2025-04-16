import { useGetPageContentQuery } from 'features/content/model/api/contentApi';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GreenwayBanner } from 'widgets/GreenwayBanner/GreenwayBanner';
import HighlightSection from 'widgets/HighlightSection/HighlightSection';
import { LaserHeroSection } from 'widgets/LaserHeroSection/LaserHeroSection';
import { PaymentBanner } from 'widgets/PaymentBanner/PaymentBanner';
import ScrollingStores from 'widgets/ScrollingStores/ScrollingStores';
import { SkinTreatmentSection } from 'widgets/SkinTreatmentSection/SkinTreatmentSection';
import { StackShowcase } from 'widgets/StackShowcase/StackShowcase';
import styles from './MainPage.module.scss';



const MainPage = () => {
  
    const { data, isLoading } = useGetPageContentQuery('home');
    const { t } = useTranslation();
    const [value, setValue] = useState('');
    if (isLoading || !data) return null;

    const onChange = (val: string) => {
        setValue(val);
    };

    return (
        <div className={styles.mainPage}>

            <section id="highlight" className={styles.fullWidthSection}>
                <HighlightSection {...(data.highlightSection)} />
            </section>

            <section id="ScrollingStores" className={styles.fullWidthSection}>
                <ScrollingStores
                    items={[
                        'ლაზერული ეპილაცია', 'კანის მკურნალობა', 'ბათუმი', 'სხეულის კონტურის ფორმირება',
                        'ჰიდრაფეიშალი', 'აკნეს მოგვარება', 'პიგმენტაციის კორექცია', 'ბათუმი', 'Greenway', 'კოსმეტიკური ინიექციები',
                    ]}
                    highlight={t('mainPage.ourStores')}
                    speed={20}
                    direction="left"
                />
            </section>

            <section id="laser" className={styles.containedSection}>
                <LaserHeroSection />
            </section>

            <section id="payment" className={styles.fullWidthSection} />

            <section id="skin" className={styles.containedSection}>
                <SkinTreatmentSection />
            </section>
            <section id="stack" className={styles.fullWidthSection}>
                <StackShowcase {...data.stackShowcase} />
            </section>
            <section id="greenway" className={styles.containedSection}>
                <GreenwayBanner />
            </section>

        </div>
    );
};

export default MainPage;
