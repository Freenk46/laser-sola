// src/widgets/chatLauncher/VoiceRecorder.tsx
import { useState, useRef, useEffect } from 'react';
import { Mic, Square, Send } from 'lucide-react';
import styles from './VoiceRecorder.module.scss';

interface VoiceRecorderProps {
  onRecordingComplete: (audioBlob: Blob) => void;
  maxDuration?: number; // მაქსიმალური ხანგრძლივობა წამებში
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ 
  onRecordingComplete,
  maxDuration = 60
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
      }
    };
  }, [isRecording]);
  
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setAudioBlob(audioBlob);
        
        // შევაჩეროთ ყველა ტრეკი
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingDuration(0);
      
      // დავიწყოთ წამზომი
      timerRef.current = setInterval(() => {
        setRecordingDuration(prev => {
          if (prev >= maxDuration - 1) {
            stopRecording();
            return maxDuration;
          }
          return prev + 1;
        });
      }, 1000);
      
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('მიკროფონზე წვდომა ვერ მოხერხდა. გთხოვთ მიანიჭოთ უფლება და სცადოთ თავიდან.');
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };
  
  const sendRecording = () => {
    if (audioBlob) {
      onRecordingComplete(audioBlob);
      setAudioBlob(null);
    }
  };
  
  const cancelRecording = () => {
    setAudioBlob(null);
    setIsRecording(false);
    setRecordingDuration(0);
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  return (
    <div className={styles.voiceRecorderContainer}>
      {!isRecording && !audioBlob ? (
        <button 
          className={styles.micButton} 
          onClick={startRecording}
          aria-label="დაიწყეთ ჩაწერა"
        >
          <Mic size={18} />
        </button>
      ) : isRecording ? (
        <div className={styles.recordingContainer}>
          <div className={styles.recordingIndicator}>
            <span className={styles.recordingDot}></span>
            <span className={styles.recordingTime}>{formatTime(recordingDuration)}</span>
          </div>
          <button 
            className={styles.stopButton} 
            onClick={stopRecording}
            aria-label="შეწყვიტეთ ჩაწერა"
          >
            <Square size={14} />
          </button>
        </div>
      ) : audioBlob ? (
        <div className={styles.recordingPreview}>
          <div className={styles.audioWaveform}>
            <div className={styles.waveformBar}></div>
            <div className={styles.waveformBar}></div>
            <div className={styles.waveformBar}></div>
            <div className={styles.waveformBar}></div>
            <div className={styles.waveformBar}></div>
          </div>
          <span className={styles.duration}>{formatTime(recordingDuration)}</span>
          <button 
            className={styles.cancelButton} 
            onClick={cancelRecording}
            aria-label="გააუქმეთ ჩანაწერი"
          >
            <Square size={14} />
          </button>
          <button 
            className={styles.sendButton} 
            onClick={sendRecording}
            aria-label="გააგზავნეთ ჩანაწერი"
          >
            <Send size={14} />
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default VoiceRecorder;