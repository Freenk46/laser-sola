import React from 'react';
import cls from './FAQCategoryGrid.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';

interface FAQCategoryGridProps {
    categories: { name: string; image: string }[];
    activeCategory: string;
    onSelectCategory: (category: string) => void;
}

export const FAQCategoryGrid: React.FC<FAQCategoryGridProps> = ({
    categories,
    activeCategory,
    onSelectCategory,
}) => {
    return (
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
};
