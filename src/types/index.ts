export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

export interface ChatHistory {
  messages: Message[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
