import React from 'react';
import styles from './AboutSection.module.scss';

export const AboutSection = () => {
    return (
        <section className={styles.about}>
            <div className={styles.text}>
                <h2>About Laser Hair Removal</h2>
                <p>
                    Designed with sensitive skin in mind, our Laser Hair Removal technology is safe enough to be used on any part
                    of the body and target different skin types whilst ensuring maximum results. All of our lasers feature a
                    unique dynamic cooling device that helps to calm, soothe and protect the skin.
                </p>
                <p>
                    For your initial course of Laser Hair Removal treatment, we recommend approximately 8–12 treatments,
                    spaced 4–6 weeks apart (depending on area and skin tone). Everyone is slightly different so book a complimentary
                    consultation with one of our Laser Therapists at your nearest clinic location.
                </p>
                <button>BOOK A COMPLIMENTARY CONSULTATION</button>
            </div>
            <div className={styles.image}>
                <img src="https://www.laserclinics.co.uk/contentassets/22a5776f936246b49c689f1038b98d82/rebrandv2lhrabout.png" alt="Woman after laser treatment" />
            </div>
        </section>
    );
};
