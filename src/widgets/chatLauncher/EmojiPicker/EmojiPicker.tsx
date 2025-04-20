// src/widgets/chatLauncher/EmojiPicker.tsx
import { useState, useRef, useEffect } from 'react';
import { Smile } from 'lucide-react';
import styles from './EmojiPicker.module.scss';

const EMOJI_CATEGORIES = [
    {
        name: 'სახეები',
        emojis: ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', 
                '😇', '😍', '🥰', '😘', '😗', '😚', '😙', '😋', '😛', '😜', '😝', '🤑']
    },
    {
        name: 'ჟესტები',
        emojis: ['👍', '👎', '👌', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '👇', 
                '☝️', '👋', '🤚', '🖐️', '✋', '🖖', '👏', '🙌', '👐', '🤲', '🤝', '🙏']
    },
    {
        name: 'ცხოველები',
        emojis: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', 
                '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐤', '🦆', '🦅', '🦉', '🦇', '🐺']
    },
    {
        name: 'საჭმელი',
        emojis: ['🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈', '🍒', '🍑', '🥭', 
                '🍍', '🥥', '🥝', '🍅', '🥑', '🍆', '🥔', '🥕', '🌽', '🌶️', '🥒', '🥬']
    }
];

interface EmojiPickerProps {
    onEmojiSelect: (emoji: string) => void;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({ onEmojiSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState(0);
    const pickerRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    
    const togglePicker = () => {
        setIsOpen(!isOpen);
    };
    
    const handleEmojiClick = (emoji: string) => {
        onEmojiSelect(emoji);
        setIsOpen(false);
    };
    
    return (
        <div className={styles.emojiPickerContainer} ref={pickerRef}>
            <button 
                className={styles.emojiButton} 
                onClick={togglePicker}
                aria-label="ემოციების არჩევა"
            >
                <Smile size={20} />
            </button>
            
            {isOpen && (
                <div className={styles.emojiPicker}>
                    <div className={styles.categories}>
                        {EMOJI_CATEGORIES.map((category, index) => (
                            <button
                                key={category.name}
                                className={`${styles.categoryButton} ${activeCategory === index ? styles.active : ''}`}
                                onClick={() => setActiveCategory(index)}
                            >
                                {category.emojis[0]}
                            </button>
                        ))}
                    </div>
                    
                    <div className={styles.emojiGrid}>
                        {EMOJI_CATEGORIES[activeCategory].emojis.map((emoji) => (
                            <button
                                key={emoji}
                                className={styles.emoji}
                                onClick={() => handleEmojiClick(emoji)}
                            >
                                {emoji}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmojiPicker;