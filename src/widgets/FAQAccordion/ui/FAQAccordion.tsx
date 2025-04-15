import React, { useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './FAQAccordion.module.scss';

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQAccordionProps {
    faqs: FAQItem[];
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ faqs }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleItem = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className={cls.accordion}>
            {faqs.map((faq, index) => (
                <div key={index} className={cls.item}>
                    <div
                        className={classNames(cls.question, {
                            [cls.active]: openIndex === index,
                        })}
                        onClick={() => toggleItem(index)}
                    >
                        {faq.question}
                        <span className={cls.icon}>{openIndex === index ? '−' : '+'}</span>
                    </div>
                    {openIndex === index && (
                        <div className={cls.answer}>{faq.answer}</div>
                    )}
                </div>
            ))}
        </div>
    );
};
