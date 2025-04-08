import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GreenwayBanner } from 'widgets/GreenwayBanner/GreenwayBanner';
import HighlightSection from 'widgets/HighlightSection/HighlightSection';
import { LaserHeroSection } from 'widgets/LaserHeroSection/LaserHeroSection';
import { PaymentBanner } from 'widgets/PaymentBanner/PaymentBanner';
import ScrollingStores from 'widgets/ScrollingStores/ScrollingStores';
import { SkinTreatmentSection } from 'widgets/SkinTreatmentSection/SkinTreatmentSection';

import { StackShowcase } from 'widgets/StackShowcase/StackShowcase';


const MainPage = () => {
    const { t } = useTranslation();
    const [value, setValue] = useState('');

    const onChange = (val: string) => {
        setValue(val);
    };


    return (
        <div className="main-page">




            <HighlightSection
                videoSrc="/media/123.mp4"
                heading="საოცარი ხარისხი"
                paragraphs={[
                    "ჩვენი აღჭურვილობა საუკეთესოა.",
                    "We ensure every detail is pixel perfect.",
                ]}
                ctaText="Learn more"
                ctaHref="/about"
                reverse={true} // ✅ აქ ვიდეო წავა მარჯვნივ და ტექსტი მარცხნივ
            />
            <ScrollingStores
                items={[
                    'ლაზერული ეპილაცია', 'კანის მკურნალობა', 'ბათუმი', 'სხეულის კონტურის ფორმირება',
                    'ჰიდრაფეიშალი', 'აკნეს მოგვარება', 'პიგმენტაციის კორექცია', 'ბათუმი', 'Greenway', 'კოსმეტიკური ინიექციები',
                ]}
                highlight="OUR STORES"
                speed={20}
                direction="left"
            />
            <LaserHeroSection />


            <PaymentBanner />
            <SkinTreatmentSection />


            <GreenwayBanner />
            <StackShowcase

                title="შენი კანის მოვლა"
                description="ჩვენ დაგეხმარებით შექმნაში პერსონალური კანის მოვლის რუტინის, რომელიც შეესაბამება შენს კანის ტიპს, ტონსა და მიზნებს. გაუწიე შენს თავს ზრუნვა, რაც იმსახურებს."
                buttonText="გაიგე მეტი"
                imageSrc="/images/2.jpg"
                imageAlt="Model with stacked jewelry"


            />


        </div>
    );
};

export default MainPage;
