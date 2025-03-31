import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from 'shared/ui/Input/Input';
import { ConsultationBlock } from 'widgets/ConsultationBlock';
import { HeroSection } from 'widgets/HeroSection';
import { Testimonials } from 'widgets/Testimonials';
import { PricingSection } from 'widgets/PricingSection';
import { AboutSection } from 'widgets/AboutSection';
import { BenefitsSection } from 'widgets/BenefitsSection/ui/BenefitsSection';


const MainPage = () => {
    const { t } = useTranslation();
    const [value, setValue] = useState('');

    const onChange = (val: string) => {
        setValue(val);
    };
    const benefits = [
        {
            title: 'Safe and effective technology',
            text: 'Our Laser Therapists are experienced in operating the market-leading Laser Hair Removal technology...',
        },
        {
            title: 'Permanent hair reduction',
            text: 'Unlike other hair removal options, our medical-grade Laser Hair Removal means fast, safe, cost-effective...',
        },
        {
            title: 'Reduce ingrown hairs',
            text: 'Laser Hair Removal works by directing concentrated light to target the hair follicle at the root...',
        },
        {
            title: 'Convenient & cost effective',
            text: 'We have the most affordable Laser Hair Removal prices... Click here for details.',
        },
    ];

    return (
        <div>
            <HeroSection
                image="https://www.laserclinics.co.uk/contentassets/52ce3bc97cdc4c389b20e10d5b118ade/rebrandv2lhrhero-1.png?width=1920&mode=max"
                title="Silky smooth, 7 days a week"
                description="Throw out the razors. No more waxing. Say hello to medical-grade Laser Hair Removal and enjoy the freedom of being ready at a moment's notice."
                primaryBtn={{ text: 'LEARN MORE', href: '#benefits' }}
                secondaryBtn={{ text: 'BOOK A CONSULTATION', href: '#consultation' }}
                navLinks={[
                    { label: 'About', href: '#about' },
                    { label: 'Benefits', href: '#benefits' },
                    { label: 'How It Works', href: '#how' },
                    { label: 'Preparation & Aftercare', href: '#aftercare' },
                    { label: 'Pricing', href: '#pricing' },
                    { label: 'Before & After', href: '#before-after' },
                    { label: 'Testimonials', href: '#testimonials' },
                    { label: 'Book a Consultation', href: '#consultation' },
                    { label: 'FAQs', href: '#faqs' },
                ]}
            />
            <section id="about">
                <AboutSection />
            </section>
            <section id="about">
                <BenefitsSection title="Benefits of Laser Hair Removal"
                    image="https://www.laserclinics.co.uk/contentassets/5abdddbd832b45bf8da64f409e129644/rebrandv2lhrbenefits.png"
                    items={benefits} />
            </section>
            <section id="ConsultationBlock">
                <ConsultationBlock />
            </section>
            <section id="pricing">
                <PricingSection />
            </section>
            <section id="Testimonials">
                <Testimonials />
            </section>

        </div>
    );
};

export default MainPage;
