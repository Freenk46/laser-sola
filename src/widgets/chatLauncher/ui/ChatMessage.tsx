// src/widgets/chatLauncher/ui/ChatMessage.tsx

import styles from '../ChatWidget.module.scss';
import MessageStatus from './MessageStatus';
import { Message } from '../types';

type Props = {
  message: Message;
  onRetry?: (msg: Message) => void;
};

const ChatMessage = ({ message, onRetry }: Props) => {
  const isUser = message.isUser ?? message.sender === 'user';

  return (
    <div className={`${styles.message} ${isUser ? styles.userMessage : styles.botMessage}`}>
      <div className={styles.messageContent}>{message.text}</div>
      <div className={styles.messageFooter}>
        <span className={styles.messageTime}>
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
        <MessageStatus message={message} onRetry={onRetry} />
      </div>
    </div>
  );
};

export default ChatMessage;
