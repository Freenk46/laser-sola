import { Search, ChevronRight } from 'lucide-react';
import styles from './FAQHelpTopics.module.scss';
import { topics } from './faqData';

const FAQHelpTopics = ({
    onSelect,
}: {
    onSelect: (data: { question: string; answer: string }) => void;
}) => (
    <div className={styles.topicsContainer}>
        <div className={styles.searchBox}>
            <Search size={18} />
            <input type="text" placeholder="Search for help" />
        </div>

        <ul className={styles.topicList}>
            {topics.map((item, index) => (
                <li
                    key={index}
                    className={styles.topicItem}
                    onClick={() => onSelect(item)}
                >
                    <span>{item.question}</span>
                    <ChevronRight size={16} />
                </li>
            ))}
        </ul>
    </div>
);

export default FAQHelpTopics;
