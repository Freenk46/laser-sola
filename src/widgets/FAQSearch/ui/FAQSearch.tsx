import React, { useState } from 'react';
import cls from './FAQSearch.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';

interface FAQSearchProps {
    className?: string;
    onSearch: (term: string) => void;
}

export const FAQSearch: React.FC<FAQSearchProps> = ({ className, onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    return (
        <div className={classNames(cls.faqSearch, {}, [className])}>
            <input
                type="text"
                className={cls.input}
                placeholder="Search questions..."
                value={searchTerm}
                onChange={handleInputChange}
            />
        </div>
    );
};
