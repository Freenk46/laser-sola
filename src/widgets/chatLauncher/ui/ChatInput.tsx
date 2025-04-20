import { Send } from 'lucide-react';
import styles from '../ChatWidget.module.scss';
import EmojiPicker from '../EmojiPicker/EmojiPicker';
import FileUpload from '../FileUpload/FileUpload';
import VoiceRecorder from '../VoiceRecorder/VoiceRecorder';

interface ChatInputProps {
  inputValue: string;
  onInputChange: (val: string) => void;
  onSend: () => void;
}

const ChatInput = ({ inputValue, onInputChange, onSend }: ChatInputProps) => {
  return (
    <div className={styles.inputContainer}>
      <EmojiPicker onEmojiSelect={(emoji) => onInputChange(inputValue + emoji)} />
      <VoiceRecorder onRecordingComplete={(blob) => console.log('Voice:', blob)} />
      <FileUpload onFileSelected={(file) => console.log('File:', file)} />
      <input
        className={styles.chatInput}
        placeholder="დაწერეთ შეტყობინება..."
        value={inputValue}
        onChange={(e) => onInputChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSend();
          }
        }}
      />
      <button onClick={onSend} disabled={!inputValue.trim()} className={styles.sendButton}>
        <Send size={18} />
      </button>
    </div>
  );
};

export default ChatInput;
