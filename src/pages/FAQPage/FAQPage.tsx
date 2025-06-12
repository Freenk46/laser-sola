import React, { useState, useMemo } from 'react';
import { FAQSearch } from 'widgets/FAQSearch/ui/FAQSearch';
import { FAQSidebar } from 'widgets/FAQSidebar/ui/FAQSidebar';
import { FAQAccordion } from 'widgets/FAQAccordion/ui/FAQAccordion';
import { FAQCategoryGrid } from 'widgets/FAQCategoryGrid/ui/FAQCategoryGrid';
import cls from './FAQPage.module.scss';

export const FAQPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState(''); // საწყისი — ცარიელი

    const faqCategoryCards = [
        { name: 'Laser Hair Removal', image: '/images/123.png' },
        { name: 'Skinskin treatments', image: '/images/123.png' },
        { name: 'injections', image: '/images/123.png' },
        { name: 'ონლაინ შეძენა', image: '/images/123.png' },
       
      
    ];

    const faqCategories = ['All', ...faqCategoryCards.map((cat) => cat.name)];

    const allFAQs = [
        {
            question: 'How long does a laser hair removal session take?',
            answer: 'Typically 15–60 minutes depending on the area.',
            category: 'Laser Hair Removal',
        },
        {
            question: 'Is laser treatment painful?',
            answer: 'Most people feel a light snapping sensation, not pain.',
            category: 'Laser Hair Removal',
        },
        {
            question: 'What skincare products are best after treatment?',
            answer: 'Use gentle cleansers and SPF daily.',
            category: 'Skin',
        },
        {
            question: 'Can I return products bought online?',
            answer: 'Yes, within 14 days of purchase if unused.',
            category: 'Shop',
        },
    ];

    const filteredFAQs = useMemo(() => allFAQs.filter((faq) => {
        const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
        const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase())
                || faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    }), [searchTerm, activeCategory]);

    return (
        <div className={cls.faqPage}>
            <h1 className={cls.title}>Frequently Asked Questions</h1>

            <FAQSearch onSearch={setSearchTerm} />

            {activeCategory === '' ? (
                <FAQCategoryGrid
                    categories={faqCategoryCards}
                    activeCategory={activeCategory}
                    onSelectCategory={setActiveCategory}    
                />
            ) : (
                <div className={cls.content}>

                    <FAQSidebar
                        categories={faqCategories}
                        activeCategory={activeCategory}
                        onSelectCategory={setActiveCategory}
                    />
                    <FAQAccordion faqs={filteredFAQs} />
                </div>
            )}
        </div>
    );
};
