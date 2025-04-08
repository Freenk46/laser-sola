import React from 'react';
import styles from './Testimonials.module.scss';
import { MotionWrapper } from 'shared/ui/MotionWrapper/MotionWrapper';

const testimonials = [
    {
        id: 1,
        text: `“I have started Laser Hair removal and I can't believe how quick and easy it is...”`,
        author: 'Debbie Levin',
    },
    {
        id: 2,
        text: `“The staff are well presented, friendly, professional and polite...”`,
        author: 'Gertrude A.',
    },
    {
        id: 3,
        text: `“The ladies were friendly and made me feel at ease...”`,
        author: 'Lisa',
    },
];

export const Testimonials = () => {
    return (
        <section className={styles.testimonials}>

            <h2>What our customers are saying</h2>
            <div className={styles.cards}>
                {testimonials.map((item) => (
                    <blockquote key={item.id} className={styles.card}>
                        <p>{item.text}</p>
                        <footer>{item.author}</footer>
                    </blockquote>
                ))}
            </div>
            <div className={styles.footer}>
                <button className={styles.seeAll}>SEE ALL REVIEWS</button>
                <div className={styles.arrows}>
                    <button>{'<'}</button>
                    <button>{'>'}</button>
                </div>
            </div>

        </section>
    );
};
