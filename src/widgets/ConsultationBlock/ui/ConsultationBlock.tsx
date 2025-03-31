import React from 'react';
import styles from './ConsultationBlock.module.scss';
import { MotionWrapper } from 'shared/ui/MotionWrapper/MotionWrapper';

export const ConsultationBlock = () => {
    return (
        <MotionWrapper tag='section' initial={{ opacity: 0, x: 300 }} >

            <section className={styles.consultation}>
                <div className={styles.text}>
                    <h2>Book in a complimentary consultation</h2>
                    <p>
                        Initial course of Laser Hair Removal treatment recommendation (depending on area and skin tone):
                    </p>

                    <div className={styles.stats}>
                        <div>
                            <strong>8–12</strong>
                            <span>Treatments</span>
                        </div>
                        <div className={styles.divider} />
                        <div>
                            <strong>4–6</strong>
                            <span>Weeks Apart</span>
                        </div>
                    </div>

                    <p>
                        Everyone is slightly different so book in a complimentary consultation with one of our Laser Therapists at your nearest clinic location.
                    </p>

                    <button className={styles.button}>BOOK NOW</button>
                </div>

                <div className={styles.image}>
                    <img src="https://www.laserclinics.co.uk/contentassets/41a7081b2d1b404980d0b6bcd7d0c4a2/medicalteamconsult1.png" alt="Laser therapists team" />
                </div>
            </section>
        </MotionWrapper>
    );
};
