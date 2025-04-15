import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import ChatWidget from './ChatWidget';
import styles from './ChatLauncher.module.scss';

const ChatLauncher = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {isOpen && <ChatWidget onClose={() => setIsOpen(false)} />}
            <button className={styles.launcher} onClick={() => setIsOpen(true)}>
                <MessageCircle size={20} />
            </button>
        </>
    );
};

export default ChatLauncher;
