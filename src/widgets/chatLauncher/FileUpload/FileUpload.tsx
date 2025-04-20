// src/widgets/chatLauncher/FileUpload.tsx
import { useState, useRef } from 'react';
import { Paperclip, X, File, Image, FileText } from 'lucide-react';
import styles from './FileUpload.module.scss';

interface FileUploadProps {
  onFileSelected: (file: File) => void;
  maxSizeInMB?: number;
  allowedTypes?: string[];
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelected,
  maxSizeInMB = 5,
  allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'text/plain']
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

  const handleFileSelection = (file: File) => {
    setError(null);
    
    // შევამოწმოთ ფაილის ტიპი
    if (!allowedTypes.includes(file.type)) {
      setError(`დაუშვებელი ფაილის ტიპი. დასაშვებია: ${allowedTypes.join(', ')}`);
      return;
    }
    
    // შევამოწმოთ ფაილის ზომა
    if (file.size > maxSizeInBytes) {
      setError(`ფაილი ძალიან დიდია. მაქსიმალური ზომა: ${maxSizeInMB}MB`);
      return;
    }
    
    setSelectedFile(file);
    onFileSelected(file);
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) {
      return <Image className={styles.fileTypeIcon} size={24} />;
    } else if (fileType === 'application/pdf') {
      return <FileText className={styles.fileTypeIcon} size={24} />;
    } else {
      return <File className={styles.fileTypeIcon} size={24} />;
    }
  };

  return (
    <div className={styles.fileUploadContainer}>
      <input
        type="file"
        className={styles.fileInput}
        onChange={handleFileInputChange}
        ref={fileInputRef}
        accept={allowedTypes.join(',')}
      />

      {!selectedFile ? (
        <button 
          className={styles.attachButton} 
          onClick={openFileDialog}
          type="button"
          aria-label="დაამატეთ ფაილი"
        >
          <Paperclip size={18} />
        </button>
      ) : (
        <div className={styles.selectedFile}>
          {getFileIcon(selectedFile.type)}
          <span className={styles.fileName}>
            {selectedFile.name.length > 20 
              ? `${selectedFile.name.substring(0, 20)}...` 
              : selectedFile.name}
          </span>
          <button 
            className={styles.removeButton} 
            onClick={removeFile}
            aria-label="წაშალეთ ფაილი"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {isDragging && (
        <div 
          className={styles.dropZone}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <p>ჩააგდეთ ფაილი აქ</p>
        </div>
      )}

      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
};

export default FileUpload;