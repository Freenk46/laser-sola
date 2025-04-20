// src/widgets/chatLauncher/ui/MessageStatus.tsx

import { Check, CheckCheck, Eye, X, RefreshCw, Clock } from 'lucide-react';
import styles from '../ChatWidget.module.scss';
import { Message, MessageStatus as StatusEnum } from '../types';

type Props = {
  message: Message;
  onRetry?: (msg: Message) => void;
};

const MessageStatus = ({ message, onRetry }: Props) => {
  const isUser = message.isUser ?? message.sender === 'user';
  if (!isUser) return null;

  switch (message.status) {
    case StatusEnum.SENDING:
      return (
        <span className={`${styles.messageStatus} ${styles.sending}`} title="იგზავნება...">
          <Clock size={14} />
        </span>
      );

    case StatusEnum.SENT:
      return (
        <span className={styles.messageStatus} title="გაგზავნილია">
          <Check size={14} stroke="#aaa" />
        </span>
      );

    case StatusEnum.DELIVERED:
      return (
        <span className={styles.messageStatus} title="ჩაბარდა">
          <CheckCheck size={14} stroke="#aaa" />
        </span>
      );

    case StatusEnum.READ:
      return (
        <span className={`${styles.messageStatus} ${styles.read}`} title="წაკითხულია">
          <Eye size={14} stroke="#3a9" />
        </span>
      );

    case StatusEnum.FAILED:
      return (
        <span className={styles.messageStatus} title="გაგზავნის შეცდომა">
          <X size={14} stroke="#f44" />
          {onRetry && (
            <button
              className={styles.retryButton}
              onClick={() => onRetry(message)}
              aria-label="ხელახლა გაგზავნა"
            >
              <RefreshCw size={14} stroke="#e55" />
            </button>
          )}
        </span>
      );

    default:
      return null;
  }
};

export default MessageStatus;
