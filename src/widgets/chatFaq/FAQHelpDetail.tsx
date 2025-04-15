import { ArrowLeft } from 'lucide-react';
import styles from './FAQHelpDetail.module.scss';

const FAQHelpDetail = ({
    question,
    answer,
    onBack,
}: {
    question: string;
    answer: string;
    onBack: () => void;
}) => {
    if (!question || !answer) {
        return (
            <div className={styles.fallback}>
                <p>Oops, something went wrong.</p>
                <button onClick={onBack}>← Back</button>
            </div>
        );
    }

    return (
        <div className={styles.detailContainer}>
            <div className={styles.header}>
                <button onClick={onBack} className={styles.backButton}>
                    <ArrowLeft size={18} />
                </button>
                <span className={styles.title}>{question}</span>
                <span className={styles.rightSpacer} />
            </div>

            <div className={styles.answer}>
                {answer.split('\n\n').map((p, i) => (
                    <p key={i}>{p}</p>
                ))}
            </div>
        </div>
    );
};

export default FAQHelpDetail;
