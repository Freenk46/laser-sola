import React from 'react';
import styles from './StackShowcase.module.scss';

export const StackShowcase: React.FC<{
    imageSrc: string;
    imageAlt: string;
    title: string;
    description: string;
    buttonText: string;
    onButtonClick?: () => void;
}> = ({
    imageSrc,
    imageAlt,
    title,
    description,
    buttonText,
    onButtonClick,
}) => {
        return (
            <section className={styles.stackShowcase}>
                <div className={styles.wrapper}>
                    <div className={styles.image}>
                        <img src={imageSrc} alt={imageAlt} />
                    </div>

                    <div className={styles.content}>
                        <h2 className={styles.title}>{title}</h2>
                        <p className={styles.description}>{description}</p>
                        <div className={styles.buttons}>
                            <button className={styles.primaryBtn}>იხილეთ ყველა კანის პროცედურა</button>
                            <button className={styles.secondaryBtn}>დაჯავშნეთ ახლავე</button>
                        </div>
                    </div>
                </div>
            </section>
        );
    };
