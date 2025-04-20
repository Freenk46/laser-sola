import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import ChatWidget from './ChatWidget';
import styles from './ChatLauncher.module.scss';

const ChatLauncher = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleChat = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <>
            {isOpen && <ChatWidget onClose={() => setIsOpen(false)} />}
            <button 
                className={styles.launcher} 
                onClick={toggleChat} 
                aria-label="ჩატის გახსნა"
            >
                <MessageCircle size={20} />
            </button>
        </>
    );
};

export default ChatLauncher;