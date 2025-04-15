import { X } from 'lucide-react';
import { useState } from 'react';
import styles from './Chatwidget.module.scss';
import FAQHelpTopics from '../chatFaq/FAQHelpTopics';
import FAQHelpDetail from '../chatFaq/FAQHelpDetail';

type Topic = {
    question: string;
    answer: string;
};

const ChatWidget = ({ onClose }: { onClose: () => void }) => {
    const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

    return (
        <div className={styles.chatWindow}>
            {!selectedTopic && (
                <div className={styles.header}>
                    <div className={styles.logo}>MEJURI</div>
                    <button className={styles.closeButton} onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>
            )}

            <div className={styles.body}>
                {!selectedTopic ? (
                    <>
                        <div className={styles.greetingSection}>
                            <h2 className={styles.title}>Hi there!</h2>
                            <p className={styles.subtitle}>
                                Got a question? We are here to help.
                            </p>
                            <button className={styles.actionButton}>
                                Start a new conversation
                            </button>
                        </div>

                        <FAQHelpTopics onSelect={setSelectedTopic} />
                    </>
                ) : (
                    <FAQHelpDetail
                        question={selectedTopic.question}
                        answer={selectedTopic.answer}
                        onBack={() => setSelectedTopic(null)}
                    />
                )}
            </div>
        </div>
    );
};
export default ChatWidget;
