// src/widgets/chatLauncher/types.ts
export type Topic = {
    id: string;
    question: string;
    answer: string;
};

export enum MessageStatus {
    SENDING = 'sending',
    SENT = 'sent',
    DELIVERED = 'delivered',
    READ = 'read',
    FAILED = 'failed'
}

export enum MessageType {
    TEXT = 'text',
    IMAGE = 'image',
    FILE = 'file',
    AUDIO = 'audio'
}

export type MessageAttachment = {
    type: MessageType;
    url?: string;
    previewUrl?: string; // მხოლოდ სურათებისთვის
    name?: string;
    size?: number;
    mimeType?: string;
    duration?: number; // აუდიოსთვის
    blob?: Blob; // კლიენტის მხარეს დროებით შენახვისთვის
}


export interface Message {
    createdAt: string | Date;
    id?: string;
    _id?: string; // ✅ დაამატე ეს ხაზი
    text: string;
    sender: 'user' | 'bot';
    isUser?: boolean; // ✅ ეს დაამატე
    timestamp: Date | string;
    type?: 'text' | 'file' | 'voice';
    status?: string;
    sessionId?: string;
  }

export type User = {
    id: string;
    name: string;
    avatar?: string;
}