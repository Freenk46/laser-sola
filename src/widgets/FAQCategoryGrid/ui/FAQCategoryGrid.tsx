import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './FAQCategoryGrid.module.scss';

interface FAQCategoryGridProps {
    categories: { name: string; image: string }[];
    activeCategory: string;
    onSelectCategory: (category: string) => void;
}

export const FAQCategoryGrid: React.FC<FAQCategoryGridProps> = ({
    categories,
    activeCategory,
    onSelectCategory,
}) => (
    <div className={cls.grid}>
        {categories.map(({ name, image }) => (
            <div
                key={name}
                className={classNames(cls.card, { [cls.active]: activeCategory === name })}
                onClick={() => onSelectCategory(name)}
            >
                <img src={image} alt={name} className={cls.image} />
                <div className={cls.label}>{name}</div>
            </div>
        ))}
    </div>
);
