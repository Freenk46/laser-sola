import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './FAQSidebar.module.scss';

interface FAQSidebarProps {
    categories: string[];
    activeCategory: string;
    onSelectCategory: (category: string) => void;
}

export const FAQSidebar: React.FC<FAQSidebarProps> = ({
    categories,
    activeCategory,
    onSelectCategory,
}) => (
    <aside className={cls.sidebar}>
        <h3 className={cls.title}>Categories</h3>
        <ul className={cls.list}>
            {categories.map((category) => (
                <li
                    key={category}
                    className={classNames(cls.item, {
                        [cls.active]: activeCategory === category,
                    })}
                    onClick={() => onSelectCategory(category)}
                >
                    {category}
                </li>
            ))}
        </ul>
    </aside>
);
