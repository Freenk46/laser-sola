import { Search, ChevronRight } from 'lucide-react';
import styles from './FAQHelpTopics.module.scss';
import { topics } from './faqData';
type Topic = {
    id: string;
    question: string;
    answer: string;
  }
const FAQHelpTopics = ({
    onSelect,
}: {
    onSelect: (data:  Topic  ) => void;
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
                    onClick={() => onSelect({
                        question: item.question, answer: item.answer,
                        id: ''
                    })}
                >
                    <span>{item.question}</span>
                    <ChevronRight size={16} />
                </li>
            ))}
        </ul>
    </div>
);

export default FAQHelpTopics;
