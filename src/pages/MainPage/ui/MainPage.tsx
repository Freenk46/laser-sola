import { useGetPageContentQuery } from 'features/content/model/api/contentApi';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import HighlightSection from 'widgets/HighlightSection/HighlightSection';
import { LaserHeroSection } from 'widgets/LaserHeroSection/LaserHeroSection';
import ScrollingStores from 'widgets/ScrollingStores/ScrollingStores';
import { SkinTreatmentSection } from 'widgets/SkinTreatmentSection/SkinTreatmentSection';
import { StackShowcase } from 'widgets/StackShowcase/StackShowcase';
import styles from './MainPage.module.scss';
import MembershipSection from 'widgets/MembershipPromo/MembershipPromo';
import SustainabilityProgress from 'widgets/SustainabilityProgress/SustainabilityProgress';
import PaymentBanner2 from 'widgets/PaymentBanner2/PaymentBanner';




const MainPage = () => {
  
    const { data, isLoading } = useGetPageContentQuery('home');
    const { t } = useTranslation();
  
    if (isLoading || !data) return null;

    return (
        <div className={styles.mainPage}>
          <section id="stack" className={styles.fullWidthSection}>
                <StackShowcase {...data.stackShowcase} />
            </section>
            <section id="highlight" className={styles.fullWidthSection}>
                <HighlightSection {...(data.highlightSection)} />
            </section>
          
            <section id="laser" className={styles.containedSection}>
                <LaserHeroSection />
            </section>
            <section id="ScrollingStores" className={styles.fullWidthSection}>
                <ScrollingStores  
                   {...(data.scrollingStores)}
                />
            </section>
            <section id="highlight" className={styles.fullWidthSection}>
              <MembershipSection 
                 videoSrc="/media/123.mp4"
                    autoPlay={true}
                     muted={true}
                    loop={true}
                />
            </section>
            <section id="ScrollingStores2" className={styles.fullWidthSection}>
            <PaymentBanner2/> 
  </section>
            <section id="skin" className={styles.containedSection}>
                <SkinTreatmentSection />
            </section>
       
            <section id="ScrollingStores3" className={styles.fullWidthSection}>
            <SustainabilityProgress/>
            </section>
        </div>
    );
};

export default MainPage;
