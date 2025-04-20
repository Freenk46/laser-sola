import { X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';
import styles from './ChatWidget.module.scss';
import FAQHelpTopics from '../chatFaq/FAQHelpTopics';
import FAQHelpDetail from '../chatFaq/FAQHelpDetail';
import ChatMessage from './ui/ChatMessage';
import ChatInput from './ui/ChatInput';
import { Topic, Message, MessageStatus } from './types';
import socket from '../../shared/socket/socket';

const getSessionId = () => {
  let id = localStorage.getItem('chat_session');
  if (!id) {
    id = nanoid();
    localStorage.setItem('chat_session', id);
  }
  return id;
};

const sessionId = getSessionId();

const ChatWidget = ({ onClose }: { onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState<'faq' | 'chat'>('faq');
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [unreadCount, setUnreadCount] = useState(0);
  const [isChatFocused, setIsChatFocused] = useState(true);

  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeTab === 'chat') {
      inputRef.current?.focus();
    }
  }, [activeTab]);

  useEffect(() => {
    const handleFocus = () => setIsChatFocused(true);
    const handleBlur = () => setIsChatFocused(false);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);
    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  useEffect(() => {
    const handleNewMessage = (msg: Message) => {
      if (msg.sessionId !== sessionId) return;

      const alreadyExists = messages.some(existing =>
        (existing._id && existing._id === msg._id) ||
        (existing.text === msg.text && existing.sender === msg.sender && !existing._id)
      );
      if (alreadyExists) return;

      const formatted: Message = {
        ...msg,
        timestamp: new Date(msg.createdAt || msg.timestamp || Date.now())
      };

      setMessages(prev => [...prev, formatted]);

      if (!isChatFocused || activeTab !== 'chat') {
        setUnreadCount(prev => prev + 1);
      }
    };

    socket.on('new_message', handleNewMessage);

    return () => {
      socket.off('new_message', handleNewMessage);
    };
  }, [activeTab, isChatFocused, messages]);

  const updateMessageStatusByBackendId = (_id: string, status: MessageStatus) => {
    setMessages(prev =>
      prev.map(msg =>
        msg._id === _id ? { ...msg, status } : msg
      )
    );
  };


  const handleSend = () => {
    if (!inputValue.trim()) return;
  
    const tempId = nanoid(); // ✅ აი შენ იდენტიფიკატორი
  
    const tempMessage: Message = {
      id: tempId,
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
      status: MessageStatus.SENDING,
      sender: 'user',
      createdAt: ''
    };
  
    setMessages(prev => [...prev, tempMessage]); // დროებით ვაგდებთ მესიჯს
    setInputValue('');
  
    // ✅ აქ ვგზავნით tempId-ით
    socket.emit(
      'send_message',
      {
        sessionId,
        text: tempMessage.text,
        sender: 'user',
        type: 'text',
        tempId // ✅ ახალ ობიექტში ვურთავთ tempId-ს
      }
    );
  };
  
  useEffect(() => { const handleAck = (ack: { status: 'ok' | 'fail'; _id: string; tempId: string }) => {
      console.log('✅ ACK:', ack);
  
      if (ack.status === 'ok') {
        setMessages(prev =>
          prev.map(msg =>
            msg.id === ack.tempId
              ? { ...msg, _id: ack._id, status: MessageStatus.SENT }
              : msg
          )
        );
      } else {
        setMessages(prev =>
          prev.map(msg =>
            msg.id === ack.tempId
              ? { ...msg, status: MessageStatus.FAILED }
              : msg
          )
        );
      }
    };
  
    socket.on('ack', handleAck);
  
    return () => {
      socket.off('ack', handleAck);
    };
  }, []);

  useEffect(() => {
    if (isChatFocused && activeTab === 'chat') {
      setMessages(prev =>
        prev.map(msg => {
          if (!msg.isUser && msg.status === MessageStatus.DELIVERED) {
            return { ...msg, status: MessageStatus.READ };
          }
          return msg;
        })
      );
    }
  }, [isChatFocused, activeTab]);
  

  const handleRetry = (failedMessage: Message) => {
    const newTempId = nanoid(); // ახალ tempId-ს ვქმნით
  
    const retryMessage: Message = {
      ...failedMessage,
      id: newTempId,
      timestamp: new Date(),
      status: MessageStatus.SENDING,
    };
  
    // ძველი failed მესიჯის მოშლა და ახლით ჩანაცვლება
    setMessages(prev =>
      prev.map(msg =>
        msg.id === failedMessage.id ? retryMessage : msg
      )
    );
  
    socket.emit(
      'send_message',
      {
        sessionId,
        text: retryMessage.text,
        sender: 'user',
        type: 'text',
        tempId: newTempId,
      }
    );
  };
  

  return (
    <div className={styles.chatWindow}>
      <div className={styles.header}>
        <div className={styles.logo}>
          LaserSola
          {unreadCount > 0 && <span className={styles.unreadBadge}>{unreadCount}</span>}
        </div>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'faq' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('faq')}
          >
            კითხვები
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'chat' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('chat')}
          >
            ჩატი
            {activeTab !== 'chat' && unreadCount > 0 && (
              <span className={styles.tabBadge}>{unreadCount}</span>
            )}
          </button>
        </div>
        <button className={styles.closeButton} onClick={onClose} aria-label="დახურვა">
          <X size={20} />
        </button>
      </div>

      <div className={styles.body}>
        {activeTab === 'faq' ? (
          !selectedTopic ? (
            <>
              <div className={styles.greetingSection}>
                <h2>გამარჯობა!</h2>
                <p>გაქვთ კითხვა? ჩვენ მზად ვართ დაგეხმაროთ.</p>
                <button onClick={() => setActiveTab('chat')} className={styles.actionButton}>
                  დაიწყეთ საუბარი
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
          )
        ) : (
          <div className={styles.chatContainer}>
            <div className={styles.messagesContainer}>
              {messages.map((msg, i) => (
                <ChatMessage
                  key={msg.id || msg._id || i}
                  message={msg}
                  onRetry={handleRetry}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
            <ChatInput
              inputValue={inputValue}
              onInputChange={setInputValue}
              onSend={handleSend}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatWidget;
