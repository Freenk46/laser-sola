import React from 'react';
import { useTranslation } from 'react-i18next';
import { AboutSection } from 'widgets/AboutSection';
import { BenefitsSection } from 'widgets/BenefitsSection/ui/BenefitsSection';
import { ConsultationBlock } from 'widgets/ConsultationBlock';
import { HeroSection } from 'widgets/HeroSection';
import { PricingSection } from 'widgets/PricingSection';
import { Testimonials } from 'widgets/Testimonials';

const LHRPage = () => {
    const { t } = useTranslation('LHR');
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
                title="აბრეშუმისებრი გლუვი, კვირაში 7 დღე"
                description="გადაყარეთ საპარსები. აღარ არის ეპილაცია. მიესალმეთ სამედიცინო კლასის ლაზერულ ეპილაციას და ისიამოვნეთ მზადყოფნის თავისუფლებით."
                primaryBtn={{ text: 'გაიგე მეტი', href: '#benefits' }}
                secondaryBtn={{ text: 'დაჯავშნე კონსულტაცია', href: '#consultation' }}
                textBackgroundColor="#fff0f3" // ✅ ღია ნაცრისფერი
                navBackgroundColor="#fff0f3" // ✅ ღია ნაცრისფერი
                navLinks={[
                    { label: 'ჩვენ შესახებ', href: '#about' },
                    { label: 'უპირატესობები', href: '#benefits' },
                    { label: 'როგორ მუშაობს', href: '#how' },
                    { label: 'მომზადება და შემდგომი მოვლა', href: '#aftercare' },
                    { label: 'ფასები', href: '#pricing' },
                    { label: 'მანამდე და შემდეგ', href: '#before-after' },
                    { label: 'მომხმარებელთა შეფასებები', href: '#testimonials' },
                    { label: 'დაჯავშნე კონსულტაცია', href: '#consultation' },
                    { label: 'ხშირად დასმული კითხვები', href: '#faqs' }
                ]}
            />
            <section id="about">

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

export default LHRPage;
