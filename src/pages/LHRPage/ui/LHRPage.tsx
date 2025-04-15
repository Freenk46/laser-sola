import React from 'react';
import { useTranslation } from 'react-i18next';
import { AboutSection } from 'widgets/AboutSection';
import { BenefitsSection } from 'widgets/BenefitsSection/ui/BenefitsSection';
import { ConsultationBlock } from 'widgets/ConsultationBlock';
import { HeroSection } from 'widgets/HeroSection';
import { PricingSection } from 'widgets/PricingSection';
import { Testimonials } from 'widgets/Testimonials';
import styles from './LHRPage.module.scss';

const LHRPage = () => {
    const { t } = useTranslation('LHR');
    const benefits = [
        {
            title: 'უსაფრთხო და ეფექტური ტექნოლოგია',
            text: 'ჩვენი ლაზერ თერაპევტები მუშაობენ ბაზარზე წამყვან ლაზერული ეპილაციის ტექნოლოგიაზე — მაღალი შედეგებით და მაქსიმალური სიზუსტით.',
        },
        {
            title: 'თმის შემცირება მუდმივი შედეგით',
            text: 'სხვა მეთოდებისგან განსხვავებით, სამედიცინო კლასის ლაზერული ეპილაცია იძლევა სწრაფ, უსაფრთხო და გრძელვადიან ეფექტს.',
        },
        {
            title: 'ჩაბრუნებული თმის შემცირება',
            text: 'ლაზერი ფესვის დონეზე მოქმედებს თმის ღერზე, რაც ამცირებს ჩაბრუნებული თმის გაჩენას და კანს ხდის გლუვს.',
        },
        {
            title: 'მოსახერხებელი და ხელმისაწვდომი',
            text: 'ჩვენ გთავაზობთ ყველაზე ხელმისაწვდომ ფასებს ლაზერულ ეპილაციაზე — დაათვალიერე დეტალურად.',
        },
    ];

    return (
        <div className={styles.LHRPage}>
            <section id="HeroSection" className={styles.fullWidthSection}>
                <HeroSection
                    image="https://www.laserclinics.co.uk/contentassets/52ce3bc97cdc4c389b20e10d5b118ade/rebrandv2lhrhero-1.png?width=1920&mode=max"
                    title="აბრეშუმისებრი გლუვი, კვირაში 7 დღე"
                    description="გადაყარეთ საპარსები. აღარ არის ეპილაცია. მიესალმეთ სამედიცინო კლასის ლაზერულ ეპილაციას და ისიამოვნეთ მზადყოფნის თავისუფლებით."
                    primaryBtn={{ text: 'გაიგე მეტი', href: '#benefits' }}
                    secondaryBtn={{ text: 'დაჯავშნე კონსულტაცია', href: '#consultation' }}
                    textBackgroundColor="#fff0f3" // ✅ ღია ნაცრისფერი
                    navBackgroundColor="#fff0f3" // ✅ ღია ნაცრისფერი
                    navLinks={[
                        { label: 'ჩვენს შესახებ', href: '#about' },
                        { label: 'უპირატესობები', href: '#BenefitsSection' },
                        { label: 'დაჯავშნე კონსულტაცია', href: '#ConsultationBlock' },
                        { label: 'ფასები', href: '#pricing' },
                        { label: 'მომხმარებელთა შეფასებები', href: '#Testimonials' },

                    ]}

                />
            </section>
            <section id="about" className={styles.sectionSpacing}>
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

            <section id="BenefitsSection" className={styles.sectionSpacing}>
                <BenefitsSection
                    title="ლაზერული ეპილაციის უპირატესობები"
                    image="https://www.laserclinics.co.uk/contentassets/5abdddbd832b45bf8da64f409e129644/rebrandv2lhrbenefits.png"
                    items={benefits}
                />
            </section>
            <section id="ConsultationBlock" className={styles.sectionSpacing}>
                <ConsultationBlock />
            </section>
            <section id="pricing" className={styles.sectionSpacing}>
                <PricingSection />
            </section>
            <section id="Testimonials" className={styles.sectionSpacing}>
                <Testimonials />
            </section>

        </div>
    );
};

export default LHRPage;
