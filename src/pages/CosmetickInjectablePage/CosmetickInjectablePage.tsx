import React from 'react';
import { useTranslation } from 'react-i18next';
import { AboutSection } from 'widgets/AboutSection';
import { BenefitsSection } from 'widgets/BenefitsSection/ui/BenefitsSection';
import { ConsultationBlock } from 'widgets/ConsultationBlock';
import { HeroSection } from 'widgets/HeroSection';
import { PricingSection } from 'widgets/PricingSection';
import { Testimonials } from 'widgets/Testimonials';

const CosmetickInjectablePage = () => {
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
                image="/images/injectable/2.png"
                title="სამედიცინო ექსპერტიზა"
                description="სახის შეფასების და შეშფოთების სფეროების საფუძველზე, ჩვენი სამედიცინო რეგისტრირებული პროფესიონალების გუნდი განიხილავს თქვენი მკურნალობის პრიორიტეტებს და შეგიქმნით თქვენთვის მორგებულ მკურნალობის გეგმას.."
                primaryBtn={{ text: 'გაიგე მეტი', href: '#benefits' }}
                secondaryBtn={{ text: 'დაჯავშნე კონსულტაცია', href: '#consultation' }}
                textBackgroundColor="#f4f4f4" // ✅ ღია ნაცრისფერი
                navBackgroundColor="#eaeaea" // ✅ ღია ნაცრისფერი 
                navLinks={[
                    { label: 'ინიექციების შესახებ', href: '#about-injectables' },
                    { label: 'ჩვენი პროცედურები', href: '#treatments' },
                    { label: 'რატომ ჩვენ', href: '#why-us' },
                    { label: 'ფასები', href: '#pricing' },
                    { label: 'სამედიცინო გუნდი', href: '#team' },
                    { label: 'ხშირად დასმული კითხვები', href: '#faqs' }
                ]}
            />
            <section id="about">
                <AboutSection
                    title="კოსმეტიკური ინექციების შესახებ"
                    text={[
                        'კოსმეტიკური საინექციო საშუალებები არის ერთ-ერთი ყველაზე ეფექტური და შედეგზე ორიენტირებული დაბერების საწინააღმდეგო მკურნალობა, რომელიც დაგეხმარებათ გაახალგაზრდავებაში და გააუმჯობესოს თქვენი საუკეთესო თვისებები.',

                    ]}
                    imageSrc="/images/injectable/1.png"
                    imageAlt="ლაზერული პროცედურის ვიზუალი"
                    buttonLabel="დაჯავშნე უფასო კონსულტაცია"
                    onButtonClick={() => console.log('კონსულტაცია დაჯავშნილია')}
                />
            </section>
            <section id="about">
                <BenefitsSection title="Benefits of Laser Hair Removal"
                    image="/images/injectable/1.png"
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

export default CosmetickInjectablePage;
