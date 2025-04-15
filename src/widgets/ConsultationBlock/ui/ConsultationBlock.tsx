import React from 'react';
import { MotionWrapper } from 'shared/ui/MotionWrapper/MotionWrapper';
import { Button } from 'widgets/HeroSection/ui/Button/Button';
import styles from './ConsultationBlock.module.scss';

export const ConsultationBlock = () => (

    <section className={styles.consultation}>
        <div className={styles.text}>
            <h2>დაჯავშნე უფასო საკონსულტაციო სესია</h2>
            <p>
                {' '}
                ლაზერული ეპილაციის საწყისი კურსის რეკომენდაცია (დამოკიდებულია ზონასა და კანის ტონზე):
            </p>

            <div className={styles.stats}>
                <div>
                    <strong>8–12</strong>
                    <span>სეანსები</span>
                </div>
                <div className={styles.divider} />
                <div>
                    <strong>4–6</strong>
                    <span>კვირის ინტერვალით</span>
                </div>
            </div>

            <p>
                ყველა ადამიანი ინდივიდუალურია, ამიტომ დაგეგმე უფასო საკონსულტაციო სესია ჩვენი ლაზერ თერაპევტებთან შენს ახლოს მდებარე კლინიკაში.
            </p>

            <Button className={styles.button}>დაჯავშნა</Button>
        </div>

        <div className={styles.image}>
            <img src="https://www.laserclinics.co.uk/contentassets/41a7081b2d1b404980d0b6bcd7d0c4a2/medicalteamconsult1.png" alt="Laser therapists team" />
        </div>
    </section>

);
